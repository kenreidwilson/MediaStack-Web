import React, { Component } from 'react';

class MediaInfoSidebar extends Component {
    state = {
        media : this.props.mediaData
    }
    
    render() { 
        return (
            <div id="media_info">
                <p>Type: <a href={`/search?query=type:${this.state.media.type}`}>{this.state.media.type}</a></p>
                <p>Category: <a href={`/search?query=category:${this.state.media.category}`}>{this.state.media.category}</a></p>
                <p>Artist: <a href={`/search?query=artist:${this.state.media.artist}`}>{this.state.media.artist}</a></p>
                <p>Album: <a href={`/search?query=album:${this.state.media.album}`}>{this.state.media.album}</a></p>
                <p>Source: <a href={this.state.media.source}>{this.state.media.source}</a></p>
                <p>Rating: <a href={`/search?query=rating:${this.state.media.score}`}>{this.state.media.score}</a></p>
                <p>Tags:</p>
                <ul>
                    {this.state.media.tags.map(tag => <li key={tag}><a href={`/search?query=${tag}`}>{tag}</a></li>)}
                </ul>
            </div>
         );
    }
}
 
export default MediaInfoSidebar;
