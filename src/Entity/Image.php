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

    #[ORM\OneToOne(mappedBy: 'image', cascade: ['persist', 'remove'])]
    private ?Diplome $diplome = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    private ?Projet $projet = null;

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
        // unset the owning side of the relation if necessary
        if ($diplome === null && $this->diplome !== null) {
            $this->diplome->setImage(null);
        }

        // set the owning side of the relation if necessary
        if ($diplome !== null && $diplome->getImage() !== $this) {
            $diplome->setImage($this);
        }

        $this->diplome = $diplome;

        return $this;
    }

    public function getProjet(): ?Projet
    {
        return $this->projet;
    }

    public function setProjet(?Projet $projet): static
    {
        $this->projet = $projet;

        return $this;
    }
}
