import { configureStore } from '@reduxjs/toolkit';
import coffeeReducer from './features/coffees/coffeeSlice';
import ingredientReducer from './features/ingredients/ingredientSlice';

const store = configureStore({
    reducer: {
        coffees: coffeeReducer,
        ingredients: ingredientReducer,
    },
});

export default store;
