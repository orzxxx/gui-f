import React, { Component } from 'react';
import { Provider } from 'react-redux'

import DevTools from './containers/DevTools';
import configureStore from './store/configureStore'
import HomeContainer from './containers/HomeContainer';

const store = configureStore();

const styles = {
    container: {
        flex: 1
    }
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div style={styles.container}>
                    <HomeContainer />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

export default App;
