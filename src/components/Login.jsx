import { useState } from 'react';
import { loginUser } from './services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            password
        };
        try {
            const response = await loginUser(userData);
            console.log('Token de login:', response.token);
            // Aquí puedes guardar el token y redirigir al usuario
        } catch (err) {
            console.error('Error:', err);
            setError('Error de autenticación');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <div>{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;