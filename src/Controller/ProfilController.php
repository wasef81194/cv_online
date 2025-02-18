<?php

namespace App\Controller;

use App\Entity\Profil;
use App\Repository\ProfilRepository;
use App\Service\ApiKeyChecker;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/profil')]
final class ProfilController extends AbstractController
{
     //Recuperer toutes les information
     #[Route('', name: 'get_infos_profil', methods: ['GET'])]
     public function infos(Request $request, ApiKeyChecker $apiKeyChecker, ProfilRepository $profilRepository, SerializerInterface $serializer): JsonResponse
     {
        // $admin = true;
        // if (!$admin) {
            //Verifie la clé
            $key = $request->headers->get('Authorization');
            if (!$apiKeyChecker->checkApiKey($key)) {
                return new JsonResponse(['error' => 'Key not found'], 400);
            }
        // }
        
        //Recupere toutes les infos du profil
        $profil = $profilRepository->findOneBy(['id' => $_ENV['ID_PROFIL']]);
        if (!$profil) {
            return new JsonResponse(['error' => 'Profil not found'], 404);
        }
        // dd($profil);
        // Sérialise l'objet profil en JSON et le décode en tableau associatif
        $jsonProfil = $serializer->serialize($profil, 'json', [
            'circular_reference_handler' => function ($object) {return $object->getId();},
        ]);
        $profilArray = json_decode($jsonProfil, true);
       
        // Retourne la réponse JSON
        return new JsonResponse($profilArray, 200);
    }
}
