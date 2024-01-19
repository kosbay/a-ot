import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from './slices/orders';

const reducer = {
  orders: tutorialReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
