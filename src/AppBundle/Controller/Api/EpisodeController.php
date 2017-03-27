<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Episode;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class EpisodeController.
 *
 * @Route("/episodes", defaults={"_format": "json"})
 */
class EpisodeController extends Controller
{
    /**
     * @param bool $downloaded
     * @param Request $request
     * @return JsonResponse
     *
     * @Route("/latest/{downloaded}", name="feeds_latest")
     * @Method("GET")
     */
    public function latestAction(Request $request, $downloaded = false)
    {
        $em = $this->getDoctrine();
        $offset = $request->query->get('offset', 0);
        $episodes = $em->getRepository(Episode::class)
            ->getLatest($offset, $downloaded);

        $data = $this->get('serializer')->normalize($episodes, ' json', ['groups' => ['fullFeed']]);

        return $this->json($data);
    }
}
