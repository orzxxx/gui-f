import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function render() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

render();
registerServiceWorker();

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./App', () => {
        render(require('./App').default);
    })
}
