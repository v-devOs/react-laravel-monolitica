import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000, // 10 segundos
});

// Interceptor para request (opcional - útil para tokens)
api.interceptors.request.use(
    (config) => {
        // Aquí puedes agregar tokens de autenticación si los necesitas
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para response (manejo de errores global)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejo de errores global
        if (error.response) {
            // Error del servidor (4xx, 5xx)
            console.error("Error response:", error.response.data);
        } else if (error.request) {
            // Error de red
            console.error("Error request:", error.request);
        } else {
            // Otro tipo de error
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
