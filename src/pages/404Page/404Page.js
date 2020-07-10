import React, { Component } from 'react';
 
import Navigation from '../../components/Navigation/Nav';

export default class Error404Page extends Component {
   render() {
      return (
         <React.Fragment>
            <Navigation/>
            <div>
               <p>Error: Page does not exist!</p>
            </div>
         </React.Fragment>
      );
   }
}
