import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

export const App = ({children}) => (
    <MuiThemeProvider>
        <Paper zDepth={0} >
            <AppBar title="Podcasts"/>
            {children}
        </Paper>
    </MuiThemeProvider>
)