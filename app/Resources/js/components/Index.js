import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';

const Index = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
);

export default Index;