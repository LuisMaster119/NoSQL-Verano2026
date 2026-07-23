const API_URL = "https://api-netflix-peach.vercel.app";

async function manejarRespuesta(respuesta, mensajeError) {
    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || mensajeError);
    }

    return datos;
}

// ==================== SERIES ====================

async function obtenerSeries() {
    const respuesta = await fetch(`${API_URL}/series`);
    return manejarRespuesta(respuesta, "Error al consultar las series");
}

async function crearSerie(serie) {
    const respuesta = await fetch(`${API_URL}/series`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serie)
    });
    return manejarRespuesta(respuesta, "Error al guardar la serie");
}

async function actualizarSerie(id, serie) {
    const respuesta = await fetch(`${API_URL}/series/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serie)
    });
    return manejarRespuesta(respuesta, "Error al actualizar la serie");
}

async function eliminarSerie(id) {
    const respuesta = await fetch(`${API_URL}/series/${id}`, {
        method: "DELETE"
    });
    return manejarRespuesta(respuesta, "Error al eliminar la serie");
}

// ==================== PELICULAS ====================

async function obtenerPeliculas() {
    const respuesta = await fetch(`${API_URL}/peliculas`);
    return manejarRespuesta(respuesta, "Error al consultar las películas");
}

async function agregarPelicula(pelicula) {
    const respuesta = await fetch(`${API_URL}/peliculas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula)
    });
    return manejarRespuesta(respuesta, "Error al guardar la película");
}

async function actualizarPelicula(id, pelicula) {
    const respuesta = await fetch(`${API_URL}/peliculas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula)
    });
    return manejarRespuesta(respuesta, "Error al actualizar la película");
}

async function eliminarPelicula(id) {
    const respuesta = await fetch(`${API_URL}/peliculas/${id}`, {
        method: "DELETE"
    });
    return manejarRespuesta(respuesta, "Error al eliminar la película");
}