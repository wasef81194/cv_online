<?php

namespace App\Controller;

use App\Service\ApiKeyChecker;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

final class AppController extends AbstractController
{
    //Route api symfony
    #[Route('/api', name: 'api', methods: ['GET'])]
    public function api(Request $request, ApiKeyChecker $apiKeyChecker): JsonResponse
    { 
        // Récupérer le paramètre 'key' depuis la requête GET
        $key = $request->query->get('key');
        // Vérifiez si la clé est la bonne
        if ($apiKeyChecker->checkApiKey($key)) {
            return new JsonResponse(['success' => 'Access authorize'], 200);
        }
        else{
            return new JsonResponse(['error' => 'Key not found'], 400);
        }
    }

    //Route react
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('base.html.twig', []);
    }
    //Route react
    #[Route('/{reactRouting}', name: 'app_react')]
    public function reactRoute(): Response
    {
        return $this->render('base.html.twig', []);
    }
}
