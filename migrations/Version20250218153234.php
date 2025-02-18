<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250218153234 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE diplome DROP FOREIGN KEY FK_EB4C4D4E3DA5256D');
        $this->addSql('DROP INDEX UNIQ_EB4C4D4E3DA5256D ON diplome');
        $this->addSql('ALTER TABLE diplome DROP image_id');
        $this->addSql('ALTER TABLE image ADD diplome_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F26F859E2 FOREIGN KEY (diplome_id) REFERENCES diplome (id)');
        $this->addSql('CREATE INDEX IDX_C53D045F26F859E2 ON image (diplome_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE diplome ADD image_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE diplome ADD CONSTRAINT FK_EB4C4D4E3DA5256D FOREIGN KEY (image_id) REFERENCES image (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_EB4C4D4E3DA5256D ON diplome (image_id)');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F26F859E2');
        $this->addSql('DROP INDEX IDX_C53D045F26F859E2 ON image');
        $this->addSql('ALTER TABLE image DROP diplome_id');
    }
}
