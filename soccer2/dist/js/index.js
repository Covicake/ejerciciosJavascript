"use strict";

var elems = {
  boton: document.querySelector(".boton"),
  partido: document.querySelector(".partido"),
  clasificatoria: document.querySelector(".clasificatoria"),
  array_filas: document.querySelectorAll(".filas")
};

var equiposRestantes = void 0; //Se va vaciando
var posiblesResultados = void 0; //Array con numero de goles ponderados segun su probabilidad. (Probabilidad arbitraria)
var ronda = 1; //Ronda actual del "torneo". Empieza a contar en 1.

var partidos = [[], [], []]; //En cada ronda se almacenan las parejas de equipos que se enfrentan y su resultado.
var equipos = []; //Objetos. Formato: Nombre: "String", Goles: Number, Derrotado: Boolean.

var arrayEquipos = ["Alaves", "Athletic Bilbao", "Athletico Madrid", "Barcelona", "Celta de Vigo", "Deportivo La Coruña", "Eibar", "Espanyol"];
var escudos = ["http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/96.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/93.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/1068.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/83.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/85.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/90.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3752.png&h=30", "http://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/88.png&h=30"];

function actualizarTabla() {}

function construirEquipos() {
  arrayEquipos.forEach(function (e, i) {
    equipos.push({ nombre: e, escudo: escudos[i], golesPartido: 0, victorias: 0, golesFavor: 0, golesContra: 0 });
  });
}

function decidirPartidos() {
  //Empareja los equipos en cada ronda
  var equipoA = elegirEquipo();
  var equipoB = elegirEquipo();

  equipoA = equipos.indexOf(equipoA);
  equipoB = equipos.indexOf(equipoB);

  decidirResultado(equipoA, equipoB); //Modifica la informacion de los equipos directamente en el array de objetos.
}

function elegirEquipo() {
  var equipo = equiposRestantes.shift();
  return equipo;
}

function decidirResultado(equipoA, equipoB) {
  var ind = Math.floor(Math.random() * posiblesResultados.length);
  var ind2 = Math.floor(Math.random() * posiblesResultados.length);

  equipos[equipoA].golesPartido = posiblesResultados[ind];
  equipos[equipoB].golesPartido = posiblesResultados[ind2];

  if (equipos[equipoA].golesPartido > equipos[equipoB].golesPartido) {
    equipos[equipoA].victorias += 1;
  } else if (equipos[equipoA].golesPartido == equipos[equipoB].golesPartido) {

    if (Math.round(Math.random()) == 0) {
      equipos[equipoA].victorias += 1;
    } else {
      equipos[equipoB].victorias += 1;
    }
  } else {
    equipos[equipoB].victorias += 1;
  }
  equipos[equipoA].golesFavor += equipos[equipoA].golesPartido;
  equipos[equipoA].golesContra += equipos[equipoB].golesPartido;

  equipos[equipoB].golesFavor += equipos[equipoB].golesPartido;
  equipos[equipoB].golesContra += equipos[equipoA].golesPartido;
}

function setResultados() {

  equipos = _.orderBy(equipos, ["victorias", "golesFavor", "golesContra"], ["desc", "desc", "asc"]);

  elems.array_filas.forEach(function (e, i) {
    e.children[0].src = equipos[i].escudo;
    e.children[1].textContent = equipos[i].nombre;
    e.children[2].textContent = equipos[i].victorias;
    e.children[3].textContent = equipos[i].golesFavor;
    e.children[4].textContent = equipos[i].golesContra;
  });
}

function nuevoPartido() {
  equiposRestantes = _.shuffle(equipos);
  decidirPartidos(); //En cada ronda, empareja los equipos y decide el resultado del enfrentamiento.
  setResultados(ronda);
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
construirEquipos();
