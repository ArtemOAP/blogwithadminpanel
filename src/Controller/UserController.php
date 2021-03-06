<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;



/**
 * @Route("/user")
 */
class UserController extends AbstractController
{

    /**
     * @Route("/new", name="user_new", methods="POST")
     */
    public function new(Request $request): Response
    {
        $user = new User();
        $user
            ->setAge((int)$request->get('age'))
            ->setCity($request->get('city'))
            ->setEmail($request->get('email'))
            ->setFull((bool)$request->get('full'))
            ->setIp(ip2long($request->getClientIp()))
            ->setName($request->get('name'))
            ->setPhone($request->get('phone'))
            ->setRefToken('/ref/' . $this->generateToken())
            ->setTmp($request->get('tmp'))
            ->setClickId($request->get('click_id'))
            ->setT1($request->get('t1'))
            ->setT2($request->get('t2'))
            ->setT3($request->get('t3'))
            ->setRole(User::ROLE)
            ->setActive(true);

            if ($request->get('city')==="other"){
                $user->setCity($request->get('otherCity'));
            }
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();

        return new JsonResponse(['status'=>200],
            Response::HTTP_OK,
            array('Content-type' => 'application/json')
        );
    }

    public function generateToken() : string
    {
        return rtrim(strtr(base64_encode(random_bytes(10)), '+/', '-_'), '=');
    }


}
