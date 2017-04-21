<?php
/**
 * @author: Nicolas Saignes <n.saignes@highco-data.fr>
 */

namespace Tests\AppBundle\Service;

use AppBundle\Entity\Feed;
use AppBundle\Service\Exception\InvalidFeedException;
use AppBundle\Service\RefreshPodcast;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\TestCase;
use Symfony\Component\CssSelector\CssSelectorConverter;
use Symfony\Component\PropertyAccess\PropertyAccessor;

class RefreshPodcastTest extends TestCase
{
    /**
     * @var RefreshPodcast
     */
    private $refresher;

    public function setUp()
    {
        $accessor = $this->createMock(PropertyAccessor::class);
        $accessor->expects($this->any())->method('isReadable')->willReturn(true);
        $manager = $this->createMock(EntityManager::class);
        $converter = $this->createMock(CssSelectorConverter::class);
        $converter->method('toXPath')->will($this->onConsecutiveCalls('descendant-or-self::rss/channel', 'descendant-or-self::rss/channel/item'));

        $this->refresher = new RefreshPodcast($accessor, $manager, $converter, sys_get_temp_dir());;
    }

    /**
     * @test
     */
    public function testRefreshingANewFeed()
    {
        $feed = $this->createMock(Feed::class);
        $feed->expects($this->any())->method('getXml')->willReturn($this->getXml());
        $feed->expects($this->any())->method('getEpisodes')->willReturn(new ArrayCollection());
        $feed->expects($this->any())->method('getName')->willReturn(null);
        $feed->expects($this->any())->method('getImage')->willReturn(null);
        $feed->expects($this->any())->method('getSlug')->willReturn('random-slug');
        $this->refresher->setFeed($feed);

        $episodes = $this->refresher->execute();

        $this->assertCount(52, $episodes);
    }

    /**
     * @test
     */
    public function testExecuteWillThrowExceptionWhithoutFeed()
    {
        $this->expectException(InvalidFeedException::class);

        $this->refresher->execute();
    }

    /**
     * @return \SimpleXMLElement
     */
    private function getXml()
    {
        $xml = file_get_contents(realpath(
            __DIR__.'/../../../app/fixtures/xml/laravel.xml'
        ));

        $document = new \SimpleXMLElement($xml);
        $document->registerXPathNamespace('xhtml', 'http://www.w3.org/1999/xhtml');

        return $document;
    }

}