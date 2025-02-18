import axios from 'axios';

// URL de tu backend (asegúrate de cambiar la URL a la correcta de tu backend)
const API_URL = 'http://localhost:8080/auth/';

// Función para registrar un usuario
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar:', error);
        throw error;
    }
};


// Función para hacer login
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al hacer login:', error);
        throw error;
    }
};
