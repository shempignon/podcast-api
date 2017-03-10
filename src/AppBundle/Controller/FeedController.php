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

/**
 * Class FeedController.
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
        $feeds = $this->getDoctrine()
            ->getRepository(Feed::class)
            ->findAll();

        return $this->json($feeds, 200, [], ['groups' => ['smallFeed']]);
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @throws BadRequestHttpException
     *
     * @Route("/create", name="feeds_create", defaults={"_format": "html"})
     * @Method("GET")
     */
    public function createAction(Request $request)
    {
        $form = $this->createForm(FeedType::class, new Feed(), [
            'action' => $this->generateUrl('feeds_store'),
        ]);

        return $this->render('default/form.html.twig', [
            'form' => $form->createView(),
        ]);
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

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $refresher = $this->get('app.podcast.refresher');
            $refresher->setFeed($feed);
            $refresher->execute();
            $em->flush();

            $router = $this->get('router');

            return $this->json('', 201, ['Location' => $router->generate('feeds_show', ['slug' => $feed->getSlug()])]);
        }

        throw new BadRequestHttpException();
    }

    /**
     * @param Feed    $feed
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws NotFoundHttpException
     *
     * @Route("/{slug}", name="feeds_show")
     * @Method("GET")
     */
    public function showAction(Feed $feed, Request $request)
    {
        $data = $this->get('serializer')->normalize($feed, ' json', ['groups' => ['fullFeed']]);

        return $this->json($data);
    }

    /**
     * @param Feed $feed
     *
     * @return JsonResponse
     *
     * @throws NotFoundHttpException
     *
     * @Route("/{slug}", name="feeds_delete")
     * @Method("DELETE")
     */
    public function delete(Feed $feed)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($feed);
        $em->flush();

        return $this->json(null, 204);
    }

    /**
     * @param Feed $feed
     *
     * @throws NotFoundHttpException
     *
     * @return JsonResponse
     *
     * @Route("/{slug}/refresh", name="feeds_refresh")
     * @Method("GET")
     */
    public function refresh(Feed $feed)
    {
        $refresher = $this->get('app.podcast.refresher');
        $refresher->setFeed($feed);

        return new JsonResponse(count($refresher->execute()));
    }

    /**
     * @param Feed $feed
     *
     * @throws NotFoundHttpException
     *
     * @return JsonResponse
     *
     * @Route("/{slug}/download", name="feeds_refresh_download")
     * @Method("GET")
     */
    public function downloadAction(Feed $feed)
    {
        $refresher = $this->get('app.podcast.refresher');
        $refresher->setFeed($feed);

        $downloader = $this->get('app.podcast.downloader');
        $downloader->setEpisodes($refresher->execute());

        return $this->json($downloader->execute());
    }
}
