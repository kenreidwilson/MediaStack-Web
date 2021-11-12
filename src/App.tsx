import { DependencyContext } from './contexts/DependencyContext';
import useDependencies from './hooks/useDependencies';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import MediaPage from './pages/MediaPage';
import AlbumPage from './pages/AlbumPage';
import ThumbnailPage from './pages/ThumbnailPage';
import AttributesPage from './pages/AttributesPage';
import Error404Page from './pages/404Page';

import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/style.css';

export default function App() {

	const depedencies = useDependencies();

	return ( 
		<DependencyContext.Provider value={depedencies}>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={IndexPage} exact/>
					<Route path="/media" component={MediaPage} exact/>
					<Route path="/album" component={AlbumPage} exact/>
					<Route path="/search" component={ThumbnailPage} exact/>
					<Route path="/attributes" component={AttributesPage} exact/>
					<Route component={Error404Page}/>
				</Switch>
			</BrowserRouter>
		</DependencyContext.Provider>
	);
}
