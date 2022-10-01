import React, {Fragment, PureComponent} from 'react';
import {Button, CheckBox, Dialog, Label} from "@neos-project/react-ui-components";
import MultipleSiteNodeCreationRow from "./MultipleSiteNodeCreationRow";
import styles from "../styles.css"
import {connect} from 'react-redux';
import {selectors, actions} from '@neos-project/neos-ui-redux-store';
import {$transform} from 'plow-js';
import {neos} from '@neos-project/neos-ui-decorators';

@connect($transform({
    siteNodeSelector: selectors.CR.Nodes.siteNodeSelector,
    focusedNodeIdentifier: selectors.CR.Nodes.focusedNodeIdentifierSelector,
}))
@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
class MultipleSiteNodeCreationDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeTypes: false,
            rows: false,
            count: 0,
            hidePages: false,
            hidePagesInMenu: false,
            nodes: [],
            creating: false
        };
        this.addLines = this.addLines.bind(this);
        this.fetchNodeTypes = this.fetchNodeTypes.bind(this);
        this.createNodes = this.createNodes.bind(this);
        this.setNode = this.setNode.bind(this);
        this.hidePages = this.hidePages.bind(this);
        this.hidePagesInMenu = this.hidePagesInMenu.bind(this);
    }

    fetchNodeTypes() {
        fetch('/neos/schema/node-type', {method: 'GET'})
            .then(response => response.text())
            .then(result => {
                this.setState({nodeTypes: result})
                this.addLines();
            })
            .catch(error => console.log('error', error));
    }

    createNodes() {
        this.setState({creating: true});
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const nodes = this.state.nodes;
        if(nodes) {
            for(let i in nodes) {
                nodes[i].hidePages = this.state.hidePages;
                nodes[i].hidePagesInMenu = this.state.hidePagesInMenu;
            }

            const raw = JSON.stringify(nodes);

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            };

            fetch('/multiplenodecreation/create', requestOptions)
                .then(response => response.text())
                .then(result => {
                    this.props.toggleDialog();
                    location.reload();
                })
                .catch(error => console.log('error', error));
        }
    }

    setNode(item) {
        const id = item.id;
        const title = item.title;
        const nodeType = item.nodeType;
        const nodes = this.state.nodes;
        nodes[id] = {
            title: title,
            nodeType: nodeType,
            siteNode: this.props.siteNodeSelector.identifier,
            focusedNode: this.props.focusedNodeIdentifier,
            hidePages: this.state.hidePages,
            hidePagesInMenu: this.state.hidePagesInMenu
        }
        this.setState({nodes: nodes});
    }

    addLines() {
        const minRows = this.props.minimumRows;
        let items = [];
        let count = parseInt(this.state.count);
        for (let i = 0; i < minRows; i++) {
            items.push(<MultipleSiteNodeCreationRow key={'row' + i} id={count} nodeTypes={this.state.nodeTypes} i18nRegistry={this.props.i18nRegistry} setNode={(p) => this.setNode(p)} />);
            count = count + 1;
        }
        this.setState({count: count});
        this.setState({ rows: [...this.state.rows, items]});
    }

    hidePages() {
        this.setState(prevState => ({
            hidePages: !prevState.hidePages
        }));
    }

    hidePagesInMenu() {
        this.setState(prevState => ({
            hidePagesInMenu: !prevState.hidePagesInMenu
        }));
    }

    componentDidMount() {
        this.fetchNodeTypes();
    }

    render() {

        return (
            <Dialog title={this.state.creating ? this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.progressHeader')) : this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.header'))} isOpen={true} onRequestClose={this.props.toggleDialog} actions={[
                <Fragment>
                    {!this.state.creating &&
                        <Fragment>
                            <Button type="button" className={styles.primaryButton} onClick={() => this.createNodes()} disabled={this.state.nodes.length === 0} >
                                {this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.create'))}
                            </Button>
                            <Button type="button" onClick={this.props.toggleDialog} >
                                {this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.cancel'))}
                            </Button>
                        </Fragment>
                    }
                </Fragment>
            ]}>
                {!this.state.creating &&
                    <div style={{padding: '16px'}}>
                        {this.state.rows}
                        <div style={{display: 'block', marginTop: '20px'}}>

                            <Button type="button" onClick={() => this.addLines()}>
                                {this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.addMoreLines'))}
                            </Button>

                            <div style={{display: 'block', marginTop: '20px'}} >
                                <div style={{display: 'inline-block'}}>
                                    <CheckBox id="hidePages" isChecked={!!this.state.hidePages} onClick={() => this.hidePages()} />
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <Label htmlFor="hidePages">
                                        {this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.hideNewPages'))}
                                    </Label>
                                </div>
                            </div>

                            <div style={{display: 'block', marginTop: '10px'}} >
                                <div style={{display: 'inline-block'}}>
                                    <CheckBox id="hidePagesInMenu" isChecked={!!this.state.hidePagesInMenu} onClick={() => this.hidePagesInMenu()} />
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <Label htmlFor="hidePagesInMenu">
                                        {this.props.i18nRegistry.translate(unescape('NeosRulez.Neos.MultipleNodeCreation:Main:content.hideNewPagesInMenu'))}
                                    </Label>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </Dialog>
        );
    }
}

export default MultipleSiteNodeCreationDialog;
