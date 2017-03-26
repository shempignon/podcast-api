import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { toggleDrawer, toggleSnackbar } from './actions'
import { Podcasts } from '../podcasts'
import { AddPodcast } from '../addPodcast'
import { Player } from '../player'
import { ExtraButton } from '../extraButton'
import { extraButtonAction } from '../extraButton/actions'

const LeftDrawer = () => (
    <div>
        <AddPodcast />
        <Podcasts />
    </div>
)

const Layout = ({title, toggleDrawer, openDrawer, openSnackbar, notification, toggleSnackbar, location, extraButtonAction, children }) => (
    <MuiThemeProvider>
        <Paper zDepth={0}>
            <AppBar title={title}
                    onLeftIconButtonTouchTap={toggleDrawer}
                    iconElementRight={<ExtraButton
                        location={location}
                        action={extraButtonAction} />}
            />
            <Drawer children={<LeftDrawer />}
                    docked={false}
                    open={openDrawer}
                    onRequestChange={toggleDrawer}
            />
            <Snackbar open={openSnackbar}
                      message={notification}
                      autoHideDuration={1500}
                      onRequestClose={toggleSnackbar}
            />
            {children}
            <Player />
        </Paper>
    </MuiThemeProvider>
)

export default connect(
    state => ({
    	title: state.layout.title,
    	notification: state.layout.notification,
		openSnackbar: state.layout.openSnackbar,
		openDrawer: state.layout.openDrawer,
	}),
	{ toggleDrawer, toggleSnackbar, extraButtonAction }
)(Layout)