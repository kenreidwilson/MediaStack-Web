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
import { MediaContext } from './MediaContext';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import { IMediaSearchQuery } from './repositories/MediaRepository';

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
