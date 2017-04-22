<?php
/**
 * @author Nicolas Saignes <nicolas@pointndots.com>
 */

namespace Tests\AppBundle\Service;

use AppBundle\Entity\Episode;
use AppBundle\Service\EpisodeDownloader;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use GuzzleHttp\Client;
use PHPUnit\Framework\TestCase;

class EpisodeDownloaderTest extends TestCase
{
    /**
     * @var EpisodeDownloader
     */
    private $downloader;

    public function setUp()
    {
        $client = $this->createMock(Client::class);
        $manager = $this->createMock(EntityManager::class);

        $this->downloader = new EpisodeDownloader(
            $client,
            $manager,
            sys_get_temp_dir()
        );
    }

    public function testExecute()
    {
        $episode = $this->createMock(Episode::class);
        $episode->expects($this->any())->method('hasBeenDownloaded')->willReturn(false);
        $episode->expects($this->any())->method('buildLocal')->willReturn('random-local');
        $episode->expects($this->any())->method('getUrl')->willReturn('random-url');
        $episode->expects($this->any())->method('prepareLocal')->willReturn($episode);

        $this->downloader->setEpisodes(new ArrayCollection([$episode]));

        $episodes = $this->downloader->execute();

        $this->assertCount(1, $episodes);
    }
}
