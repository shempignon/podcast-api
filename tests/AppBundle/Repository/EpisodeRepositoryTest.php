<?php
/**
 * @author Nicolas Saignes <nicolas@pointndots.com>
 */

namespace Tests\AppBundle\Repository;

use Tests\FixturesTestCase;

class EpisodeRepositoryTest extends FixturesTestCase
{
    public function testGetLatest()
    {
        $episodes = $this->getManager()
            ->getRepository('AppBundle:Episode')
            ->getLatest(0, false);

        $this->assertCount(20, $episodes);
    }
}
