<?php
namespace AppBundle\Repository;

use AppBundle\Entity\Episode;
use Doctrine\ORM\EntityRepository;

class FeedRepository extends EntityRepository 
{
    /**
     * @param string $column
     * @param string $sort
     * @return array
     */
    public function findAll($column = 'updatedAt', $sort = 'DESC')
    {
        return $this->findBy([], [$column => $sort]);
    }
}