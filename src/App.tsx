import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { MediaContext } from './MediaContext';
import { IMediaSearchQuery } from './repositories/MediaRepository';
import IndexPage from './pages/IndexPage';
import MediaPage from './pages/MediaPage';
import AlbumMediaPage from './pages/AlbumMediaPage';
import ThumbnailPage from './pages/ThumbnailPage';
import TagsPage from './pages/TagsPage';
import ExplorePage from './pages/ExplorePage';
import Error404Page from './pages/404Page';

export default function App() {
	
	const getQuery = (): IMediaSearchQuery => {
		let queryString = sessionStorage.getItem('query');
		if (queryString === null) {
			let query = {};
			setQuery(query);
			return query;
		}
		return JSON.parse(queryString as string);
	}

	const setQuery = (query: IMediaSearchQuery): void => {
		sessionStorage.setItem('query', JSON.stringify(query));
	}

	return ( 
		<BrowserRouter>
			<div>
				<MediaContext.Provider value={{ getQuery, setQuery }}>
					<Switch>
						<Route path="/" component={IndexPage} exact/>
						<Route path="/media" component={MediaPage} exact/>
						<Route path="/album" component={AlbumMediaPage} exact/>
						<Route path="/search" component={ThumbnailPage} exact/>
						<Route path="/tags" component={TagsPage} exact/>
						<Route path="/explore" component={ExplorePage} exact/>
						<Route component={Error404Page}/>
					</Switch>
				</MediaContext.Provider>
			</div> 
		</BrowserRouter>
	);
}
