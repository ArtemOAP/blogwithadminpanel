<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 * @Vich\Uploadable
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @OneToMany(targetEntity="Product", mappedBy="category")
     */
    private $products;



    public function __construct() {
        $this->products = new ArrayCollection();
    }

    public function __toString():string
    {
        return $this->getTitle();
    }

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $url;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @Vich\UploadableField(mapping="upload_images", fileNameProperty="image")
     * @var File
     */
    private $imageFile;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imageBanner;

    /**
     * @Vich\UploadableField(mapping="upload_images", fileNameProperty="imageBanner")
     * @var File
     */
    private $imageBannerFile;


    /**
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    private $updatedAt;


    /**
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    private $updatedAtBannerFile;

    /**
     * @return mixed
     */
    public function getImageBanner()
    {
        return $this->imageBanner;
    }

    /**
     * @param mixed $imageBanner
     */
    public function setImageBanner($imageBanner): void
    {
        $this->imageBanner = $imageBanner;
    }

    /**
     * @return File
     */
    public function getImageBannerFile(): ?File
    {
        return $this->imageBannerFile;
    }

    /**
     * @param File $imageBannerFile
     */
    public function setImageBannerFile(File $imageBannerFile = null): void
    {
        $this->imageBannerFile = $imageBannerFile;

        if($imageBannerFile){
            $this->updatedAtBannerFile = new \DateTime('now');
        }
    }






    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($image) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTime('now');
        }

    }

    public function getImageFile()
    {
        return $this->imageFile;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * @param mixed $products
     */
    public function setProducts($products): void
    {
        $this->products = $products;
    }

}
