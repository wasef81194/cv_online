<?php 
namespace App\Service;

class ApiKeyChecker
{
    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = $_ENV["KEY_API"];
    }

    public function checkApiKey(?string $key): bool
    {
        // Vérifiez si la clé est définie ou vide
        if ($key === null || empty($key)) {
            return false;
        }

        // Vérifiez si la clé correspond à celle définie dans l'environnement
        if ($key !== $this->apiKey) {
            //dd('key does not match');
            dd($this->apiKey, $key);
            return false;
        }
       
        // Si tout est correct, la clé est valide
        return true;
    }
}
