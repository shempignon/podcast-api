<?php

namespace Features\Bootstrap;

use Behat\Behat\Context\Context;
use Behat\Symfony2Extension\Context\KernelDictionary;

/**
 * Defines application features from the specific context.
 */
class FeatureContext implements Context
{
    use KernelDictionary;
}
