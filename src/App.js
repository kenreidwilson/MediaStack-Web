import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import './css/style.css';
import IndexPage from './pages/IndexPage';
import MediaPage from './pages/MediaPage';
import SearchPage from './pages/SearchPage';
import Error404Page from './pages/Error404Page';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={IndexPage} exact/>
                <Route path="/media" component={MediaPage} exact/>
                <Route path="/search" component={SearchPage} exact/>
                <Route component={Error404Page}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
