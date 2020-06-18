import React, { Component } from 'react';
import { MediaChangeSourceRequest, MediaChangeScoreRequest, MediaAddTagRequest, MediaDeleteTagRequest } from '../../api/requests/MediaRequests'
import API from '../../api/API';
import StarRatingComponent from 'react-star-rating-component';
import $ from 'jquery'

import './MediaInfoSidebar.css'

class MediaInfoSidebar extends Component {
    
    handleSourceEdit = (newSource) => {
        API.put(new MediaChangeSourceRequest(
            { 
                hash : this.props.media.hash, 
                source : newSource
            })
        ).then(response => this.props.onMediaInfoChange(response))
    }

    handleScoreEdit = (newScore) => {
        API.put(new MediaChangeScoreRequest(
            {
                hash : this.props.media.hash,
                score : newScore
            }
        )).then(response => this.props.onMediaInfoChange(response))
    }

    handleTagDelete = (tag) => {
        API.delete(new MediaDeleteTagRequest(
            {
                hash : this.props.media.hash,
                tag : tag
            }
        )).then(response => this.props.onMediaInfoChange(response))
    }

    handleTagAdd = (tag) => {
        API.post(new MediaAddTagRequest(
            {
                hash : this.props.media.hash,
                tag : tag
            }
        )).then(response => this.props.onMediaInfoChange(response))
    }

    render() { 
        return (
            <div id="media_info">
                <InfoSideBarElement 
                    label={"Type: "} 
                    value={this.props.media.type}
                    link={`/search?query=type:${this.props.media.type}`}/>
                
                <InfoSideBarElement 
                    label={"Category: "} 
                    value={this.props.media.category}
                    link={`/search?query=category:${this.props.media.category}`}/>

                <InfoSideBarElement 
                    label={"Artist: "} 
                    value={this.props.media.artist}
                    link={`/search?query=artist:${this.props.media.artist}`}/>

                <InfoSideBarElement 
                    label={"Album: "} 
                    value={this.props.media.album}
                    link={`/search?query=album:${this.props.media.album}`}/>

                <InfoSideBarElement 
                    label={"Source: "} 
                    value={this.props.media.source}
                    link={this.props.media.source}
                    handleEdit={this.handleSourceEdit}/>
                
                <RatingSidebarElement 
                    rating={this.props.media.score}
                    handleEdit={this.handleScoreEdit}/>

                <TagsSidebarElement
                    tags={this.props.media.tags}
                    handleTagAdd={this.handleTagAdd}
                    handleTagDelete={this.handleTagDelete}/>
            </div>
         );
    }
}

class InfoSideBarElement extends Component {
    state = {
        isEditMode : false,
        newValue : this.props.value
    }

    componentDidMount = () => {
        $(document.body).on('keydown', this.handleEditCancel)
    }

    handleEnableEditMode = (event) => {
        event.preventDefault();
        this.setState({ isEditMode : true })
    }

    handleEditCancel = (event) => {
        if (event.keyCode === 27) {
            this.setState({ isEditMode : false, newValue : this.props.value })
        }
    }

    handleOnChange = (event) => {
        this.setState({ newValue : event.target.value })
    }

    handleEdit = (event) => {
        event.preventDefault();
        if (this.props.value !== this.state.newValue) {
            this.setState({ isEditMode : false })
        }
        this.props.handleEdit(this.state.newValue).then(response => {
            this.setState({ isEditMode : false })
        }).catch(error => console.log(error))
    }

    render() { 
        if (this.state.isEditMode) {
            return (
                <form onSubmit={this.handleEdit}>
                    <label>{this.props.label}</label>
                    <input 
                        type="text" 
                        onChange={this.handleOnChange} 
                        value={this.state.newValue === null ? "" : this.state.newValue}>
                    </input>
                </form>
            );
        } else {
            return (
                <p>{this.props.label}
                    {
                        this.props.value === null ? 
                            "None" : 
                            typeof this.props.link === 'undefined' ? 
                                this.props.value :
                                <a href={this.props.link}>{this.props.value}</a>
                    }
                    {
                        typeof this.props.handleEdit !== 'undefined' ? 
                            <a href="#" onClick={this.handleEnableEditMode}> &#xf044;</a> : 
                            null
                    }
                </p>
            );
        }
    }
}

class RatingSidebarElement extends Component {

    onStarClick(nextValue) {
        let newValue = nextValue !== this.props.rating ? nextValue : 0;
        this.props.handleEdit(newValue)
    }

    render() { 
        return (
            <React.Fragment>
                <p>Rating: </p>
                <StarRatingComponent 
                    name="mediaScore" 
                    starCount={5}
                    value={this.props.rating}
                    onStarClick={this.onStarClick.bind(this)}
                    />
            </React.Fragment>
         );
    }
}

class TagsSidebarElement extends Component {
    
    handleTagAdd = () => {
        let userInput = prompt("Enter tag name.");
        if (userInput === null || userInput === "") {
            return;
        }
        this.props.handleTagAdd(userInput);
    }

    render() { 
        return ( 
            <React.Fragment>
                <p>Tags: <a href="#" onClick={() => this.handleTagAdd("asdf")}>+</a></p>
                <ul>
                    {this.props.tags.map(tag => <TagSidebarElementElement tag={tag} onTagDelete={() => this.props.handleTagDelete(tag)} key={tag}/>)}
                </ul>
            </React.Fragment> 
        );
    }
}

class TagSidebarElementElement extends Component {
    render() {
        return (
            <li>
                <a href={`/search?query=${this.props.tag}`}>{this.props.tag}</a><a onClick={() => this.props.onTagDelete(this.props.tag)} href="#"> x</a>
            </li>
        )
    }
}

export default MediaInfoSidebar;
