<?php
namespace AppBundle\Service;

use AppBundle\Entity\Episode;
use AppBundle\Entity\Feed;
use AppBundle\Service\Exception\InvalidFeedException;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
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
     * @var ArrayCollection
     */
    private $episodes;

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
        $this->episodes = new ArrayCollection();
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
     * @return ArrayCollection
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
     * @param $episode
     *
     * @return bool|DateTime
     */
    private static function getEpisodeDate($episode)
    {
        return DateTime::createFromFormat(DateTime::RSS, $episode->pubDate);
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
     * @return ArrayCollection
     */
    private function searchForNewEpisodes()
    {
        foreach ($this->getEpisodes() as $episode) {
            $newEpisode = $this->setNewEpisode($episode);

            if (!$this->feed->hasEpisode($newEpisode)) {
                $this->save($newEpisode);
            }
        }

        $this->em->flush();

        return $this->episodes;
    }

    /**
     * @param $episode
     *
     * @return Episode
     */
    private function setNewEpisode($episode)
    {
        return (new Episode())
            ->setFeed($this->feed)
            ->setName((string) $episode->title)
            ->setUrl((string) $episode->enclosure->attributes()['url'])
            ->setGuid((string) $episode->guid)
            ->setBroadcastedOn(self::getEpisodeDate($episode));
    }

    /**
     * @param Episode $newEpisode
     */
    private function save(Episode $newEpisode)
    {
        $this->em->persist($newEpisode);
        $this->episodes->add($newEpisode);
    }
}