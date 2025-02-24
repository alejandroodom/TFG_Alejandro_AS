const API_URL = import.meta.env.VITE_API_URL; // Backend en Render


fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'ejemplo',
        email: 'ejemplo@mail.com',
        password: '123456'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));



