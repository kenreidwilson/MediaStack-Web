import React from 'react';
import Media from '../../model/Media';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail';
import Reorder, { reorder } from 'react-reorder';

type Props = {
    mediaList: Media[],
    onReorder: Function
}

export default function DraggableMediaThumbnails({ mediaList, onReorder }: Props) {

    const _onReorder = (event: any, previousIndex: number, nextIndex: number, fromId: number, toId: number) => {
        onReorder(reorder(mediaList, previousIndex, nextIndex));
    }    

    return ( 
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '90%', margin: 'auto'}}>
            <Reorder
                reorderId="thumbnails"
                onReorder={_onReorder}
            >
                {mediaList.map(media => 
                    <div style={{display: 'inline-block', margin: '2px'}}>
                        <MediaThumbnail key={media.id} media={media}/>
                    </div>
                )}
            </Reorder>
        </div>
    );
}
