import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, deleteDoc, doc, onSnapshot } from '../firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ItemList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });

    useEffect(() => {
        const itemsCollection = collection(db, 'items');
        const unsubscribe = onSnapshot(itemsCollection, (snapshot) => {
            const itemsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(itemsData);
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const itemsCollection = collection(db, 'items');
            await addDoc(itemsCollection, {
                name: newItem.name,
                quantity: parseInt(newItem.quantity),
                price: parseFloat(newItem.price),
            });
            setNewItem({ name: '', quantity: '', price: '' });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const itemDoc = doc(db, 'items', id);
            await deleteDoc(itemDoc);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Lista de Artículos</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={newItem.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Cantidad"
                    value={newItem.quantity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    step="0.01"
                    value={newItem.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Añadir Artículo</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} - ${item.price}
                        <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <LineChart width={500} height={300} data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* Oculta la leyenda */}
                <Legend wrapperStyle={{ display: 'none' }} />
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
            </LineChart>
        </div>
    );
}

export default ItemList;
