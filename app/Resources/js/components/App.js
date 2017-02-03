import React from 'react'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

const App = () => (
    <Paper zDepth={1} >
        <AppBar
            title="Podcasts"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
    </Paper>
)

export default App
