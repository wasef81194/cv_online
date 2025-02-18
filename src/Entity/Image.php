<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToOne(inversedBy: 'image', targetEntity: Experience::class)]
    private ?experience $experience = null;

    #[ORM\ManyToOne(inversedBy: 'image')]
    private ?Diplome $diplome = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getExperience(): ?experience
    {
        return $this->experience;
    }

    public function setExperience(?experience $experience): static
    {
        $this->experience = $experience;

        return $this;
    }

    public function getDiplome(): ?Diplome
    {
        return $this->diplome;
    }

    public function setDiplome(?Diplome $diplome): static
    {
        $this->diplome = $diplome;

        return $this;
    }
}
