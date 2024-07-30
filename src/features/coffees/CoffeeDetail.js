import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CoffeeDetail = () => {
    const { id } = useParams();
    const coffee = useSelector((state) =>
        state.coffees.coffees.find((coffee) => coffee.id === id)
    );
    const ingredients = useSelector((state) => state.ingredients.ingredients);

    if (!coffee) {
        return <div>Coffee not found</div>;
    }

    const calculateTotalPrice = (coffeeIngredients) => {
        const total = coffeeIngredients.reduce((sum, ingredientId) => {
            const ingredient = ingredients.find(ing => ing.id === ingredientId);
            return sum + (ingredient ? ingredient.price : 0);
        }, 0);
        return total + 2;
    };

    return (
        <div className="container">
            <h2>{coffee.title}</h2>
            <p>Description: {coffee.description}</p>
            <p>Total Price: ${calculateTotalPrice(coffee.ingredients)}</p>
            <h3>Ingredients:</h3>
            <ul>
                {coffee.ingredients.map((ingredientId) => {
                    const ingredient = ingredients.find((ing) => ing.id === ingredientId);
                    return ingredient ? (
                        <li key={ingredientId}>
                            {ingredient.name} - ${ingredient.price} - {ingredient.description}
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default CoffeeDetail;
