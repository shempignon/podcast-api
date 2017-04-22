<?php
/**
 * @author Nicolas Saignes <nicolas@pointndots.com>
 */

namespace Tests\AppBundle\Command;


use AppBundle\Command\DeployProdCommand;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Console\Tester\CommandTester;

class DeployProdCommandTest extends KernelTestCase
{
    public function testExecute()
    {
        self::bootKernel();

        $application = new Application(self::$kernel);
        $application->add(new DeployProdCommand());

        $command = $application->find('deploy:prod');
        $commandTester = new CommandTester($command);
        $commandTester->execute([
            'command' => $command->getName(),
        ]);

        $this->assertContains('Deploy', $commandTester->getDisplay());
    }
}