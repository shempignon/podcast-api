<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class EpisodeRepository extends EntityRepository
{
    /**
     * @param $offset
     * @param $downloaded
     * @return array
     */
    public function getLatest($offset, $downloaded)
    {
        $local = ($downloaded) ? 'is not null' : 'is null';

        return $this->createQueryBuilder('e')
            ->orderBy('e.broadcastedOn')
            ->where("e.local $local")
            ->orderBy('e.broadcastedOn', 'desc')
            ->setFirstResult($offset)
            ->setMaxResults(20)
            ->getQuery()
            ->getResult();
    }
}
