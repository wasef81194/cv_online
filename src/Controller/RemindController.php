<?php

namespace App\Controller;

use App\Entity\Remind;
use App\Repository\ProfilRepository;
use App\Service\ApiKeyChecker;
use App\Service\Mail;
use App\Service\MailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;

#[Route('/api/remind')]
final class RemindController extends AbstractController
{
    #[Route('', name: 'remind')]
    public function formRemind(Request $request, MailerInterface $mailer, ApiKeyChecker $apiKeyChecker, ProfilRepository $profilRepository, EntityManagerInterface  $entityManager, MailService $mailService): JsonResponse
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
        
        $message = "
        <h1>Demande de rappel</h1>
        <p>Nom : ".$data['name']." </p>
        <p>Societe : ".$data['societe']." </p>
        <p>Tel : <a href='tel:".$data['phoneNumber']."'>".$data['phoneNumber']." </a></p>
        <p>Message : ".$data['message']." </p>
        ";
        $mailService->send('alex.wasef@gmail.com', 'Demande de rappel', $message);

        try {
            $entityManager->persist($remind);
            $entityManager->flush();
            
            return new JsonResponse(['success' => "Votre demande de rappel a bien été prise en compte."], 200);
    
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Une erreur est survenue, veuillez réessayer.'], 500);
        }
    
    }

    // #[Route('/test', name: 'test')]
    // public function test(MailService $mailService): JsonResponse
    // {
        // $send = $mailService->send('alex.wasef@gmail.com', 'test', 'test');
        // dd($send);
    
    // }
}
