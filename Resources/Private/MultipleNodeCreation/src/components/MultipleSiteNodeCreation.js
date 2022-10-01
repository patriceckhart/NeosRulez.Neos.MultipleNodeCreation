import React, {PureComponent} from 'react';
import {Button, Icon} from "@neos-project/react-ui-components";
import styles from "../styles.css"
import MultipleSiteNodeCreationDialog from "./MultipleSiteNodeCreationDialog";
import {neos} from '@neos-project/neos-ui-decorators';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
class MultipleSiteNodeCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
        };
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggleDialog() {
        this.setState(prevState => ({
            showDialog: !prevState.showDialog
        }));
    }

    render() {

        const {minimumRows} = this.props.configuration;

        return (
            <div className={styles.createMultipleSiteNodeWrapper} >
                <Button style="clean" onClick={() => this.toggleDialog()}>
                    <Icon icon="fas fa-plus" style={{marginRight: '0.5em'}} /> <span>{this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.header'))}</span>
                </Button>
                {this.state.showDialog &&
                    <MultipleSiteNodeCreationDialog toggleDialog={() => this.toggleDialog()} minimumRows={minimumRows} />
                }
            </div>
        );
    }
}

export default MultipleSiteNodeCreation;
