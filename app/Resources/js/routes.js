import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { Podcasts } from './podcasts/index'
import { store, history } from './store'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

const routes = () => (
	<Provider store={store}>
		<MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
			<Paper zDepth={0} style={{height: '100%', width: '100%' }}>
				<AppBar />
				<Router history={history}>
					<Route path="/" component={Podcasts} />
				</Router>
			</Paper>
		</MuiThemeProvider>
	</Provider>
)

export default routes