import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

class Layout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MuiThemeProvider>
                <Paper zDepth={0}>
                    <AppBar title={this.props.title} />
                    {this.props.children}
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default connect(
    state => ({title: state.layout.title })
)(Layout)