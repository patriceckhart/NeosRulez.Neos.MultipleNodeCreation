import React, {PureComponent} from 'react';
import {Button, Dialog, SelectBox, TextInput} from "@neos-project/react-ui-components";
import styles from "../styles.css"
import {neos} from '@neos-project/neos-ui-decorators';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
class MultipleSiteNodeCreationRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: false,
            nodeType: false,
            nodeTypes: []
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.setNode = this.setNode.bind(this);
    }

    onValueChange(value) {
        this.setState({nodeType: value}, () => {
            this.setNode();
        });
    }

    onTextChange(value) {
        this.setState({title: value}, () => {
            this.setNode();
        });
    }

    setNode() {
        const node = {id: this.props.id, title: this.state.title, nodeType: this.state.nodeType};
        this.props.setNode(node);
    }

    componentDidMount() {
        const i18nRegistry = this.props.i18nRegistry;
        const nodeTypes = JSON.parse(this.props.nodeTypes).nodeTypes;
        const superTypes = JSON.parse(this.props.nodeTypes).inheritanceMap.subTypes['Neos.Neos:Document'];
        let result = [];
        for(let i in superTypes) {
            let superType = superTypes[i].replace('"', '');
            if(nodeTypes[superType] !== undefined) {
                let label = nodeTypes[superType].ui.label;
                let icon = nodeTypes[superType].ui.icon;
                let item = {
                    label: i18nRegistry.translate(unescape(label)),
                    icon: icon,
                    value: superType
                }
                if(label !== undefined) {
                    result.push(item);
                }
            }
        }
        this.setState({nodeTypes: result});
    }

    render() {

        return (
            <div className={styles.row} >
                <div className={styles.column} >
                    <TextInput placeholder={this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.title'))} onChange={(p) => this.onTextChange(p)} />
                </div>
                <div className={styles.column} >
                    <SelectBox placeholder={this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.nodeType'))} options={this.state.nodeTypes} value={this.state.nodeType} onValueChange={(p) => this.onValueChange(p)} />
                </div>
            </div>
        );
    }
}

export default MultipleSiteNodeCreationRow;
