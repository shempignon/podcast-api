<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertContains('Podcast', $crawler->filter('title')->text());
    }

    public function testFail()
    {
        $workouts = [
            'crossfist' => ['Zak', 'Quentin'],
            'jogging' => ['Nicolas', 'Matthieu'],
        ];

        $this->assertArrayHasKey('cross fit', $workouts);
    }
}
