<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{

    const ROLE = 'ROLE_USER';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $age;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $full;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tmp;

    /**
     * @ORM\Column(type="integer", nullable=true, options={"unsigned"=true})
     */
    private $ip;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $active;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=50)
     */
    protected $role;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $plainPassword;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $refToken;



    /**
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     * @var \DateTime
     */
    private $created;


    /**
     * @ORM\Column(type="datetime",options={"default": "CURRENT_TIMESTAMP"})
     * @var \DateTime
     */
    private $visit;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $clickId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $t1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $t2;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $t3;

    public function __construct()
    {
        $this->created = new \DateTime("now");
        $this->visit   = new \DateTime("now");


    }

    /**
     * @return \DateTime
     */
    public function getCreated(): \DateTime
    {
        return $this->created;
    }

    /**
     * @param \DateTime $created
     */
    public function setCreated(\DateTime $created): void
    {
        $this->created = $created;
    }

    /**
     * @return \DateTime
     */
    public function getVisit(): \DateTime
    {
        return $this->visit;
    }

    /**
     * @param \DateTime $visit
     */
    public function setVisit(\DateTime $visit): void
    {
        $this->visit = $visit;
    }




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getFull(): ?bool
    {
        return $this->full;
    }

    public function setFull(?bool $full): self
    {
        $this->full = $full;

        return $this;
    }

    public function getTmp(): ?string
    {
        return $this->tmp;
    }

    public function setTmp(?string $tmp): self
    {
        $this->tmp = $tmp;

        return $this;
    }

    public function getIp(): ?int
    {
        return $this->ip;
    }

    public function setIp(?int $ip): self
    {
        $this->ip = $ip;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): self
    {
        $this->active = $active;


        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function eraseCredentials()
    {
        return null;
    }

    public function getRole()
    {
        return $this->role;
    }

    public function setRole($role = null)
    {
        $this->role = $role;
        return $this;
    }

    public function getRoles()
    {
        return [$this->getRole()];
    }



    public function getUsername()
    {
        return $this->email;
    }



    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
    }

    public function getSalt()
    {
        return null;
    }

    /**
     * @return mixed
     */
    public function getRefToken()
    {
        return $this->refToken;
    }

    public function setRefToken($refToken): User
    {
        $this->refToken = $refToken;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getClickId()
    {
        return $this->clickId;
    }

    /**
     * @param mixed $clickId
     */
    public function setClickId($clickId): User
    {
        $this->clickId = $clickId;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getT1()
    {
        return $this->t1;
    }

    /**
     * @param mixed $t1
     */
    public function setT1($t1): User
    {
        $this->t1 = $t1;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getT2()
    {
        return $this->t2;

    }

    /**
     * @param mixed $t2
     */
    public function setT2($t2): User
    {
        $this->t2 = $t2;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getT3()
    {
        return $this->t3;
    }

    /**
     * @param mixed $t3
     */
    public function setT3($t3): User
    {
        $this->t3 = $t3;
        return $this;
    }


}
