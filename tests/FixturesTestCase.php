<?php
/**
 * @author Nicolas Saignes <nicolas@pointndots.com>
 */

namespace Tests;

use Doctrine\ORM\Tools\SchemaTool;
use Nelmio\Alice\Loader\NativeLoader;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class FixturesTestCase extends KernelTestCase
{
    public function setUp()
    {
        self::bootKernel();

        $this->buildSchema();

        $this->loadFixtures();
    }

    public function tearDown()
    {
        $this->getManager()->clear();
    }

    protected function buildSchema()
    {
        $metadata = $this->getMetadata();

        if (!empty($metadata)) {
            $tool = new SchemaTool($this->getManager());
            $tool->dropSchema($metadata);
            $tool->createSchema($metadata);
        }
    }

    protected function getMetadata()
    {
        return $this->getManager()->getMetadataFactory()->getAllMetadata();
    }

    protected function getManager()
    {
        return $this->getContainer()->get('doctrine.orm.entity_manager');
    }

    private function getContainer()
    {
        return static::$kernel->getContainer();
    }

    public function loadFixtures()
    {
        $loader = new NativeLoader();
        $fixturesPath = realpath(__DIR__ . '/../app/fixtures/list.yml');

        foreach ($loader->loadFile($fixturesPath)->getObjects() as $object) {
            $this->getManager()->persist($object);
        }

        $this->getManager()->flush();
    }
}
