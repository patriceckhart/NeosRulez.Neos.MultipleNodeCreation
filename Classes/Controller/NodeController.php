<?php
namespace NeosRulez\Neos\MultipleNodeCreation\Controller;

/*
 * This file is part of the NeosRulez.Neos.MultipleNodeCreation package.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\View\JsonView;

class NodeController extends ActionController
{

    /**
     * @var string string
     */
    protected $defaultViewObjectName = JsonView::class;

    /**
     * @Flow\Inject
     * @var \NeosRulez\Neos\MultipleNodeCreation\Domain\Service\NodeService
     */
    protected $nodeService;

    /**
     * @return void
     */
    public function createAction():void
    {
        $this->nodeService->createNodes($this->request->getArguments());
    }

}
