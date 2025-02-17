<?php

namespace App\Controller;

use App\Repository\ExperienceRepository;
use App\Repository\ProfilRepository;
use App\Service\ApiKeyChecker;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/experience')]
final class ExperienceController extends AbstractController
{
    #[Route('', name: 'get_a_experience', methods: ['GET'])]
    public function experience(Request $request, ApiKeyChecker $apiKeyChecker, ExperienceRepository $experienceRepository, SerializerInterface $serializer): JsonResponse
    {
        // $admin = true;
        // if (!$admin) {
           //Verifie la clé
            $key = $request->headers->get('Authorization');
            if (!$apiKeyChecker->checkApiKey($key)) {
                return new JsonResponse(['error' => 'Key not found'], 400);
            }
        // }
       
        //id de l'experience selectionné
        $idExperience = $request->headers->get('idExperience');
        //Recupere l'experience seletionné
        $experience = $experienceRepository->findOneBy(['id'=> $idExperience]);

        if (!$experience) {
            return new JsonResponse(['error' => 'Experience not found'], 404);
        }
       // dd($profil);
       // Sérialise l'objet profil en JSON et le décode en tableau associatif
       $jsonProfil = $serializer->serialize($experience, 'json', [
           'circular_reference_handler' => function ($object) {return $object->getId();},
       ]);
       $experienceArray = json_decode($jsonProfil, true);
      
       // Retourne la réponse JSON
       return new JsonResponse($experienceArray, 200);
   }
}
