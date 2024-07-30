import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import IngredientForm from './components/IngredientForm';
import CoffeeForm from './components/CoffeeForm';
import IngredientList from './components/IngredientList';
import CoffeeList from './components/CoffeeList';
import IngredientDetail from './features/ingredients/IngredientDetail';
import CoffeeDetail from './features/coffees/CoffeeDetail';
import './styles.css'

const App = () => {
  return (
      <Provider store={store}>
          <Router>
              <div className="container">
                  <h1>Craft Coffee Shop Admin Panel</h1>
                  <Routes>
                      <Route path="/" element={<div>
                          <IngredientForm />
                          <IngredientList />
                          <CoffeeForm />
                          <CoffeeList />
                      </div>} />
                      <Route path="/ingredients/:id" element={<IngredientDetail />} />
                      <Route path="/coffees/:id" element={<CoffeeDetail />} />
                  </Routes>
              </div>
          </Router>
      </Provider>
  );
};

export default App;