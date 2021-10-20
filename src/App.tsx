import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import MediaPage from './pages/MediaPage';
import AlbumMediaPage from './pages/AlbumMediaPage';
import ThumbnailPage from './pages/ThumbnailPage';
import TagsPage from './pages/TagsPage';
import ExplorePage from './pages/ExplorePage';
import Error404Page from './pages/404Page';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { DependencyContext } from './contexts/DependencyContext';
import MockTagRepository from './testing/MockRepositories/MockTagRepository';

export default function App() {

	return ( 
		<DependencyContext.Provider value={{ tagsRepository: new MockTagRepository() }}>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={IndexPage} exact/>
					<Route path="/media" component={MediaPage} exact/>
					<Route path="/album" component={AlbumMediaPage} exact/>
					<Route path="/search" component={ThumbnailPage} exact/>
					<Route path="/tags" component={TagsPage} exact/>
					<Route path="/explore" component={ExplorePage} exact/>
					<Route component={Error404Page}/>
				</Switch>
			</BrowserRouter>
		</DependencyContext.Provider>
	);
}
