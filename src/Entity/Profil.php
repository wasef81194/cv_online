<?php

namespace App\Entity;

use App\Repository\ProfilRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfilRepository::class)]
class Profil
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $numberPhone = null;

    #[ORM\Column(length: 255)]
    private ?string $mail = null;

    #[ORM\Column(length: 255)]
    private ?string $job = null;

    #[ORM\Column(length: 900, nullable: true)]
    private ?string $aboutMe = null;

    /**
     * @var Collection<int, PersonalInfo>
     */
    #[ORM\OneToMany(targetEntity: PersonalInfo::class, mappedBy: 'profil')]
    private Collection $personalInfos;

    /**
     * @var Collection<int, Experience>
     */
    #[ORM\OneToMany(targetEntity: Experience::class, mappedBy: 'profil', cascade: ['persist', 'remove'])]
    private Collection $experiences;

    /**
     * @var Collection<int, Diplome>
     */
    #[ORM\OneToMany(targetEntity: Diplome::class, mappedBy: 'profil')]
    private Collection $diplomes;

    /**
     * @var Collection<int, Projet>
     */
    #[ORM\OneToMany(targetEntity: Projet::class, mappedBy: 'profil')]
    private Collection $projets;

    /**
     * @var Collection<int, Remind>
     */
    #[ORM\OneToMany(targetEntity: Remind::class, mappedBy: 'profil')]
    private Collection $reminds;

    public function __construct()
    {
        $this->personalInfos = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->diplomes = new ArrayCollection();
        $this->projets = new ArrayCollection();
        $this->reminds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getNumberPhone(): ?string
    {
        return $this->numberPhone;
    }

    public function setNumberPhone(string $numberPhone): static
    {
        $this->numberPhone = $numberPhone;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): static
    {
        $this->mail = $mail;

        return $this;
    }

    public function getJob(): ?string
    {
        return $this->job;
    }

    public function setJob(string $job): static
    {
        $this->job = $job;

        return $this;
    }

    public function getAboutMe(): ?string
    {
        return $this->aboutMe;
    }

    public function setAboutMe(?string $aboutMe): static
    {
        $this->aboutMe = $aboutMe;

        return $this;
    }

    /**
     * @return Collection<int, PersonalInfo>
     */
    public function getPersonalInfos(): Collection
    {
        return $this->personalInfos;
    }

    public function addPersonalInfo(PersonalInfo $personalInfo): static
    {
        if (!$this->personalInfos->contains($personalInfo)) {
            $this->personalInfos->add($personalInfo);
            $personalInfo->setProfil($this);
        }

        return $this;
    }

    public function removePersonalInfo(PersonalInfo $personalInfo): static
    {
        if ($this->personalInfos->removeElement($personalInfo)) {
            // set the owning side to null (unless already changed)
            if ($personalInfo->getProfil() === $this) {
                $personalInfo->setProfil(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setProfil($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getProfil() === $this) {
                $experience->setProfil(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Diplome>
     */
    public function getDiplomes(): Collection
    {
        return $this->diplomes;
    }

    public function addDiplome(Diplome $diplome): static
    {
        if (!$this->diplomes->contains($diplome)) {
            $this->diplomes->add($diplome);
            $diplome->setProfil($this);
        }

        return $this;
    }

    public function removeDiplome(Diplome $diplome): static
    {
        if ($this->diplomes->removeElement($diplome)) {
            // set the owning side to null (unless already changed)
            if ($diplome->getProfil() === $this) {
                $diplome->setProfil(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Projet>
     */
    public function getProjets(): Collection
    {
        return $this->projets;
    }

    public function addProjet(Projet $projet): static
    {
        if (!$this->projets->contains($projet)) {
            $this->projets->add($projet);
            $projet->setProfil($this);
        }

        return $this;
    }

    public function removeProjet(Projet $projet): static
    {
        if ($this->projets->removeElement($projet)) {
            // set the owning side to null (unless already changed)
            if ($projet->getProfil() === $this) {
                $projet->setProfil(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Remind>
     */
    public function getReminds(): Collection
    {
        return $this->reminds;
    }

    public function addRemind(Remind $remind): static
    {
        if (!$this->reminds->contains($remind)) {
            $this->reminds->add($remind);
            $remind->setProfil($this);
        }

        return $this;
    }

    public function removeRemind(Remind $remind): static
    {
        if ($this->reminds->removeElement($remind)) {
            // set the owning side to null (unless already changed)
            if ($remind->getProfil() === $this) {
                $remind->setProfil(null);
            }
        }

        return $this;
    }

}
