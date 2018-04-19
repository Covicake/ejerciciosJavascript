let elems = {
  boton: document.querySelector(".boton"),
  partido: document.querySelector(".partido")
}

elems.boton.onclick = nuevoPartido;

let equipos = ["Alaves", "Athletic Bilbao", "Athletico Madrid", "Barcelona", "Celta de Vigo", "Deportivo La Coruña", "Eibar", "Espanyol", "Getafe", "Girona"];
let equiposRestantes;
let posiblesResultados;

let equipoA = {
  nombre: "",
  goles: ""
}

let equipoB = {
  nombre: "",
  goles: ""
}

let resultado;

function generarProbabilidades(){
  let ceros = _.fill(Array(7), 0);
  let unos = _.fill(Array(6), 1);
  let dos = _.fill(Array(5), 2);
  let tres = _.fill(Array(4), 3);
  posiblesResultados = _.concat(ceros, unos, dos, tres);
  posiblesResultados = _.concat(posiblesResultados, [4, 5, 6, 7, 8, 9]);
  posiblesResultados = _.shuffle(posiblesResultados);
}

function elegirEquipo(){
   let equipo = equiposRestantes.shift();
   return equipo;
}

function decidirGanador(){
  //let ganador = Math.round(Math.random());  //0 o 1
  //decidirGoles(ganador);
  decidirGoles();
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

function decidirGoles(ganador){
  let ind = Math.floor(Math.random()*posiblesResultados.length);
  let ind2 = Math.floor(Math.random()*posiblesResultados.length);

  equipoA.goles = posiblesResultados[ind];
  equipoB.goles = posiblesResultados[ind2];
}

function nuevoPartido(){
  equiposRestantes = _.shuffle(equipos);
  equipoA.nombre = elegirEquipo();
  equipoB.nombre = elegirEquipo();
  generarProbabilidades()
  decidirGanador();
  elems.partido.textContent = `${equipoA.nombre} ${equipoA.goles} - ${equipoB.nombre}-${equipoB.goles}`
}
