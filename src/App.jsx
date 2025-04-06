/*import { useState } from 'react';

function App() {
    const [responseMessage, setResponseMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL; // Se lee la URL base desde .env

    const handleRegister = async () => {
        try {
            // Realiza una petición POST al endpoint /auth/register
            const res = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'ejemplo',
                    email: 'ejemplo@mail.com',
                    password: '123456'
                })
            });

            // Suponiendo que el backend responde con un mensaje de texto
            const data = await res.text();
            setResponseMessage(data);
        } catch (error) {
            console.error("Error en el registro:", error);
            setResponseMessage("Error en el registro");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Prueba de Registro</h1>
            <button
                onClick={handleRegister}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#FF073A',
                    color: '#FFF'
                }}
            >
                Registrar Usuario
            </button>
            {responseMessage && (
                <div style={{ marginTop: '20px' }}>
                    <strong>Respuesta:</strong>
                    <p>{responseMessage}</p>
                </div>
            )}
        </div>
    );
}

export default App;*/
import "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Otras rutas */}
            </Routes>
        </Router>
    )
}

export default App;
