import Media from '../types/Media';
import Reorder, { reorder } from 'react-reorder';
import MediaThumbnail from './MediaThumbnail';

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
                    <div key={media.id}>
                        <MediaThumbnail media={media}/>
                    </div>
                )}
            </Reorder>
        </div>
    );
}
