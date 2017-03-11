<?php

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

class DeployProdCommand extends ContainerAwareCommand
{
    /**
     * @var OutputInterface
     */
    protected $output;

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('deploy:prod')
            ->setDescription('Deploying !');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->output = $output;

        $this->setupDatabase();
        $this->buildAssets();

        $this->output->writeln('Deploy successful !');
    }

    /**
     * Create the database, and update it if needed
     */
    private function setupDatabase()
    {
        $this->output->writeln('Setting up database ...');

        if ($this->getContainer()->hasParameter('database_path') &&
            !is_file($filepath = $this->getContainer()->getParameter('database_path'))) {
            $this->output->writeln('Creating the database file ...');

            (new Filesystem())->touch($filepath);
        }

        $create = 'doctrine:database:create';
        $update = 'doctrine:schema:update';
        $creatingCommand = $this->getApplication()->find($create);
        $updatingCommand = $this->getApplication()->find($update);
        $creatingCommand->run(new ArrayInput(['command' => $create]), $this->output);
        $updatingCommand->run(new ArrayInput(['command' => $update, '--force' => true]), $this->output);

        $this->output->writeln('Database has been setup !');
    }

    /**
     *
     */
    private function buildAssets()
    {
        $this->output->writeln('Setting up assets ...');

        $output = $this->output;

        $npmStart = new Process('npm install');
        $npmStart->start();
        $npmStart->wait(function ($type, $buffer) use ($output) {
            $output->writeln($buffer);
        });

        $npnBuild = new Process('npm build');
        $npnBuild->start();
        $npnBuild->wait(function ($type, $buffer) use ($output) {
            $output->writeln($buffer);
        });

        $this->output->writeln('Assets have been setup !');
    }
}
