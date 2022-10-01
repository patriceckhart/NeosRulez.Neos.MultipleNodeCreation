import React, {Fragment, PureComponent} from 'react';
import manifest from '@neos-project/neos-ui-extensibility';
import MultipleSiteNodeCreation from "./components/MultipleSiteNodeCreation";

manifest('NeosRulez.Neos.MultipleNodeCreation', {}, (globalRegistry, {frontendConfiguration}) => {
    const containerRegistry = globalRegistry.get('containers');
    const originalPageTreeSearchbar = containerRegistry.get('LeftSideBar/Top/PageTreeSearchbar');
    const configuration = {
        minimumRows: frontendConfiguration['NeosRulez.Neos.MultipleNodeCreation:MinimumRows']
    }
    containerRegistry.set('LeftSideBar/Top/PageTreeSearchbar', extendedPageTreeSearchbar(originalPageTreeSearchbar, configuration));
});

const extendedPageTreeSearchbar = (OriginalPageTreeSearchbar, configuration) => {
    return class pageTreeSearchbar extends PureComponent {
        render() {
            return (
                <Fragment>
                    <OriginalPageTreeSearchbar />
                    <MultipleSiteNodeCreation configuration={configuration} />
                </Fragment>
            );
        }
    }
};
