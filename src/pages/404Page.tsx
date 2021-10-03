import React from 'react';
import Navigation from '../components/Navigation';

const Error404Page = () => (
   <React.Fragment>
      <Navigation/>
         <div>
            <p>Error: Page does not exist!</p>
         </div>
   </React.Fragment>
)

export default Error404Page;