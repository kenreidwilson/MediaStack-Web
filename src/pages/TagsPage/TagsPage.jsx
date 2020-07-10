import React, { Component } from 'react';

import { TagsRequest } from '../../api/requests/TagRequests';
import TagsTable from '../../components/TagsTable/TagsTable';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Navigation from '../../components/Navigation/Nav';

export default class TagsPage extends Component {
    state = { 
        alerts : [],
        tags: null
    }

    componentWillMount = () => {
        this.fetchTags();
    }

    fetchTags = () => {
        if (this.state.tags !== null) {
            return;
        }
        new TagsRequest().send().then(tags => {
            this.setState({ tags })
        }).catch(error => {
            this.addAlert(<BannerAlert variant="danger" heading="API Error:" body={error.message}/>)
        })
    }

    addAlert = (alert) => {
        let alerts = this.state.alerts.concat(alert);
        this.setState({ alerts })
    }

    onDeleteTag = (deletedTag) => {
        let newTags = this.state.tags.filter((tag) => {return tag.id !== deletedTag.id});
        this.setState({ tags : newTags });
    }

    onEditTag = (edittedTag) => {
        // I don't know why this works but I'm going to leave it for reference.
        this.state.tags.map(tag => {
            if (tag.id === edittedTag.id) {
                tag.name = edittedTag.name;
            }
        })
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                {this.state.alerts.map(errorComponent => errorComponent)}
                <TagsTable 
                    tags={this.state.tags}
                    onDeleteTag={this.onDeleteTag}
                    onEditTag={this.onEditTag}
                />
            </React.Fragment>
         );
    }
}
