import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

/**
 * Hook personalizado para realizar peticiones HTTP con Axios
 * @param {string} url - URL del endpoint (relativa a la baseURL)
 * @param {object} options - Opciones de configuración
 * @param {boolean} options.autoFetch - Si debe hacer fetch automáticamente al montar (default: true)
 * @param {string} options.method - Método HTTP (default: 'GET')
 * @param {object} options.params - Parámetros de query string
 * @returns {object} - { data, loading, error, refetch, execute }
 */
export const useFetch = (url, options = {}) => {
    const { autoFetch = true, method = "GET", params = {} } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para ejecutar la petición
    const execute = useCallback(
        async (customUrl = null, customConfig = {}) => {
            setLoading(true);
            setError(null);

            try {
                const endpoint = customUrl || url;
                const requestConfig = {
                    method,
                    params,
                    ...customConfig,
                };

                // Si customConfig tiene una propiedad 'page', agregar a params
                if (customConfig.page) {
                    requestConfig.params = {
                        ...requestConfig.params,
                        page: customConfig.page,
                    };
                    // Eliminar page del nivel superior para evitar duplicados
                    delete requestConfig.page;
                }

                const response = await api.request({
                    url: endpoint,
                    ...requestConfig,
                });

                setData(response.data);
                return response.data;
            } catch (err) {
                const errorMessage =
                    err.response?.data?.message ||
                    err.message ||
                    "Error en la petición";
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url, method, params]
    );

    // Función para refrescar los datos
    const refetch = useCallback(() => {
        return execute();
    }, [execute]);

    // Auto fetch al montar el componente
    useEffect(() => {
        if (autoFetch && url) {
            execute();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoFetch, url]);

    return {
        data,
        loading,
        error,
        refetch,
        execute,
    };
};

/**
 * Hook para operaciones CRUD específicas
 * @returns {object} - Métodos para GET, POST, PUT, DELETE
 */
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // GET Request
    const get = useCallback(async (url, config = {}) => {
        setLoading(true);
        setError(null);
        try {
            // Si config tiene una propiedad 'page', agregar a params
            const requestConfig = { ...config };
            if (config.page) {
                requestConfig.params = {
                    ...config.params,
                    page: config.page,
                };
                // Eliminar page del nivel superior para evitar duplicados
                delete requestConfig.page;
            }

            const response = await api.get(url, requestConfig);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // POST Request
    const post = useCallback(async (url, data, config = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(url, data, config);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // PUT Request
    const put = useCallback(async (url, data, config = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(url, data, config);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // DELETE Request
    const del = useCallback(async (url, config = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(url, config);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        get,
        post,
        put,
        delete: del,
    };
};

export default useFetch;
