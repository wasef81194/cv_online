<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ApiProxyController extends AbstractController
{
    #[Route('/api/proxy', name: 'api_proxy', methods: ['GET'])]
    public function proxyRequest(): JsonResponse
    {
        $apiKey = $_ENV['KEY_API'];
        $client = HttpClient::create();
        $response = $client->request('GET', $_ENV['API_URL'], [
            'headers' => ['Authorization' => 'Bearer ' . $apiKey],
            'verify_peer' => false,
            'verify_host' => false
        ]);

        return new JsonResponse($response->toArray());
    }
}
