<?php

namespace AppBundle\Service;

use AppBundle\Entity\Episode;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use GuzzleHttp\Client;

class EpisodeDownloader
{
    /**
     * @var ArrayCollection
     */
    private $episodes;

    /**
     * @var Client
     */
    private $client;

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var string
     */
    private $downloadDirectory;

    /**
     * @var ArrayCollection
     */
    private $downloadedEpisodes;

    public function __construct($client, $em, $downloadDirectory)
    {
        $this->client = $client;
        $this->em = $em;
        $this->downloadDirectory = $downloadDirectory;
        $this->downloadedEpisodes = new ArrayCollection();
    }

    /**
     * @param ArrayCollection $episodes
     */
    public function setEpisodes(ArrayCollection $episodes)
    {
        $this->episodes = $episodes;
    }

    /**
     * @return ArrayCollection
     */
    public function execute()
    {
        foreach ($this->episodes as $episode) {
            /** @var Episode $episode */
            if (!$episode->hasBeenDownloaded()) {
                $this->download($episode);
            }
        }

        $this->em->flush();

        return $this->downloadedEpisodes;
    }

    /**
     * @param Episode $episode
     */
    private function download($episode)
    {
        $episode = $episode->prepareLocal();

        $this->client->get($episode->getUrl(), [
            'save_to' => $this->buildFullLocalPath($episode),
        ]);

        $this->saveEpisode($episode);
    }

    /**
     * @param Episode $episode
     *
     * @return string
     */
    private function buildFullLocalPath($episode)
    {
        return sprintf(
            '%s%s',
            $this->downloadDirectory,
            $episode->getLocal()
        );
    }

    /**
     * @param Episode $episode
     */
    private function saveEpisode($episode)
    {
        $this->em->persist($episode);
        $this->downloadedEpisodes->add($episode);
    }
}
