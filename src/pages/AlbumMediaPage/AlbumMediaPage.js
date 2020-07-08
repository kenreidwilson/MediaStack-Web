import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'

import Navigation from '../../components/Navigation/Nav';
import Media from '../../components/Media/Media';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import AlbumInfoSidebar from '../../components/MediaInfoSidebar/AlbumInfoSidebar';
import SelectableThumbnails from '../../components/SelectableThumbnails/SelectableThumbnails';
import SelectableThumbnailSlider from '../../components/SelectableThumbnailSlider/SelectableThumbnailSlider'
import AlbumInfoEditModal from '../../components/AlbumInfoEditModal/AlbumInfoEditModal'
import BannerAlert from '../../components/BannerAlert/BannerAlert';

import { AlbumInfoRequest, AlbumInfoChangeRequest } from '../../api/requests/AlbumRequests'
import { MediaInfoChangeRequest } from '../../api/requests/MediaRequests'

const AlbumMediaPage = () => {
    return (
        <AlbumMediaPageComponent />
    );
}

export default class AlbumMediaPageComponent extends Component {
    state = { 
        albumInfo : this.props.album,
        mediaNumber : new URL(window.location.href).searchParams.get("page"),
        showEditModal : false,
        isImageLoading : true,
        alerts : []
    }

    componentDidMount = () => {
        if (this.state.mediaNumber === null) {
            this.setState({ mediaNumber : 0 })
        }
        if (typeof this.state.albumInfo !== 'undefined') {
            return;
        }
        new AlbumInfoRequest(new URL(window.location.href).searchParams.get("id") ).send().then(response => {
            this.setState({ albumInfo : response });
        }).catch(error => { 
            this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
        });
    }

    onImageLoad = () => {
        this.setState({ isImageLoading : false })
    }

    onSidebarNavClick = (searchQuery) => {
        this.props.history.push('/search', { searchQuery : searchQuery });
    }
    
    getCurrentMediaInfo = () => {
        return this.state.albumInfo.media[this.state.mediaNumber];
    }

    addAlert = (alert) => {
        let alerts = this.state.alerts.concat(alert);
        this.setState({ alerts })
    }

    handleEditMediaScore = async (newScore) => {
        if (this.state.albumInfo[this.state.mediaNumber] !== newScore) {
            await new MediaInfoChangeRequest(this.getCurrentMediaInfo().id, {'score' : newScore }).send().then(response => {
                let albumInfo = this.state.albumInfo
                albumInfo.media[this.state.mediaNumber] = response
                this.setState({ albumInfo })
            }).catch(error => {
                this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
            })
        }
    }

    getAlbumScore = () => {
        let score = 0;
        this.state.albumInfo.media.forEach(media => {
            score += media.score;
        })
        return score === 0 ? 0 : score / this.state.albumInfo.media.length;
    }

    handleEditAlbumScore = async (newScore) => {
        if (this.getAlbumScore() !== newScore) {
            await new AlbumInfoChangeRequest(this.state.albumInfo.id, {'score' : newScore}).send().then(response => {
                this.setState({ albumInfo : response })
            }).catch(error => {
                this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
            })
        }
    }

    handleOpenModal = () => {
        this.setState({ showEditModal : true });
    }

    handleModalSave = async (newInfo) => {
        let newMediaInfo = newInfo['media'];

        if (Object.keys(newMediaInfo).length > 0) {
            await new MediaInfoChangeRequest(this.getCurrentMediaInfo().id, newMediaInfo).send().then(response => {
                let albumInfo = this.state.albumInfo
                albumInfo.media[this.state.mediaNumber] = response
                this.setState({ albumInfo })
            }).catch(error => {
                this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
            })
        }

        let newAlbumInfo = newInfo['album'];

        if (Object.keys(newAlbumInfo).length > 0) {
            await new AlbumInfoChangeRequest(this.state.albumInfo.id, newAlbumInfo).send().then(response => {
                this.setState({ albumInfo : response });
            }).catch(error => {
                this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
            })
        }

        this.setState({ showEditModal : false});
    }

    handleModalClose = () => {
        this.setState({ showEditModal : false});
    }
    
    handleThumbnailClick = (index) => {
        this.setState({ mediaNumber : index, isImageLoading : true });
    }

    handleMediaClick = (event) => {
        if (event.originalEvent.x - event.target.offsetLeft >= event.target.width / 2) {
            this.handleNextMedia();
        } else {
            this.handlePreviousMedia();
        }
    }

    handleNextMedia = () => {
        if (this.state.mediaNumber === this.state.albumInfo.media.length - 1) {
            this.setState({ mediaNumber : 0 })
        } else {
            this.setState({ mediaNumber : (this.state.mediaNumber + 1) })
        }
        this.setState({ isImageLoading : true })
    }

    handlePreviousMedia = () => {
        if (this.state.mediaNumber === 0) {
            this.setState({ mediaNumber : this.state.albumInfo.media.length - 1})
        } else {
            this.setState({ mediaNumber : (this.state.mediaNumber - 1) })
        }
        this.setState({ isImageLoading : true })
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.showEditModal ? 
                    <AlbumInfoEditModal 
                        isShown={this.state.showEditModal} 
                        handleClose={this.handleModalClose}
                        handleSave={this.handleModalSave}
                        media={this.getCurrentMediaInfo()}
                        album={this.state.albumInfo}
                    /> 
                    : null}
                <Navigation />
                {this.state.alerts.map(errorComponent => errorComponent)}
                <div id="mediapage">
                    <div id="mediapage-sidebar">
                        {typeof this.state.albumInfo !== 'undefined' && this.state.mediaNumber !== null ? 
                            <div>
                                <button class="edit_button btn btn-primary" onClick={this.handleOpenModal}>Edit</button>
                                <MediaInfoSidebar 
                                    onSidebarNavClick={this.onSidebarNavClick}
                                    handleEdit={this.handleOpenModal}
                                    handleScoreEdit={this.handleEditMediaScore}
                                    media={this.getCurrentMediaInfo()}
                                />
                                <AlbumInfoSidebar
                                    onSidebarNavClick={this.onSidebarNavClick}
                                    handleEdit={this.handleOpenModal}
                                    handleScoreEdit={this.handleEditAlbumScore}
                                    album={this.state.albumInfo}
                                />
                            </div> : null}
                    </div>
                    <div id="mediapage-content">
                        {typeof this.state.albumInfo !== 'undefined' && this.state.mediaNumber !== null ? 
                            <div>
                                {this.state.isImageLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                                <Media 
                                    onImageLoad={this.onImageLoad}
                                    onImageClick={this.handleMediaClick}
                                    media={this.getCurrentMediaInfo()}
                                />
                            </div>
                        : null}
                        {typeof this.state.albumInfo !== 'undefined' ? 
                            (global.matchMedia(`(min-width: 768px)`).matches ?
                                <SelectableThumbnailSlider 
                                    mediaNumber={this.state.mediaNumber}
                                    onThumbnailClick={this.handleThumbnailClick} 
                                    mediaList={this.state.albumInfo.media}/>
                                : <div id="thumbnails">
                                        <SelectableThumbnails
                                            mediaNumber={this.state.mediaNumber}
                                            onThumbnailClick={this.handleThumbnailClick} 
                                            mediaList={this.state.albumInfo.media}/>
                                </div>
                            ) 
                            : null}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
