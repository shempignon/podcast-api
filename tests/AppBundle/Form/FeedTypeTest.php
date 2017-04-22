<?php
/**
 * @author Nicolas Saignes <nicolas@pointndots.com>
 */

namespace Tests\AppBundle\Form;

use AppBundle\Entity\Feed;
use AppBundle\Form\FeedType;
use Symfony\Component\Form\Test\TypeTestCase;

class FeedTypeTest extends TypeTestCase
{
    public function testSubmitValidData()
    {
        $formData = [
            'url' => 'http://simplecast.com/podcasts/351/rss',
        ];

        $feed = new Feed();
        $feed->setUrl('http://simplecast.com/podcasts/351/rss');

        $form = $this->factory->create(FeedType::class);
        $form->submit($formData);

        $this->assertTrue($form->isSynchronized());
        $this->assertEquals($feed, $form->getData());

        $view = $form->createView();
        $children = $view->children;

        foreach (array_keys($formData) as $key) {
            $this->assertArrayHasKey($key, $children);
        }
    }
}
