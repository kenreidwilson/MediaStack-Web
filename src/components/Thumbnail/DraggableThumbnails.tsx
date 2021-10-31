import Media from '../../types/Media';
import Reorder, { reorder } from 'react-reorder';
import Thumbnail from './Thumbnail';

type Props = {
    mediaList: Media[],
    onReorder: Function,
    style?: React.CSSProperties
}

export default function DraggableThumbnails({ mediaList, onReorder, style }: Props) {

    const _onReorder = (event: any, previousIndex: number, nextIndex: number, fromId: number, toId: number) => {
        onReorder(reorder(mediaList, previousIndex, nextIndex));
    }    

    return ( 
        <Reorder style={style} reorderId='thumbnails' onReorder={_onReorder}>
        {mediaList.map(media => 
            <div key={media.id}>
                <Thumbnail style={{ margin: '2px' }} media={media}/>
            </div>)}
        </Reorder>
    );
}
