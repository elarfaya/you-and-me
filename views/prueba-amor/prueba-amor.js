const preguntas = [
    {
        pregunta: "¿Dónde fue nuestra primera escapada?",
        respuesta: "Eugi",
        premio: "🎟️ Ticket válido por un masaje relajante"
    },
    {
        pregunta: "¿Quién dijo 'te quiero' primero?",
        respuesta: "Maite",
        premio: "🌹 Ticket válido por un ramo de flores"
    },
    {
        pregunta: "Estoy contigo en lo bueno y lo malo, no soy persona… ¿qué soy?",
        respuesta: "el amor",
        premio: "🎬 Ticket válido para elegir película esta semana"
    },
    {
        pregunta: "¿Quién se enamoró primero?",
        respuesta: "Maite",
        premio: "🍫 Vale por tu chocolate favorito"
    },
    {
        pregunta: "¿Quién es más cabezota?",
        respuesta: "Maite",
        premio: "😌 Vale por elegir restaurante"
    },
    {
        pregunta: "¿Qué comida nunca nos falla?",
        respuesta: "pizza",
        premio: "🍕 Cena especial a elegir"
    },
    {
        pregunta: "¿Qué día celebramos nuestro aniversario?",
        respuesta: "25 de junio",
        premio: "🥂 Brindis romántico"
    },
    {
        pregunta: "¿Quién conduce mejor?",
        respuesta: "Enrique",
        premio: "🚗 Copiloto VIP una semana"
    },
    {
        pregunta: "¿Cuál fue nuestra primera película en el cine?",
        respuesta: "Zootropolis 2",
        premio: "🍿 Noche de cine premium"
    },
    {
        pregunta: "¿Quién se queda dormido antes?",
        respuesta: "Maite",
        premio: "🌙 Masaje nocturno"
    },
    {
        pregunta: "¿Dónde fue nuestro primer beso?",
        respuesta: "Sarasate",
        premio: "💋 Beso sorpresa"
    },
    {
        pregunta: "¿Quién ronca más?",
        respuesta: "Maite",
        premio: "😂 Desayuno en la cama"
    },
    {
        pregunta: "¿Qué serie vimos juntos del tirón?",
        respuesta: "A la fuga",
        premio: "📺 Maratón de serie"
    },
];

let preguntaActual;

function cargarPregunta() {
    const bloqueadoHasta = localStorage.getItem("bloqueadoHasta");
    let usadas = JSON.parse(localStorage.getItem("preguntasUsadas")) || [];

    // 🚫 Si ya se completaron todas
    if (usadas.length === preguntas.length) {
        mostrarFinal();
        return;
    }

    // ⏳ Si está bloqueado por 24h
    if (bloqueadoHasta && Date.now() < bloqueadoHasta) {
        mostrarPremioBloqueado(bloqueadoHasta);
        return;
    }

    // Filtrar preguntas disponibles
    const disponibles = preguntas
        .map((p, index) => ({ ...p, index }))
        .filter(p => !usadas.includes(p.index));

    const seleccion = disponibles[Math.floor(Math.random() * disponibles.length)];

    preguntaActual = seleccion;

    document.getElementById("pregunta").innerText = preguntaActual.pregunta;
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
    const input = document.getElementById("respuesta").value.trim();

    if (input === preguntaActual.respuesta) {
        acertado();
    } else {
        document.getElementById("mensaje").innerText = "Ups… intenta otra vez 😏";
    }
}

function acertado() {
    lanzarCorazones();

    const tiempoBloqueo = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("bloqueadoHasta", tiempoBloqueo);
    localStorage.setItem("ultimoPremio", preguntaActual.premio);

    let usadas = JSON.parse(localStorage.getItem("preguntasUsadas")) || [];
    usadas.push(preguntaActual.index);
    localStorage.setItem("preguntasUsadas", JSON.stringify(usadas))

    mostrarPremioBloqueado(tiempoBloqueo);
}

function mostrarPremioBloqueado(tiempoFinal) {
    const premio = localStorage.getItem("ultimoPremio");
    if (premio) {
        document.getElementById("premioTexto").innerText = premio;
    }

    document.getElementById("flipCard").classList.add("girada");
    iniciarContador(tiempoFinal);
}

function iniciarContador(tiempoFinal) {
    const contador = document.getElementById("contadorPremio");

    setInterval(() => {
        const restante = tiempoFinal - Date.now();

        if (restante <= 0) {
            localStorage.removeItem("bloqueadoHasta");
            location.reload();
        }

        const horas = Math.floor(restante / (1000 * 60 * 60));
        const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((restante % (1000 * 60)) / 1000);

        contador.innerText = `Nueva prueba en ${horas}h ${minutos}m ${segundos}s`;
    }, 1000);
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
        heart.style.animation = `caer ${2 + Math.random() * 2}s linear forwards`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

cargarPregunta();