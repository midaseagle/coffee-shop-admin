import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoffee, editCoffee } from '../features/coffees/coffeeSlice';
import { fetchIngredients } from '../features/ingredients/ingredientSlice';

const CoffeeForm = ({ coffeeToEdit, onEditComplete }) => {
    const [title, setTitle] = useState(coffeeToEdit ? coffeeToEdit.title : '');
    const [description, setDescription] = useState(coffeeToEdit ? coffeeToEdit.description : '');
    const [selectedIngredients, setSelectedIngredients] = useState(coffeeToEdit ? coffeeToEdit.ingredients : []);
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredients.ingredients);

    React.useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (coffeeToEdit) {
            dispatch(editCoffee({ id: coffeeToEdit.id, coffee: { title, description, ingredients: selectedIngredients } }));
            onEditComplete();
        } else {
            dispatch(addCoffee({ title, description, ingredients: selectedIngredients }));
        }
        setTitle('');
        setDescription('');
        setSelectedIngredients([]);
    };

    const handleIngredientChange = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedIngredients(value);
    };

    return (
        <div className="form-group">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <select multiple value={selectedIngredients} onChange={handleIngredientChange}>
                        {ingredients.map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.id}>
                                {ingredient.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{coffeeToEdit ? 'Edit' : 'Add'} Coffee</button>
            </form>
        </div>
    );
};

export default CoffeeForm;
