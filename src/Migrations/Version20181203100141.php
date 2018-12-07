<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;


final class Version20181203100141 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE user ADD `create` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, ADD visit DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL');
    }

    public function down(Schema $schema) : void
    {

        $this->addSql('ALTER TABLE category CHANGE updated_at_banner_file updated_at_banner_file DATETIME DEFAULT CURRENT_TIMESTAMP');
        $this->addSql('ALTER TABLE user DROP `create`, DROP visit');
    }
}
