"use strict";

var elems = {
  boton: document.querySelector(".boton"),
  partido: document.querySelector(".partido"),
  clasificatoria: document.querySelector(".clasificatoria")
};

var equiposRestantes = void 0;
var posiblesResultados = void 0;
var ronda = 1; //Ronda actual del "torneo". Empieza a contar en 1.

elems.boton.onclick = nuevoPartido;

var partidos = []; /*
                   {equipoA: "", equipoB: "", resultado = []}, //Resultado ["1", "5"] (Goles equipoA, Goles equipoB).
                   {equipoA: "", equipoB: "", resultado = []},
                   {equipoA: "", equipoB: "", resultado = []},
                   {equipoA: "", equipoB: "", resultado = []},
                   {equipoA: "", equipoB: "", resultado = []}
                   ]; */

var equipos = [{ nombre: "Alaves", goles: 0, derrotado: false }, { nombre: "Athletic Bilbao", goles: 0, derrotado: false }, { nombre: "Athletico Madrid", goles: 0, derrotado: false }, { nombre: "Barcelona", goles: 0, derrotado: false }, { nombre: "Celta de Vigo", goles: 0, derrotado: false }, { nombre: "Deportivo La Coruña", goles: 0, derrotado: false }, { nombre: "Eibar", goles: 0, derrotado: false }, { nombre: "Espanyol", goles: 0, derrotado: false }];

function decidirPartidos() {
  //Empareja los equipos en cada ronda
  for (var i in _.range(0, equiposRestantes.length / 2)) {
    partidos.push({ equipoA: elegirEquipo(), equipoB: elegirEquipo(), resultado: [] });
    partidos[i].resultado = decidirGanador(partidos[i].equipoA, partidos[i].equipoB);
  }
}

function elegirEquipo() {
  /*let equipo;
  do{
    equipo = equiposRestantes.shift();       //En las rondas distintas de la primera, se omitirán los equipos derrotados en rondas anteriores.
  }while(equipo.derrotado == true); */
  var equipo = equiposRestantes.shift();
  return equipo;
}

function decidirGanador(equipoA, equipoB) {
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

/*function decidirGoles(ganador){
  let goles = [];
  if (ganador == 0){                //Si A es el equipo ganador, obtendra un numero de goles aleatorio entre 0 y 4 y B obtendrá un numero entre 0 y goles de A.
    equipoA.goles = Math.floor(Math.random()*4)+1;
    equipoB.goles = Math.floor(Math.random()*equipoA.goles);
  }else{
    equipoB.goles = Math.floor(Math.random()*4)+1;
    equipoA.goles = Math.floor((Math.random()*equipoB.goles));
  }
} */

function setResultados(ronda) {
  var nexov = document.createElement("div");
  nexov.classList.add("nexoV");
  nexov.classList.add("v" + ronda);

  var nexoh = document.createElement("div");
  nexoh.classList.add("nexoH");
  nexoh.classList.add("h" + ronda);

  var fila = document.createElement("div");
  fila.classList.add("fila");
  fila.classList.add("f" + ronda);

  elems.clasificatoria.appendChild(nexov);
  elems.clasificatoria.appendChild(nexoh);
  elems.clasificatoria.appendChild(fila);

  elems["v" + ronda] = document.querySelector(".v" + ronda);
  elems["h" + ronda] = document.querySelector(".h" + ronda);
  elems["f" + ronda] = document.querySelector(".f" + ronda);

  for (var i in [0, 1, 2, 3]) {
    var nexV = document.createElement("div");
    var nexH = document.createElement("div");

    nexV.classList.add("nexo");
    nexH.classList.add("nexo");

    nexV.classList.add("V");
    nexH.classList.add("H" + ronda);

    elems["v" + ronda].appendChild(nexV);
    elems["h" + ronda].appendChild(nexH);
  }

  partidos.forEach(function (e, i) {
    var teamA = document.createElement("div");
    var teamB = document.createElement("div");

    teamA.classList.add("equipo");
    teamB.classList.add("equipo");

    teamA.textContent = e.equipoA.nombre;
    teamB.textContent = e.equipoB.nombre;

    elems["f" + ronda].appendChild(teamA);
    elems["f" + ronda].appendChild(teamB);
  });
}

function nuevoPartido() {
  partidos = [];
  equiposRestantes = _.shuffle(equipos);
  equiposRestantes = equiposRestantes.filter(function (e) {
    //Solo guarda los equipos que no estén derrotados.
    if (e.derrotado === false) return true;
  });
  decidirPartidos(); //En cada ronda, empareja los equipos y decide el resultado del enfrentamiento.
  setResultados(ronda);
  ronda++;
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
