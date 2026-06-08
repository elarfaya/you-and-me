let preguntas = [];
let preguntaActual;

const API_URL = "https://script.google.com/macros/s/AKfycbyQbj60mby-mnObvO2h02nCbnXiK2COSdmSQOmrq1E6czq7CEazG_zIvjz9sge6J50-wQ/exec";

async function cargarPreguntas() {
    try {
        const response = await fetch(API_URL);
        preguntas = await response.json();

        cargarPregunta();
    } catch (error) {
        console.error(error);
        document.getElementById("mensaje").innerText =
            "Error al cargar las preguntas 😢";
    }
}

function cargarPregunta() {

    console.log("Preguntas:", preguntas);

    const completadas = preguntas.filter(
        p => String(p.completada).trim().toUpperCase() === "SI"
            && p.fecha_acierto
    );

    console.log("Completadas:", completadas);

    if (completadas.length > 0) {

        const ultima = completadas.sort(
            (a, b) =>
                new Date(b.fecha_acierto) -
                new Date(a.fecha_acierto)
        )[0];

        const fechaAcierto =
            new Date(ultima.fecha_acierto);

        const desbloqueo =
            fechaAcierto.getTime() +
            (24 * 60 * 60 * 1000);
        console.log("Fecha acierto:", fechaAcierto);
        console.log("Desbloqueo:", new Date(desbloqueo));
        console.log("Ahora:", new Date());
        console.log("Bloqueado:", Date.now() < desbloqueo);
        if (Date.now() < desbloqueo) {

            document.getElementById("pregunta").innerText =
                "⏳ La siguiente prueba estará disponible en:";

            document.getElementById("respuesta").style.display = "none";
            document.getElementById("responderButton").style.display = "none";

            iniciarContador(desbloqueo);

            return;
        }
    }

    const pendiente = preguntas.find(
        p => String(p.completada).trim().toUpperCase() !== "SI"
    );

    if (!pendiente) {
        mostrarFinal();
        return;
    }

    preguntaActual = pendiente;

    document.getElementById("pregunta").innerText =
        preguntaActual.pregunta;

    document.getElementById("respuesta").value = "";
}

function iniciarContador(fechaDesbloqueo) {

    const contador =
        document.getElementById("contador");

    setInterval(() => {

        const restante =
            fechaDesbloqueo - Date.now();

        if (restante <= 0) {
            location.reload();
            return;
        }

        const horas =
            Math.floor(restante / (1000 * 60 * 60));

        const minutos =
            Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));

        const segundos =
            Math.floor((restante % (1000 * 60)) / 1000);

        contador.innerText =
            `${horas}h ${minutos}m ${segundos}s`;

    }, 1000);
}

function mostrarFinal() {

    document.getElementById("pregunta").innerText =
        "💖 Has completado todas las Pruebas de Amor 💖";

    document.getElementById("mensaje").innerText =
        "Ya no quedan más preguntas… pero siempre quedará nuestro amor 😌";

    document.getElementById("respuesta").style.display = "none";
    document.getElementById("responderButton").style.display = "none";
}

function comprobarRespuesta() {

    const input = document
        .getElementById("respuesta")
        .value
        .trim()
        .toLowerCase();

    const respuestaCorrecta = preguntaActual.respuesta
        .trim()
        .toLowerCase();

    if (input === respuestaCorrecta) {
        acertado();
    } else {
        document.getElementById("mensaje").innerText =
            "Ups… intenta otra vez 😏";
        document.getElementById("respuesta").value = "";
    }
}

const SHEETDB_URL = "https://sheetdb.io/api/v1/8c485wkudvpbd";

async function marcarCompletada() {

    const response = await fetch(
        `${SHEETDB_URL}/id/${preguntaActual.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    completada: "SI",
                    fecha_acierto: new Date().toISOString()
                }
            })
        }
    );

    const resultado = await response.json();

    console.log(resultado);
}

async function acertado() {

    try {

        await marcarCompletada();

        lanzarCorazones();

        document.getElementById("premioTexto").innerText =
            preguntaActual.premio;

        document.getElementById("flipCard")
            .classList.add("girada");

    } catch (error) {

        console.error(error);

        document.getElementById("mensaje").innerText =
            "Error guardando el progreso 😢";
    }
}

function lanzarCorazones() {

    for (let i = 0; i < 40; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "💖";
        heart.style.position = "fixed";
        heart.style.top = "-20px";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = 16 + Math.random() * 20 + "px";
        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";
        heart.style.animation =
            `caer ${2 + Math.random() * 2}s linear forwards`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

cargarPreguntas();