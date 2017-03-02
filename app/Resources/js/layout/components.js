import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper'
import { toggleDrawer } from './actions'
import { Podcasts } from '../podcasts/index'
import { AddPodcast } from '../addPodcast/index'

const Menu = () => (
    <div>
        <AddPodcast />
        <Podcasts />
    </div>
)

const Layout = ({title, openDrawer, toggleDrawer, children}) => (
    <MuiThemeProvider>
        <Paper zDepth={0}>
            <AppBar title={title}
                    onLeftIconButtonTouchTap={toggleDrawer}
            />
            <Drawer children={<Menu />}
                    docked={false}
                    open={openDrawer}
                    onRequestChange={toggleDrawer}
            />
            {children}
        </Paper>
    </MuiThemeProvider>
)

export default connect(
    state => ({
    	title: state.layout.title,
		openDrawer: state.layout.openDrawer
	}),
	{ toggleDrawer }
)(Layout)