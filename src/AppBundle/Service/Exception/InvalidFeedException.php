<?php
namespace AppBundle\Service\Exception;

class InvalidFeedException extends \InvalidArgumentException
{
    /**
     * InvalidFeedException constructor.
     *
     * @param string $message
     */
    public function __construct($message = 'You must provide a valid feed entity')
    {
        parent::__construct($message);
    }
}