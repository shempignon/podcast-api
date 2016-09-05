<?php
namespace AppBundle\Service;

use AppBundle\Entity\Episode;
use AppBundle\Entity\Feed;
use AppBundle\Service\Exception\InvalidFeedException;
use Doctrine\ORM\EntityManager;
use Symfony\Component\CssSelector\CssSelectorConverter;

class RefreshPodcast
{
    /**
     * @var EntityManager
     */

    private $em;

    /**
     * @var Feed
     */
    private $feed;

    /**
     * @var CssSelectorConverter
     */
    private $converter;

    /**
     * @var \SimpleXMLElement
     */
    private $document;

    /**
     * RefreshPodcast constructor.
     *
     * @param EntityManager $entityManager
     * @param CssSelectorConverter $converter
     */
    public function __construct(EntityManager $entityManager, CssSelectorConverter $converter)
    {
        $this->em = $entityManager;
        $this->converter = $converter;
    }

    private static function getEpisodeDate($episode)
    {
        return \DateTime::createFromFormat(\DateTime::RSS, $episode->pubDate);
    }

    /**
     * @param Feed $feed
     *
     * @var Feed
     */
    public function setFeed(Feed $feed)
    {
        $this->feed = $feed;
    }

    /**
     * @return array
     */
    public function execute()
    {
        if (null === $this->feed) {
            throw new InvalidFeedException();
        }

        $this->document = $this->getXmlFromFeed();

        $newEpisodes = $this->searchForNewEpisodes();

        return $newEpisodes;
    }

    /**
     * @return \SimpleXMLElement
     */
    private function getXmlFromFeed()
    {
        $document = new \SimpleXMLElement($this->feed->getUrl(), 0, true);
        $document->registerXPathNamespace('xhtml', 'http://www.w3.org/1999/xhtml');

        return $document;
    }

    /**
     * @return \SimpleXMLElement[]
     */
    private function getEpisodes()
    {
        return $this->document->xpath($this->converter->toXPath('rss > channel > item'));
    }

    /**
     * @return array
     */
    private function searchForNewEpisodes()
    {
        $newEpisodes = [];

        foreach ($this->getEpisodes() as $episode) {
            $newEpisode = $this->setNewEpisode($episode);

            if (!$this->feed->hasEpisode($newEpisode)) {
                $this->em->persist($newEpisode);
                $newEpisodes[] = $newEpisode;
            }
        }

        $this->em->flush();

        return $newEpisodes;
    }

    /**
     * @param $episode
     *
     * @return Episode
     */
    private function setNewEpisode($episode)
    {
        $broadcastedOn = self::getEpisodeDate($episode);
        $newEpisode = new Episode();
        $newEpisode->setFeed($this->feed);
        $newEpisode->setName((string) $episode->title . ' - ' . $broadcastedOn->format('Y-m-d'));
        $newEpisode->setUrl($episode->enclosure->attributes()['url']);
        $newEpisode->setBroadcastedOn($broadcastedOn);

        return $newEpisode;
    }
}