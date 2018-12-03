<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('name')
            ->add('phone')
            ->add('email')
            ->add('age')
            ->add('full')
            ->add('tmp')
            ->add('ip')
            ->add('city')
            ->add('active')
            ->add('password')
            ->add('role')
            ->add('plainPassword')
            ->add('refToken')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
