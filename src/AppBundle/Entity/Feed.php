<?php
namespace AppBundle\Entity;

use AppBundle\Entity\Traits\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity
 * @ORM\Table
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FeedRepository")
 * @UniqueEntity("url")
 * @ORM\HasLifecycleCallbacks
 */
class Feed
{
    use Timestampable;

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     *
     * @Assert\NotBlank
     *
     * @Groups({"smallFeed", "fullFeed"})
     *
     * @var string
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Gedmo\Slug(fields={"name"})
     *
     * @Groups({"smallFeed", "fullFeed"})
     *
     * @var string
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @Assert\Url
     * @Assert\NotBlank
     *
     * @var string
     */
    private $url;

    /**
     * @ORM\OneToMany(targetEntity="Episode", mappedBy="feed", cascade={"all"})
     *
     * @Groups({"fullFeed"})
     *
     * @var ArrayCollection
     */
    private $episodes;

    /**
     * Feed constructor.
     */
    public function __construct()
    {
        $this->episodes = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return ArrayCollection
     */
    public function getEpisodes()
    {
        return $this->episodes;
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

    /**
     * @param Episode $newEpisode
     *
     * @return bool
     */
    public function hasEpisode(Episode $newEpisode)
    {
        $criteria = (Criteria::create())->where(
            (Criteria::expr())->eq('guid', $newEpisode->getGuid())
        );

        return (bool) $this->episodes
            ->matching($criteria)
            ->count();
    }
}