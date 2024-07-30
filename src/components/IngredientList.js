import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients, deleteIngredient } from '../features/ingredients/ingredientSlice';
import IngredientForm from './IngredientForm';

const IngredientList = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const [editingIngredient, setEditingIngredient] = useState(null);

    React.useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteIngredient(id));
    };

    const handleEdit = (ingredient) => {
        setEditingIngredient(ingredient);
    };

    const handleEditComplete = () => {
        setEditingIngredient(null);
    };

    return (
        <div className="container">
            <h2>Ingredients</h2>
            <IngredientForm ingredientToEdit={editingIngredient} onEditComplete={handleEditComplete} />
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} - ${ingredient.price} - {ingredient.description}
                        <div>
                            <button className="edit-button" onClick={() => handleEdit(ingredient)}>Edit</button>
                            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientList;
