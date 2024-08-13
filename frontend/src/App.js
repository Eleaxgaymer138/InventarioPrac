
import React from 'react';
import ItemList from './components/ItemList';
import './App.css';  // Asegúrate de que este archivo exista en el mismo directorio

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sistema de Inventario</h1>
                <ItemList />
            </header>
        </div>
    );
}

export default App;
