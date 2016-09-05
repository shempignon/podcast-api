<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity
 * @ORM\Table(name="episodes")
 */
class Episode
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var integer
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     *
     * @Assert\NotBlank()
     *
     * @var string
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Gedmo\Slug(fields={"name"})
     *
     * @var string
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime", name="broadcasted_on")
     *
     * @Assert\DateTime()
     *
     * @var \DateTime
     */
    private $broadcastedOn;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Assert\Url(
     *    message = "The url '{{ value }}' is not a valid url",
     * )
     * @Assert\NotBlank()
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
     */
    public function setName($name)
    {
        $this->name = $name;
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
     */
    public function setBroadcastedOn($broadcastedOn)
    {
        $this->broadcastedOn = $broadcastedOn;
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
     */
    public function setUrl($url)
    {
        $this->url = $url;
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
     */
    public function setFeed($feed)
    {
        $this->feed = $feed;
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
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
    }
}