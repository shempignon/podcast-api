<?php

namespace AppBundle\Service;

use AppBundle\Entity\Episode;
use AppBundle\Entity\Feed;
use AppBundle\Service\Exception\InvalidFeedException;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Symfony\Component\CssSelector\CssSelectorConverter;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\PropertyAccess\PropertyAccessor;

class RefreshPodcast
{
    /**
     * @var EntityManager
     */
    private $manager;

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
     * @var string
     */
    private $feedDirectory;

    /**
     * RefreshPodcast constructor.
     *
     * @param PropertyAccessor $accessor
     * @param EntityManager $entityManager
     * @param CssSelectorConverter $converter
     * @param string $feedDirectory
     */
    public function __construct(
        PropertyAccessor $accessor,
        EntityManager $entityManager,
        CssSelectorConverter $converter,
        $feedDirectory
    ) {
        $this->accessor = $accessor;
        $this->manager = $entityManager;
        $this->converter = $converter;
        $this->feedDirectory = $feedDirectory;
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

        if (null === $this->feed->getName() || null === $this->feed->getImage()) {
            $this->updateFeed();
        }

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
        return $this->findInXML('rss > channel > item');
    }

    /**
     * @return \SimpleXMLElement[]
     */
    private function getChannel()
    {
        return $this->findInXML('rss > channel');
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

        $this->manager->flush();

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
        $this->manager->persist($newEpisode);
        $this->episodes->add($newEpisode);
    }

    /**
     * Update the feed with the XML data.
     */
    private function updateFeed()
    {
        foreach ($this->getChannel() as $channel) {
            if ($this->accessor->isReadable($channel, 'title')) {
                $this->feed->setName((string) $this->accessor->getValue($channel, 'title'));
            }

            if ($this->accessor->isReadable($channel, 'image.url')) {
                $this->feed->setImage((string) $this->accessor->getValue($channel, 'image.url'));
            }
        }

        $this->manager->persist($this->feed);
        // We are forced to flush to generate the slug
        $this->manager->flush([$this->feed]);

        (new  Filesystem())->mkdir($this->feedDirectory.$this->feed->getSlug());
    }

    /**
     * @param $cssExpr
     *
     * @return \SimpleXMLElement[]
     */
    private function findInXML($cssExpr)
    {
        return $this->document->xpath($this->converter->toXPath($cssExpr));
    }
}
