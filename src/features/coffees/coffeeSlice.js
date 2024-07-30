import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://crudapi.co.uk/api/v1';

export const fetchCoffees = createAsyncThunk('coffees/fetchCoffees', async () => {
    const response = await axios.get(`${BASE_URL}/coffees`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return response.data;
});

export const addCoffee = createAsyncThunk('coffees/addCoffee', async (coffee) => {
    const response = await axios.post(`${BASE_URL}/coffees`, coffee, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return response.data;
});

export const editCoffee = createAsyncThunk('coffees/editCoffee', async ({ id, coffee }) => {
    const response = await axios.put(`${BASE_URL}/coffees/${id}`, coffee, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return response.data;
});

export const deleteCoffee = createAsyncThunk('coffees/deleteCoffee', async (id) => {
    await axios.delete(`${BASE_URL}/coffees/${id}`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    return id;
});

const coffeeSlice = createSlice({
    name: 'coffees',
    initialState: {
        coffees: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoffees.fulfilled, (state, action) => {
                state.coffees = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addCoffee.fulfilled, (state, action) => {
                state.coffees.push(action.payload);
            })
            .addCase(editCoffee.fulfilled, (state, action) => {
                const index = state.coffees.findIndex(coffee => coffee.id === action.payload.id);
                state.coffees[index] = action.payload;
            })
            .addCase(deleteCoffee.fulfilled, (state, action) => {
                state.coffees = state.coffees.filter(coffee => coffee.id !== action.payload);
            });
    }
});

export default coffeeSlice.reducer;
