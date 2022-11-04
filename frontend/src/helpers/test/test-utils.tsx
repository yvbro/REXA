import React, { ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AnyAction, Store } from 'redux';
import { RootState } from '../../store/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export function makeTestStore(initialState = {}) {
    const store = mockStore(initialState);
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);
    const origGetState = store.getState;
    store.getState = jest.fn(origGetState);
    return store;
}

export function renderWithStore(ui: ReactNode, initialState = {}) {
    const store = makeTestStore(initialState);
    return rtlRender(<Provider store={store}>{ui}</Provider>);
}

const render = (ui: ReactNode, store: Store<any, AnyAction>) => {
    return rtlRender(<Provider store={store}>{ui}</Provider>);
};

// re-export everything
export * from '@testing-library/react';
// Keep our render instead
export { render };
