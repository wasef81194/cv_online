<?php

namespace App\Controller;

use App\Entity\Remind;
use App\Repository\ProfilRepository;
use App\Service\ApiKeyChecker;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api/remind')]
final class RemindController extends AbstractController
{
    #[Route('', name: 'remind')]
    public function formRemind(Request $request, ApiKeyChecker $apiKeyChecker, ProfilRepository $profilRepository, EntityManagerInterface  $entityManager): JsonResponse
    {
         // $admin = true;
        // if (!$admin) {
            //Verifie la clé
            $key = $request->headers->get('Authorization');
            if (!$apiKeyChecker->checkApiKey($key)) {
                return new JsonResponse(['error' => 'Key not found'], 400);
            }
        // }

        $content = $request->getContent();
        $data = json_decode($content, true);
        
        //Recherche le profil
        $profil = $profilRepository->findOneBy(['id' => $_ENV['ID_PROFIL']]);

        $remind = new Remind();
        $remind->setName($data['name']);
        $remind->setSociete($data['societe']);
        $remind->setPhoneNumber($data['phoneNumber']);
        $remind->setMessage($data['message']);
        $remind->setProfil($profil);
        

        try {
            $entityManager->persist($remind);
            $entityManager->flush();
    
            return new JsonResponse(['success' => "Votre demande de rappel a bien été prise en compte."], 200);
    
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Une erreur est survenue, veuillez réessayer.'], 500);
        }
    
    }
}
