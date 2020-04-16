import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const configureStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
