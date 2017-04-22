<?php
/**
 * @author Nicolas Saignes <nicolas@pointndots.com>
 */

namespace Tests\AppBundle\Repository;

use Tests\FixturesTestCase;

class FeedRepositoryTest extends FixturesTestCase
{
    public function testFindAll()
    {
        $feeds = $this->getManager()
            ->getRepository('AppBundle:Feed')
            ->findAll('name');

        $first = reset($feeds);

        $this->assertCount(2, $feeds);
        $this->assertEquals('The Symfony Podcast', $first->getName());
    }
}
