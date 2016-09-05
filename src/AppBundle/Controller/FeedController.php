<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Feed;
use AppBundle\Form\FeedType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

/**
 * Class FeedController
 * @package AppBundle\Controller
 *
 * @Route("/feeds", defaults={"_format": "json"})
 */
class FeedController extends Controller
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @Route("", name="feeds_index")
     * @Method("GET")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine();

        $feeds = $em->getRepository(Feed::class)
            ->findAll();

        return $this->json($feeds, 200, [], ['group' => ['feed']]);
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @throws BadRequestHttpException
     *
     * @Route("", name="feeds_store")
     * @Method("POST")
     */
    public function storeAction(Request $request)
    {
        $feed = new Feed();
        $form = $this->createForm(FeedType::class, $feed);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($feed);
            $em->flush();

            $router = $this->get('router');

            return new Response('', 201, [
                'Location' => $router->generate(
                    'feeds_show',
                    ['id' => $feed->getId()]
                ),
            ]);
        }

        throw new BadRequestHttpException();
    }

    /**
     * @param Feed $feed
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws NotFoundHttpException
     *
     * @Route("/{slug}", name="feeds_show")
     */
    public function showAction(Feed $feed, Request $request)
    {
        return $this->json($feed, 200, [], ['group' => ['feed']]);
    }
}