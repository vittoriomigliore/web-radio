import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
import { store, persistor } from './config/store';

EStyleSheet.build({
    $primaryBlue: '#4F6D7A',
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#9E768F',


    $lightBlack: 'rgb(40, 40, 40)',
    $black: 'rgb(24, 24, 24)',
    $grey: 'rgb(170, 170, 170)',
    $sand: 'rgb(200, 200, 200)',

    $white: '#FFFFFF',
    $lightGray: '#F0F0F0',
    $border: '#E2E2E2',
    $inputText: '#797979',
    $darkText: '#343434',
});

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AlertProvider>
                <Navigator onNavigationStateChange={null} />
            </AlertProvider>
        </PersistGate>
    </Provider>
);