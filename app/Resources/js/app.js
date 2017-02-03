// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import Index from './components/Index';

const render = (Component) => {
    ReactDOM.render(
    <AppContainer>
    <Component/>
    </AppContainer>,
        document.getElementById('root')
    );
};

render(Index);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(Index)
    });
}