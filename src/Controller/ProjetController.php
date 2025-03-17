<?php

namespace App\Controller;

use App\Repository\ProjetRepository;
use App\Service\ApiKeyChecker;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface as SerializerSerializerInterface;

#[Route('/api/projet')]
final class ProjetController extends AbstractController
{
    #[Route('', name: 'get_a_projet', methods: ['GET'])]
    public function experience(Request $request, ApiKeyChecker $apiKeyChecker, ProjetRepository $projetRepository, SerializerSerializerInterface $serializer): JsonResponse
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
        $idProjet = $request->headers->get('idProjet');
        //Recupere l'experience seletionné
        $experience = $projetRepository->findOneBy(['id'=> $idProjet]);

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
