import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoffees, deleteCoffee } from '../features/coffees/coffeeSlice';
import CoffeeForm from './CoffeeForm';

const CoffeeList = () => {
    const dispatch = useDispatch();
    const coffees = useSelector((state) => state.coffees.coffees);
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const [editingCoffee, setEditingCoffee] = useState(null);

    React.useEffect(() => {
        dispatch(fetchCoffees());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCoffee(id));
    };

    const handleEdit = (coffee) => {
        setEditingCoffee(coffee);
    };

    const handleEditComplete = () => {
        setEditingCoffee(null);
    };

    const calculateTotalPrice = (coffeeIngredients) => {
        const total = coffeeIngredients.reduce((sum, ingredientId) => {
            const ingredient = ingredients.find(ing => ing.id === ingredientId);
            return sum + (ingredient ? ingredient.price : 0);
        }, 0);
        return total + 2;
    };

    return (
        <div className="container">
            <h2>Coffees</h2>
            <CoffeeForm coffeeToEdit={editingCoffee} onEditComplete={handleEditComplete} />
            <ul>
                {coffees.map((coffee) => (
                    <li key={coffee.id}>
                        {coffee.title} - {coffee.description} - ₾{calculateTotalPrice(coffee.ingredients)}
                        <div>
                            <button className="edit-button" onClick={() => handleEdit(coffee)}>Edit</button>
                            <button onClick={() => handleDelete(coffee.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoffeeList;
