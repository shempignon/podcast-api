<?php

namespace AppBundle\Entity;

use AppBundle\Entity\Traits\Timestampable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity
 * @ORM\Table(name="episodes")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EpisodeRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Episode
{
    use Timestampable;

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * @ORM\Column
     *
     * @Assert\NotBlank
     *
     * @var string
     */
    private $guid;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Assert\NotBlank
     *
     * @Groups({"fullFeed", "episodes"})
     *
     * @var string
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Gedmo\Slug(fields={"name", "broadcastedOn"})
     *
     * @var string
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime", name="broadcasted_on")
     *
     * @Assert\DateTime
     *
     * @Groups({"fullFeed", "episodes"})
     *
     * @var \DateTime
     */
    private $broadcastedOn;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Assert\Url
     * @Assert\NotBlank
     *
     * @Groups({"fullFeed", "episodes"})
     *
     * @var string
     */
    private $url;

    /**
     * @ORM\Column(type="string", length=255, unique=true, nullable=true)
     *
     * @var string|null
     */
    private $local;

    /**
     * @ORM\ManyToOne(targetEntity="Feed", inversedBy="episodes")
     * @ORM\JoinColumn(name="feed_id", referencedColumnName="id")
     *
     * @Groups({"episodes"})
     * @var Feed
     */
    private $feed;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     *
     * @return Episode
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getBroadcastedOn()
    {
        return $this->broadcastedOn;
    }

    /**
     * @param \DateTime $broadcastedOn
     *
     * @return Episode
     */
    public function setBroadcastedOn($broadcastedOn)
    {
        $this->broadcastedOn = $broadcastedOn;

        return $this;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     *
     * @return Episode
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getLocal()
    {
        return $this->local;
    }

    /**
     * @param null|string $local
     */
    public function setLocal($local)
    {
        $this->local = $local;
    }

    /**
     * @return Feed
     */
    public function getFeed()
    {
        return $this->feed;
    }

    /**
     * @param Feed $feed
     *
     * @return Episode
     */
    public function setFeed($feed)
    {
        $this->feed = $feed;

        return $this;
    }

    /**
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param string $slug
     *
     * @return Episode
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return bool
     */
    public function hasBeenDownloaded()
    {
        return null !== $this->getLocal();
    }

    public function buildLocal()
    {
        return sprintf(
            '%s'.DIRECTORY_SEPARATOR.'%s.%s',
            $this->getFeed()->getSlug(),
            $this->getSlug(),
            $this->guessExtension()
        );
    }

    private function guessExtension()
    {
        $elements = explode('.', $this->getUrl());

        return end($elements);
    }

    /**
     * @return Episode
     */
    public function prepareLocal()
    {
        $this->setLocal($this->buildLocal());

        return $this;
    }

    /**
     * @return string
     */
    public function getGuid()
    {
        return $this->guid;
    }

    /**
     * @param string $guid
     *
     * @return Episode
     */
    public function setGuid(string $guid)
    {
        $this->guid = $guid;

        return $this;
    }
}
