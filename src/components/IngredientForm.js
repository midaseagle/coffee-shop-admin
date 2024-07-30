import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIngredient, editIngredient } from '../features/ingredients/ingredientSlice';

const IngredientForm = ({ ingredientToEdit, onEditComplete }) => {
    const [name, setName] = useState(ingredientToEdit ? ingredientToEdit.name : '');
    const [price, setPrice] = useState(ingredientToEdit ? ingredientToEdit.price : '');
    const [description, setDescription] = useState(ingredientToEdit ? ingredientToEdit.description : '');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (ingredientToEdit) {
            dispatch(editIngredient({ id: ingredientToEdit.id, ingredient: { name, price: parseFloat(price), description } }));
            onEditComplete();
        } else {
            dispatch(addIngredient({ name, price: parseFloat(price), description }));
        }
        setName('');
        setPrice('');
        setDescription('');
    };

    return (
        <div className="form-group">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                </div>
                <button type="submit">{ingredientToEdit ? 'Edit' : 'Add'} Ingredient</button>
            </form>
        </div>
    );
};

export default IngredientForm;
