import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import IndexPage from './pages/IndexPage/IndexPage';
import MediaPage from './pages/MediaPage/MediaPage';
import AlbumMediaPage from './pages/AlbumMediaPage/AlbumMediaPage';
import ThumbnailPage from './pages/ThumbnailPage/ThumbnailPage';
import TagsPage from './pages/TagsPage/TagsPage';
import Error404Page from './pages/404Page/404Page';
import MediaSearchQuery from './api/requests/RequestBodies/MediaSearchQuery';
import { MediaContext } from './MediaContext';

export default function App() {
	
	const getQuery = (): MediaSearchQuery => {
		let queryString = sessionStorage.getItem('query');
		if (queryString === null) {
			let query = new MediaSearchQuery();
			setQuery(query);
			return query;
		}
		return JSON.parse(queryString as string);
	}

	const setQuery = (query: MediaSearchQuery): void => {
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
						<Route component={Error404Page}/>
					</Switch>
				</MediaContext.Provider>
			</div> 
		</BrowserRouter>
	);
}
