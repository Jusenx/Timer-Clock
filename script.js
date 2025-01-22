const relogio = document.getElementById('clock');
const start = document.getElementById('start');
const reniciar = document.getElementById('reniciar');
const tempoMarcado = document.getElementById('marcado');



let interval = null;
let tempo = horaZerada();

let recorde = [];

function horaZerada() {
    let zerado = new Date(0);
    zerado.setUTCHours(0, 0, 0, 0);
    return zerado;
}


function formatarTempo(tempo) {
    const horas = String(tempo.getUTCHours()).padStart(0, '0');
    const minutos = String(tempo.getUTCMinutes()).padStart(2, '0');
    const segundos = String(tempo.getUTCSeconds()).padStart(2, '0');
    const milissegundos = String(Math.floor(tempo.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutos}:${segundos}.${milissegundos}`;
}

start.addEventListener('click', function () {
    console.log('apertou Start/Stop');
    
    if (start.textContent === "Start") {
        // Inicia ou continua o cronômetro
        start.textContent = "Stop";
        start.style.backgroundColor = "red";
        
        interval = setInterval(() => {
            tempo.setUTCMilliseconds(tempo.getUTCMilliseconds() + 10);
            relogio.innerHTML = formatarTempo(tempo);
        }, 10);
    } else {
        // Pausa o cronômetro
        start.textContent = "Start";
        start.style.backgroundColor = "green";
        
        tempoMarcado.innerHTML += `${formatarTempo(tempo)}  <br>`;
        clearInterval(interval); // Interrompe a contagem
        interval = null;
    }
});

reniciar.addEventListener('click', function () {
    console.log('apertou Reiniciar');

    if (interval != null) {
        clearInterval(interval);
        interval = null;
    }

    // Reseta o cronômetro
    tempo = horaZerada();
    relogio.innerHTML = tempo.toISOString().substr(11, 8);

    // Volta o botão para "Start"
    start.textContent = "Start";
    start.style.backgroundColor = "green";
});
