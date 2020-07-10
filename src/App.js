import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import IndexPage from './pages/IndexPage/IndexPage';
import MediaPage from './pages/MediaPage/MediaPage';
import AlbumMediaPage from './pages/AlbumMediaPage/AlbumMediaPage';
import ThumbnailPage from './pages/ThumbnailPage/ThumbnailPage';
import TagsPage from './pages/TagsPage/TagsPage';
import Error404Page from './pages/404Page/404Page';
 
class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
            <Switch>
                <Route history={this.history} path="/" component={IndexPage} exact/>
                <Route path="/media" component={MediaPage} exact/>
                <Route path="/album" component={AlbumMediaPage} exact/>
                <Route path="/search" component={ThumbnailPage} exact/>
                <Route path="/tags" component={TagsPage} exact/>
                <Route component={Error404Page}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
