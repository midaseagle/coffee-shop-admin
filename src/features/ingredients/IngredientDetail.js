import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetail = () => {
    const { id } = useParams();
    const ingredient = useSelector((state) =>
        state.ingredients.ingredients.find((ingredient) => ingredient.id === id)
    );

    if (!ingredient) {
        return <div>Ingredient not found</div>;
    }

    return (
        <div className="container">
            <h2>{ingredient.name}</h2>
            <p>Price: ${ingredient.price}</p>
            <p>Description: {ingredient.description}</p>
        </div>
    );
};

export default IngredientDetail;
