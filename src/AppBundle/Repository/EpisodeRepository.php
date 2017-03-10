<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class EpisodeRepository extends EntityRepository
{
    /**
     * @param $downloaded
     *
     * @return array
     */
    public function getLatest($downloaded)
    {
        $local = ($downloaded) ? 'is not null' : 'is null';

        return $this->createQueryBuilder('e')
            ->orderBy('e.broadcastedOn')
            ->where("e.local $local")
            ->getQuery()
            ->getResult();
    }
}
