<?php

namespace Features\Bootstrap;

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Behat\Tester\Exception\PendingException;
use Behat\Symfony2Extension\Context\KernelDictionary;
use Doctrine\Common\Persistence\ObjectManager;
use Exception;
use stdClass;
use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Defines application features from the specific context.
 */
class FeatureContext implements Context
{
    use KernelDictionary;

    /**
     * @var JsonResponse
     */
    protected $response;

    /**
     * @var array
     */
    protected $fixtures;

    /**
     * @var ObjectManager
     */
    protected $manager;

    /**
     * @var stdClass
     */
    protected $json;

    /**
     * Initialize scenario parameters.
     *
     * @param BeforeScenarioScope $scope
     *
     * @BeforeScenario
     */
    public function before(BeforeScenarioScope $scope)
    {
        $this->manager = $this->getContainer()->get('doctrine')->getManager();
    }

    /**
     * @param string $path
     * @param string $method
     * @param string $params
     *
     * @When the user :method :params to the :path path
     * @When the user browses the :path path
     */
    public function browse($path, $method = 'GET', $params = '[]')
    {
        $client = $this->getClient();

        $client->request(
            $method,
            $path,
            json_decode($params, true)
        );

        $this->response = $client->getResponse();
        $this->json = json_decode($this->response->getContent());
    }

    /**
     * @return Client
     */
    public function getClient()
    {
        return $this->getContainer()->get('test.client');
    }

    /**
     * @param $expectedCode
     * @throws Exception When excepted code differs from the received one
     *
     * @Then the user should get a :expectedCode response
     */
    public function assertResponse($expectedCode)
    {
        if ($receivedCode = (string) $this->response->getStatusCode() !== $expectedCode) {
            $format = 'Expected a "%s" status code, received "%s". Content [%s]';
            $message = sprintf($format, $expectedCode, $receivedCode, $this->response->getContent());
            throw new Exception($message);
        }
    }

    /**
     * @Given data are loaded
     */
    public function dataAreLoaded()
    {
        throw new PendingException();
    }
}
