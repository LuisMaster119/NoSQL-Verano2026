// ==================== ESTADO ====================

let tipoActual = "series";

const tabs = document.querySelectorAll(".tab");

const formSeries = document.getElementById("formSeries");
const formPeliculas = document.getElementById("formPeliculas");

const formTitulo = document.getElementById("formTitulo");
const formHint = document.getElementById("formHint");
const catalogoTitulo = document.getElementById("catalogoTitulo");

const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");
const btnConsultar = document.getElementById("btnConsultar");

// ==================== TABS ====================

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        tipoActual = tab.dataset.tipo;

        const esSeries = tipoActual === "series";

        formSeries.hidden = !esSeries;
        formPeliculas.hidden = esSeries;

        formTitulo.textContent = esSeries ? "Nueva serie" : "Nueva película";
        formHint.textContent = esSeries
            ? "Completa la ficha para agregarla al catálogo."
            : "Completa la ficha para agregarla al catálogo.";
        catalogoTitulo.textContent = esSeries ? "Series en catálogo" : "Películas en catálogo";

        cancelarEdicionSeries();
        cancelarEdicionPeliculas();
        cargarCatalogo();
    });
});

// ==================== HELPERS DE RENDER ====================

function crearStamp(calificacion, nc) {
    const stamp = document.createElement("div");
    stamp.className = "stamp";

    const num = document.createElement("div");
    num.className = "num";
    num.textContent = Number(calificacion).toFixed(1);

    const clasif = document.createElement("div");
    clasif.className = "nc";
    clasif.textContent = nc || "S/C";

    stamp.appendChild(num);
    stamp.appendChild(clasif);

    return stamp;
}

function renderSerie(serie) {
    const li = document.createElement("li");
    li.className = "card";

    li.appendChild(crearStamp(serie.calificacion, serie.nc));

    const titulo = document.createElement("div");
    titulo.className = "card-titulo";
    titulo.textContent = serie.titulo;

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `<span>${serie.genero}</span><span>${serie.año}</span><span>${serie.idioma}</span>`;

    const detalles = document.createElement("div");
    detalles.className = "card-detalles";
    detalles.innerHTML = `<span>${serie.temporadas} temp.</span><span>${serie.episodios} ep.</span>`;

    const acciones = document.createElement("div");
    acciones.className = "card-actions";

    const btnEditar = document.createElement("button");
    btnEditar.className = "editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => cargarSerieEnFormulario(serie));

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarSerieHandler(serie._id));

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    li.appendChild(titulo);
    li.appendChild(meta);
    li.appendChild(detalles);
    li.appendChild(acciones);

    return li;
}

function renderPelicula(pelicula) {
    const li = document.createElement("li");
    li.className = "card";

    li.appendChild(crearStamp(pelicula.calificacion, pelicula.nc));

    const titulo = document.createElement("div");
    titulo.className = "card-titulo";
    titulo.textContent = pelicula.titulo;

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `<span>${pelicula.genero}</span><span>${pelicula.año}</span><span>${pelicula.idioma}</span>`;

    const detalles = document.createElement("div");
    detalles.className = "card-detalles";
    detalles.innerHTML = `<span>${pelicula.duracion} min</span>`;

    const acciones = document.createElement("div");
    acciones.className = "card-actions";

    const btnEditar = document.createElement("button");
    btnEditar.className = "editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => cargarPeliculaEnFormulario(pelicula));

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarPeliculaHandler(pelicula._id));

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    li.appendChild(titulo);
    li.appendChild(meta);
    li.appendChild(detalles);
    li.appendChild(acciones);

    return li;
}

// ==================== CARGAR CATÁLOGO ====================

async function cargarCatalogo() {
    lista.innerHTML = "";

    try {
        if (tipoActual === "series") {
            const series = await obtenerSeries();
            vacio.hidden = series.length > 0;
            series.forEach((serie) => lista.appendChild(renderSerie(serie)));
        } else {
            const peliculas = await obtenerPeliculas();
            vacio.hidden = peliculas.length > 0;
            peliculas.forEach((pelicula) => lista.appendChild(renderPelicula(pelicula)));
        }
    } catch (error) {
        alert(error.message);
    }
}

btnConsultar.addEventListener("click", cargarCatalogo);

// ==================== FORMULARIO SERIES ====================

