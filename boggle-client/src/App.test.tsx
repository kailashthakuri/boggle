import * as React from "react";
import {render} from '@testing-library/react';
import App from './App';
import createAppStore from "./store/AppStore";
import {Provider} from "react-redux";

test('renders learn react link', () => {
    const store = createAppStore();
    render(
        <Provider store={store}><App/></Provider>
    );
});
