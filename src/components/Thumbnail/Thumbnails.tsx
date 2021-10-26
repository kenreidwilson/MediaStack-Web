import Media from '../../types/Media';
import Thumbnail from './Thumbnail';

type Props = {
    mediaList: Media[]
    distinguishAlbumMedia?: boolean,
    onClick?: (event: React.MouseEvent, media: Media) => void
}

export default function Thumbnails({ mediaList, distinguishAlbumMedia = false, onClick = () => {} }: Props) {
    return ( 
        <>
          {mediaList && mediaList.map(media => 
                <div key={media.id}>
                    {distinguishAlbumMedia && media.albumID !== undefined && 
                        <span 
                            style={{ margin: '130px 0px 0px 185px', position: 'absolute' }} 
                            className='badge badge-primary'>Album</span>}
                    <Thumbnail 
                            onClick={onClick}
                            media={media}
                            style={{ margin: '2px' }}/>
                </div>
            )}  
        </>
    );
}
