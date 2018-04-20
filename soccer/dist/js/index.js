"use strict";

var elems = {
  boton: document.querySelector(".boton"),
  partido: document.querySelector(".partido"),
  clasificatoria: document.querySelector(".clasificatoria")
};

var equiposRestantes = void 0; //Se va vaciando
var posiblesResultados = void 0; //Array con numero de goles ponderados segun su probabilidad. (Probabilidad arbitraria)
var ronda = 1; //Ronda actual del "torneo". Empieza a contar en 1.

var partidos = []; //En cada ronda se almacenan las parejas de equipos que se enfrentan y su resultado.
var equipos = []; //Objetos. Formato: Nombre: "String", Goles: Number, Derrotado: Boolean.

var arrayEquipos = ["Alaves", "Athletic Bilbao", "Athletico Madrid", "Barcelona", "Celta de Vigo", "Deportivo La Coruña", "Eibar", "Espanyol"];

function construirEquipos() {
  equipos = [];
  arrayEquipos.forEach(function (e, i) {
    equipos.push({ nombre: e, goles: 0, derrotado: false });
  });
}

function decidirPartidos() {
  //Empareja los equipos en cada ronda
  for (var i in _.range(0, equiposRestantes.length / 2)) {
    partidos.push({ equipoA: elegirEquipo(), equipoB: elegirEquipo(), resultado: [] });
    partidos[i].resultado = decidirResultado(partidos[i].equipoA, partidos[i].equipoB);
  }
}

function elegirEquipo() {
  var equipo = equiposRestantes.shift();
  return equipo;
}

function decidirResultado(equipoA, equipoB) {
  var ind = Math.floor(Math.random() * posiblesResultados.length);
  var ind2 = Math.floor(Math.random() * posiblesResultados.length);

  equipoA.goles = posiblesResultados[ind];
  equipoB.goles = posiblesResultados[ind2];
  if (equipoA.goles > equipoB.goles || equipoA.goles == equipoB.goles) {
    equipoB.derrotado = true;
  } else {
    equipoA.derrotado = true;
  }
  return [equipoA.goles, equipoB.goles];
}

function setResultados(ronda) {
  var nexov = document.createElement("div");
  nexov.classList.add("nexoV", "v" + ronda);

  var nexoh = document.createElement("div");
  nexoh.classList.add("nexoH", "h" + ronda);

  var fila = document.createElement("div");
  fila.classList.add("fila", "f" + ronda);

  elems.clasificatoria.appendChild(nexov);
  elems.clasificatoria.appendChild(nexoh);
  elems.clasificatoria.appendChild(fila);

  elems["v" + ronda] = document.querySelector(".v" + ronda);
  elems["h" + ronda] = document.querySelector(".h" + ronda);
  elems["f" + ronda] = document.querySelector(".f" + ronda);

  for (var i in _.range(0, partidos.length)) {
    var nexV = document.createElement("div");
    var nexH = document.createElement("div");

    nexV.classList.add("nexo", "V");
    nexH.classList.add("nexo", "H" + ronda);

    elems["v" + ronda].appendChild(nexV);
    elems["h" + ronda].appendChild(nexH);
  }

  partidos.forEach(function (e, i) {
    var teamA = document.createElement("div");
    var teamB = document.createElement("div");

    teamA.classList.add("equipo");
    teamB.classList.add("equipo");

    teamA.textContent = e.equipoA.nombre + " " + e.equipoA.goles;
    teamB.textContent = e.equipoB.nombre + " " + e.equipoB.goles;

    elems["f" + ronda].appendChild(teamA);
    elems["f" + ronda].appendChild(teamB);
  });
}

function nuevoPartido() {
  construirEquipos();
  elems.clasificatoria.textContent = "";
  equiposRestantes = _.shuffle(equipos);
  decidirPartidos(); //En cada ronda, empareja los equipos y decide el resultado del enfrentamiento.
  setResultados(ronda);
  ronda++;
  elems.boton.onclick = siguienteRonda;
  elems.boton.textContent = "Siguiente ronda";
}

function siguienteRonda() {
  equiposRestantes = partidos.map(function (e) {
    var ganador = void 0;
    if (e.equipoA.derrotado == false) {
      ganador = e.equipoA;
    } else {
      ganador = e.equipoB;
    }
    return ganador;
  });

  if (equiposRestantes.length == 1) {
    var fila = document.createElement("div");
    fila.classList.add("f" + ronda);
    elems.clasificatoria.appendChild(fila);

    elems["f" + ronda] = document.querySelector(".f" + ronda);
    var winner = document.createElement("div");
    winner.classList.add("equipo");
    winner.textContent = equiposRestantes[0].nombre + " " + equiposRestantes[0].goles;
    elems["f" + ronda].appendChild(winner);

    elems.boton.onclick = nuevoPartido;
    elems.boton.textContent = "Nuevo partido";
    partidos = [];
    ronda = 1;
  } else {
    partidos = [];
    decidirPartidos();
    setResultados(ronda);
    ronda++;
  }
}

function generarProbabilidades() {
  var ceros = _.fill(Array(20), 0);
  var unos = _.fill(Array(18), 1);
  var dos = _.fill(Array(17), 2);
  var tres = _.fill(Array(15), 3);
  posiblesResultados = _.concat(ceros, unos, dos, tres);
  posiblesResultados = _.concat(posiblesResultados, [4, 5, 6, 7, 8, 9]);
  posiblesResultados = _.shuffle(posiblesResultados);
}

generarProbabilidades(); //Solo es necesario una vez (al iniciarse el programa).
elems.boton.onclick = nuevoPartido;
