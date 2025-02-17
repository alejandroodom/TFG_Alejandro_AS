import { useState } from 'react';
import { registerUser } from './services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sex, setSex] = useState('M');
    const [birthdate, setBirthdate] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            email,
            password,
            sex,
            birthdate,
            country
        };
        try {
            const response = await registerUser(userData);
            console.log('Usuario registrado:', response);
            // Aquí puedes hacer alguna acción después de registrar el usuario (como redirigir o mostrar un mensaje)
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
            >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
            <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;