import React from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

export const App = ({children}) => (
    <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper zDepth={0} >
            <AppBar title="Podcasts"/>
            {children}
        </Paper>
    </MuiThemeProvider>
)