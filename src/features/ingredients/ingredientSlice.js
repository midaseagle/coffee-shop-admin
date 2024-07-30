import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://crudapi.co.uk/api/v1';

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
    const response = await axios.get(`${BASE_URL}/ingredients`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return response.data;
});

export const addIngredient = createAsyncThunk('ingredients/addIngredient', async (ingredient) => {
    const response = await axios.post(`${BASE_URL}/ingredients`, ingredient, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return response.data;
});

export const editIngredient = createAsyncThunk('ingredients/editIngredient', async ({ id, ingredient }) => {
    const response = await axios.put(`${BASE_URL}/ingredients/${id}`, ingredient, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return response.data;
});

export const deleteIngredient = createAsyncThunk('ingredients/deleteIngredient', async (id) => {
    await axios.delete(`${BASE_URL}/ingredients/${id}`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return id;
});

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addIngredient.fulfilled, (state, action) => {
                state.ingredients.push(action.payload);
            })
            .addCase(editIngredient.fulfilled, (state, action) => {
                const index = state.ingredients.findIndex(ingredient => ingredient.id === action.payload.id);
                state.ingredients[index] = action.payload;
            })
            .addCase(deleteIngredient.fulfilled, (state, action) => {
                state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload);
            });
    }
});

export default ingredientSlice.reducer;
