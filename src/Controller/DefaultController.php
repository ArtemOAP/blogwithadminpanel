<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class DefaultController extends AbstractController
{



    /**
     * @param Request $request
     * @return Response
     * @Route("/", name="default")
     */
    public function index(Request $request)
    {
        $params = $request->query->all();
        return $this->render('default/index.html.twig', [
            'age'=>isset($params['age']) && (int)$params['age'] ?(int)$params['age']:'',
            'email'=>isset($params['email']) && !empty($params['email'])?$params['email']:'',
            'gender'=>isset($params['gender']) && !empty($params['gender'])?$params['gender']:'',
            'name'=>isset($params['name']) && !empty($params['name'])?$params['name']:'',
            'phone'=>isset($params['phone']) && !empty($params['phone'])?$params['phone']:'',
            'full'=>isset($params['full']) && !empty($params['full'])?(int)$params['full']:0,
            'tmp'=>isset($params['tmp']) && !empty($params['tmp'])?(int)$params['tmp']:0,
        ]);
    }


    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     * @Route("/ref/{token}", name="ref", methods="GET")
     */
    public function refAction(Request $request)
    {

        /** @var User $user */
        $user = $this->getDoctrine()->getManager()->getRepository("App:User")->findOneBy(['refToken'=> '/ref/' . $request->get('token')]);
        if(!$user){
            return new Response(
                'Username doesnt exists',
                Response::HTTP_UNAUTHORIZED,
                array('Content-type' => 'application/json')
            );
        }
        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());


        $this->get('security.token_storage')->setToken($token);
        $this->get('session')->set('_security_main', serialize($token));

        return $this->redirectToRoute('category');
    }

    /**
     * @Route("/category", name="category", methods="GET")
     */
    public function category()
    {
        if(!$this->isGranted("ROLE_USER")){
            return $this->redirectToRoute('default');
        }
        return $this->render("default/category.html.twig",[
            'categories'=> $this->getDoctrine()->getManager()->getRepository('App:Category')->findAll()
        ]);

    }

    /**
     *@param Category $category
     *@return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     *@Route("/video/{id}", name="video", methods="GET")
    */
    public function video(Category $category)
    {
        if(!$this->isGranted("ROLE_USER")){
            return $this->redirectToRoute('default');
        }
        return $this->render("default/video.html.twig",[
            'products'=>$category->getProducts(),
            'category'=> $category
            ]);
    }



}