const s_id = document.getElementById("serieId");
const s_titulo = document.getElementById("s_titulo");
const s_genero = document.getElementById("s_genero");
const s_anio = document.getElementById("s_anio");
const s_idioma = document.getElementById("s_idioma");
const s_temporadas = document.getElementById("s_temporadas");
const s_episodios = document.getElementById("s_episodios");
const s_calificacion = document.getElementById("s_calificacion");
const s_nc = document.getElementById("s_nc");
const s_btnGuardar = document.getElementById("s_btnGuardar");
const s_btnCancelar = document.getElementById("s_btnCancelar");

function cargarSerieEnFormulario(serie) {
    s_id.value = serie._id;
    s_titulo.value = serie.titulo;
    s_genero.value = serie.genero;
    s_anio.value = serie.año;
    s_idioma.value = serie.idioma;
    s_temporadas.value = serie.temporadas;
    s_episodios.value = serie.episodios;
    s_calificacion.value = serie.calificacion;
    s_nc.value = serie.nc || "";

    s_btnGuardar.textContent = "Actualizar serie";
    s_btnCancelar.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicionSeries() {
    s_id.value = "";
    formSeries.reset();
    s_btnGuardar.textContent = "Guardar serie";
    s_btnCancelar.hidden = true;
}

s_btnCancelar.addEventListener("click", cancelarEdicionSeries);

formSeries.addEventListener("submit", async (e) => {
    e.preventDefault();

    const serie = {
        titulo: s_titulo.value,
        genero: s_genero.value,
        año: Number(s_anio.value),
        temporadas: Number(s_temporadas.value),
        episodios: Number(s_episodios.value),
        idioma: s_idioma.value,
        calificacion: Number(s_calificacion.value),
        nc: s_nc.value
    };

    try {
        const respuesta = s_id.value
            ? await actualizarSerie(s_id.value, serie)
            : await crearSerie(serie);

        alert(respuesta.mensaje);
        cancelarEdicionSeries();
        cargarCatalogo();
    } catch (error) {
        alert(error.message);
    }
});

async function eliminarSerieHandler(id) {
    if (!confirm("¿Eliminar esta serie del catálogo?")) return;

    try {
        const respuesta = await eliminarSerie(id);
        alert(respuesta.mensaje);
        cargarCatalogo();
    } catch (error) {
        alert(error.message);
    }
}

// ==================== FORMULARIO PELICULAS ====================

const p_id = document.getElementById("peliculaId");
const p_titulo = document.getElementById("p_titulo");
const p_genero = document.getElementById("p_genero");
const p_anio = document.getElementById("p_anio");
const p_idioma = document.getElementById("p_idioma");
const p_duracion = document.getElementById("p_duracion");
const p_calificacion = document.getElementById("p_calificacion");
const p_nc = document.getElementById("p_nc");
const p_btnGuardar = document.getElementById("p_btnGuardar");
const p_btnCancelar = document.getElementById("p_btnCancelar");

function cargarPeliculaEnFormulario(pelicula) {
    p_id.value = pelicula._id;
    p_titulo.value = pelicula.titulo;
    p_genero.value = pelicula.genero;
    p_anio.value = pelicula.año;
    p_idioma.value = pelicula.idioma;
    p_duracion.value = pelicula.duracion;
    p_calificacion.value = pelicula.calificacion;
    p_nc.value = pelicula.nc || "";

    p_btnGuardar.textContent = "Actualizar película";
    p_btnCancelar.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicionPeliculas() {
    p_id.value = "";
    formPeliculas.reset();
    p_btnGuardar.textContent = "Guardar película";
    p_btnCancelar.hidden = true;
}

p_btnCancelar.addEventListener("click", cancelarEdicionPeliculas);

formPeliculas.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pelicula = {
        titulo: p_titulo.value,
        genero: p_genero.value,
        año: Number(p_anio.value),
        duracion: Number(p_duracion.value),
        idioma: p_idioma.value,
        calificacion: Number(p_calificacion.value),
        nc: p_nc.value
    };

    try {
        const respuesta = p_id.value
            ? await actualizarPelicula(p_id.value, pelicula)
            : await agregarPelicula(pelicula);

        alert(respuesta.mensaje);
        cancelarEdicionPeliculas();
        cargarCatalogo();
    } catch (error) {
        alert(error.message);
    }
});

async function eliminarPeliculaHandler(id) {
    if (!confirm("¿Eliminar esta película del catálogo?")) return;

    try {
        const respuesta = await eliminarPelicula(id);
        alert(respuesta.mensaje);
        cargarCatalogo();
    } catch (error) {
        alert(error.message);
    }
}

// ==================== INICIO ====================

cargarCatalogo();