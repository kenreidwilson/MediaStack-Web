import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import './css/style.css';
import IndexPage from './pages/IndexPage/IndexPage';
import MediaPage from './pages/MediaPage/MediaPage';
import AlbumMediaPage from './pages/AlbumMediaPage/AlbumMediaPage';
import SearchPage from './pages/SearchPage/SearchPage';
import Error404Page from './pages/404Page/404Page';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={IndexPage} exact/>
                <Route path="/media" component={MediaPage} exact/>
                <Route path="/album" component={AlbumMediaPage} exact/>
                <Route path="/search" component={SearchPage} exact/>
                <Route component={Error404Page}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
