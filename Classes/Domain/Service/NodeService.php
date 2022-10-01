<?php
namespace NeosRulez\Neos\MultipleNodeCreation\Domain\Service;

use Neos\Flow\Annotations as Flow;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\ContentRepository\Domain\Repository\NodeDataRepository;

class NodeService
{

    /**
     * @Flow\Inject
     * @var \Neos\ContentRepository\Domain\Service\ContextFactoryInterface
     */
    protected $contextFactory;

    /**
     * @Flow\Inject
     * @var \Neos\ContentRepository\Domain\Service\NodeTypeManager
     */
    protected $nodeTypeManager;

    /**
     * @Flow\Inject
     * @var \Neos\ContentRepository\Domain\Service\NodeService
     */
    protected $nodeService;

    /**
     * @Flow\Inject
     * @var \Neos\Neos\Utility\NodeUriPathSegmentGenerator
     */
    protected $nodeUriPathSegmentGenerator;

    /**
     * @param array $nodes
     * @return void
     */
    public function createNodes(array $nodes):void
    {
        $context = $this->contextFactory->create();
        if(!empty($nodes)) {
            foreach ($nodes as $node) {
                if(array_key_exists('title', $node) && array_key_exists('nodeType', $node)) {
                    if($node['title'] && $node['nodeType']) {
                        $targetNode = $context->getNodeByIdentifier($node['focusedNode']);
                        $newNode = new \Neos\ContentRepository\Domain\Model\NodeTemplate();
                        $newNode->setProperty('title', $node['title']);
                        $newNode->setNodeType($this->nodeTypeManager->getNodeType($node['nodeType']));
                        $newNode->setHiddenInIndex($node['hidePagesInMenu']);
                        $createdNode = $targetNode->createNodeFromTemplate($newNode);
                        $createdNode->setHidden($node['hidePages']);
                        $this->nodeService->setDefaultValues($createdNode);
                        $uriPathSegment = $this->nodeUriPathSegmentGenerator->generateUriPathSegment($createdNode);
                        $createdNode->setProperty('uriPathSegment', $uriPathSegment);
                    }
                }
            }
        }

    }

}
