<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Feed;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function indexAction(Request $request)
    {
        $feeds = $this->getDoctrine()
            ->getRepository(Feed::class)
            ->findAll();

        return new JsonResponse($feeds);
    }
}
