import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Nav';
import Media from '../../components/Media/Media';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar'
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import MediaInfoEditModal from '../../components/MediaInfoEditModal/MediaInfoEditModal'

import { MediaInfoRequest, MediaChangeInfoRequest } from '../../api/requests/MediaRequests'

import './MediaPage.css'

const MediaPage = () => {
    return <MediaPageComponent />;
}

export default class MediaPageComponent extends Component {
    state = {
        mediaInfo : null,
        showEditModal : false,
        alerts : []
    }

    componentDidMount = () => {
        new MediaInfoRequest(new URL(window.location.href).searchParams.get("id")).send().then(response => {
            this.setState({ mediaInfo : response });
        }).catch(error => { 
            this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
        });
    }

    addAlert = (alert) => {
        let alerts = this.state.alerts.concat(alert);
        this.setState({ alerts })
    }

    handleScoreEdit = async (newScore) => {
        if (this.state.mediaInfo.score !== newScore) {
            await new MediaChangeInfoRequest(this.state.mediaInfo.id, {'score' : newScore }).send().then(response => {
                this.setState({ mediaInfo : response })
            }).catch(error => {
                this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
            })
        }
    }

    handleOpenModal = () => {
        this.setState({ showEditModal : true });
    }

    handleModalSave = async (newMediaInfo) => {
        if (Object.keys(newMediaInfo).length > 0) {
            console.log(newMediaInfo);
            await new MediaChangeInfoRequest(this.state.mediaInfo.id, newMediaInfo).send().then(response => {
                this.setState({mediaInfo : response})
            }).catch(error => {
                this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
            })
        }
        this.setState({ showEditModal : false});
    }

    handleModalClose = () => {
        this.setState({ showEditModal : false});
    }

    onSidebarNavClick = (searchQuery) => {
        this.props.history.push('/search', { searchQuery : searchQuery });
    }

    render() {
        return ( 
            <React.Fragment>
                {this.state.showEditModal ? 
                    <MediaInfoEditModal 
                        isShown={this.state.showEditModal} 
                        handleClose={this.handleModalClose}
                        handleSave={this.handleModalSave}
                        media={this.state.mediaInfo}/> 
                    : null}
                <Navigation />
                {this.state.alerts.map(errorComponent => errorComponent)}
                <div id="mediapage">
                    <div id="mediapage-sidebar">
                        {this.state.mediaInfo !== null ? 
                            <MediaInfoSidebar
                                onSidebarNavClick={this.onSidebarNavClick}
                                handleEdit={this.handleOpenModal}
                                handleScoreEdit={this.handleScoreEdit}
                                media={this.state.mediaInfo}/> 
                            : null}
                    </div>
                    <div id="mediapage-content">
                        {this.state.mediaInfo !== null ? <Media media={this.state.mediaInfo}/> : null}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
