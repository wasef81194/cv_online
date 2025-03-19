<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;

class MailService
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function send(string $to, string $subject, string $message): bool
    {
        try {
            // Configuration de l'email
            $email = (new Email())
                ->from(new Address('myonlinecoachcontact@gmail.com', 'CV Online')) // Adresse expéditeur
                ->to(new Address($to)) // Adresse destinataire
                ->subject($subject) // Sujet
                ->text(strip_tags($message)) // Contenu texte brut
                ->html($message); // Contenu HTML

            // Envoi de l'email
            $this->mailer->send($email);

            return true; // Succès

        } catch (\Exception $e) {
            // Affiche le message d'erreur pour débogage
            dd('Erreur lors de l\'envoi d\'email : ' . $e->getMessage());
            return false;
        }
    }
}
