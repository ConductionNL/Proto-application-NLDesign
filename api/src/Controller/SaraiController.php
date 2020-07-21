<?php
namespace App\Controller;
use Conduction\CommonGroundBundle\Service\ApplicationService;
//use App\Service\RequestService;
use Conduction\CommonGroundBundle\Service\CommonGroundService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/sarai")
 */
class SaraiController extends AbstractController
{
    /**
     *
     * @Route("/")
     * @Template
     */
    public function indexAction(CommonGroundService $commonGroundService){

        $variables = [];

        $variables['templates'] = $commonGroundService->getResourceList(['component' => 'wrc', 'type' => 'templates'])["hydra:member"];

        return $variables;

    }
}
