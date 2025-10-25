import React, { useState } from "react";
import useFetch, { useApi } from "../hooks/useFetch";

/**
 * Componente principal con listado de actores paginado
 */
export const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, loading, error, execute } = useFetch(`/actors`, {
        params: { page: currentPage },
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
        execute(null, { page });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium">
                        Cargando actores...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg max-w-md">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <svg
                                className="h-6 w-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">
                                Error: {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 mb-4">
                        🎬 Lista de Actores
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explora nuestra colección de actores destacados
                    </p>
                    <div className="mt-4 inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                            Total de actores:{" "}
                            <span className="text-indigo-600 font-bold">
                                {data?.total || 0}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Grid de actores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {data?.data?.map((actor, index) => (
                        <div
                            key={actor.actor_id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animation: "fadeInUp 0.6s ease-out forwards",
                            }}
                        >
                            <div className="h-48 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <div className="text-6xl font-bold text-white opacity-90">
                                    {actor.first_name?.charAt(0)}
                                    {actor.last_name?.charAt(0)}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    {actor.first_name} {actor.last_name}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    ID: {actor.actor_id}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Botón Anterior */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                currentPage === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-x-1"
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Anterior
                        </button>

                        {/* Información de página */}
                        <div className="flex items-center gap-2">
                            <div className="text-center px-4 py-2 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Página
                                </p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    {data?.current_page}
                                </p>
                            </div>
                            <span className="text-2xl text-gray-400 font-light">
                                /
                            </span>
                            <div className="text-center px-4 py-2 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">
                                    Total
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {data?.last_page}
                                </p>
                            </div>
                        </div>

                        {/* Botón Siguiente */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === data?.last_page}
                            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                currentPage === data?.last_page
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:translate-x-1"
                            }`}
                        >
                            Siguiente
                            <svg
                                className="w-5 h-5 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Info adicional */}
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            Mostrando{" "}
                            <span className="font-semibold text-indigo-600">
                                {data?.from || 0}
                            </span>{" "}
                            a{" "}
                            <span className="font-semibold text-indigo-600">
                                {data?.to || 0}
                            </span>{" "}
                            de{" "}
                            <span className="font-semibold text-indigo-600">
                                {data?.total || 0}
                            </span>{" "}
                            actores
                        </p>
                    </div>
                </div>
            </div>

            {/* Estilos para animación */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default App;
