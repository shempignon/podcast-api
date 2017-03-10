<?php

namespace AppBundle\Entity\Traits;

use Gedmo\Timestampable\Traits\TimestampableEntity;

trait Timestampable
{
    use TimestampableEntity;

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updateTimestamps()
    {
        if (null === $this->createdAt) {
            $this->setCreatedAt(new \DateTime());
        }

        $this->setUpdatedAt(new \DateTime());
    }
}
