import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import Navigation from '../../components/Navigation/Nav';
import MediaContainer from '../../components/Media/MediaContainer';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import AlbumInfoSidebar from '../../components/MediaInfoSidebar/AlbumInfoSidebar';
import SelectableThumbnails from '../../components/SelectableThumbnails/SelectableThumbnails';
import SelectableThumbnailSlider from '../../components/SelectableThumbnailSlider/SelectableThumbnailSlider';
import AlbumInfoEditModal from '../../components/AlbumInfoEditModal/AlbumInfoEditModal';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Album from '../../model/Album';
import Media from '../../model/Media';

import { AlbumInfoRequest, AlbumInfoChangeRequest } from '../../api/requests/AlbumRequests'
import { MediaInfoChangeRequest } from '../../api/requests/MediaRequests'
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

export default function AlbumMediaPage() {
    const [albumInfo, setAlbumInfo] = useState<Album>();
    const [mediaNumber, setMediaNumber] = useState<number>(0);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [showEditModal, setShowEditModel] = useState<boolean>(false);
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        let albumIDString = new URL(window.location.href).searchParams.get("id") as string;
        let albumID = +albumIDString;
        new AlbumInfoRequest(albumID).send().then(response => {
            setAlbumInfo(response);
        }).catch(error => { 
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
        // TODO: Get media list.
    }, []);

    const onSidebarNavClick = (searchQuery: MediaSearchQuery) => {
        console.log(searchQuery);
    }

    const handleEditMediaScore = async (score: number) => {
        let newScore = score === mediaList[mediaNumber].score ? 0 : score;
        await new MediaInfoChangeRequest(mediaList[mediaNumber].id, {'score' : newScore }).send().then((response: Media) => {
            mediaList[mediaNumber] = response;
            setMediaList(mediaList);
        }).catch(error => {
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        })
    }

    const getAlbumScore = () => {
        let score = 0;
        mediaList.forEach(media => {
            score += media.score;
        });
        return score === 0 ? 0 : score / mediaList.length;
    }

    const handleEditAlbumScore = async (score: number) => {
        let newScore = score === getAlbumScore() ? 0 : score;
        let album = albumInfo as Album;
        await new AlbumInfoChangeRequest(album.id, {'score' : newScore}).send().then(response => {
            setAlbumInfo(response);
        }).catch(error => {
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        })
    }

    /*
    handleModalSave = async (newInfo: Album) => {
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
    */
    
    const handleThumbnailClick = (index: number) => {
        if (mediaNumber === index) {
            return;
        }
        setMediaNumber(index);
        setIsMediaLoading(true);
    }

    const handleMediaClick = (event: any) => {
        if (event.originalEvent.x - event.target.offsetLeft >= event.target.width / 2) {
            setMediaNumber(mediaNumber === mediaList.length - 1 ? 0 : mediaNumber + 1);
        } else {
            setMediaNumber(mediaNumber === 0 ? mediaList.length - 1 : mediaNumber - 1);
        }
        setIsMediaLoading(true);
    }

    return ( 
        <React.Fragment>
            {showEditModal ? 
                <AlbumInfoEditModal 
                    isShown={showEditModal} 
                    onClose={() => setShowEditModel(false)}
                    onSave={(album: Album) => console.log("SAVE NOT IMPLEMENTED.")}
                    mediaList={mediaList}
                    album={albumInfo as Album}
                /> 
                : null}
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <div id="mediapage">
                <div id="mediapage-sidebar">
                    {typeof albumInfo !== 'undefined' && mediaNumber !== null ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowEditModel(true)}>Edit</button>
                            <MediaInfoSidebar 
                                onSidebarNavClick={onSidebarNavClick}
                                handleEdit={() => setShowEditModel(true)}
                                handleScoreEdit={handleEditMediaScore}
                                media={mediaList[mediaNumber]}
                            />
                            <AlbumInfoSidebar
                                onSidebarNavClick={onSidebarNavClick}
                                handleEdit={() => setShowEditModel(true)}
                                handleScoreEdit={handleEditAlbumScore}
                                album={albumInfo}
                                // TODO: Implement
                                mediaList={[]}
                            />
                        </div> : null}
                </div>
                <div id="mediapage-content">
                    {typeof albumInfo !== 'undefined' && mediaNumber !== null ? 
                        <div>
                            {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                            <MediaContainer 
                                onLoad={() => setIsMediaLoading(false)}
                                onClick={handleMediaClick}
                                media={mediaList[mediaNumber]}
                            />
                        </div>
                    : null}
                    {typeof albumInfo !== 'undefined' ? 
                        (global.matchMedia(`(min-width: 768px)`).matches ?
                            <SelectableThumbnailSlider 
                                mediaNumber={mediaNumber}
                                onThumbnailClick={handleThumbnailClick} 
                                mediaList={mediaList}/>
                            : <div id="thumbnails">
                                    <SelectableThumbnails
                                        mediaNumber={mediaNumber}
                                        onThumbnailClick={handleThumbnailClick} 
                                        mediaList={mediaList}/>
                            </div>
                        ) 
                        : null}
                </div>
            </div>
        </React.Fragment>
     );
}
