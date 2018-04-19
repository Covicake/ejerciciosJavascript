let elems = {
  boton: document.querySelector(".boton"),
  partido: document.querySelector(".partido")
}

elems.boton.onclick = nuevoPartido;

/*let partidos =[
  {equipoA: "", equipoB: "", resultado = []}, //Resultado ["1", "5"] (Goles equipoA, Goles equipoB).
  {equipoA: "", equipoB: "", resultado = []},
  {equipoA: "", equipoB: "", resultado = []},
  {equipoA: "", equipoB: "", resultado = []},
  {equipoA: "", equipoB: "", resultado = []}
]; */

let equipos = [
  {nombre: "Alaves", goles = ""},
  {nombre: "Athletic Bilbao", goles = ""},
  {nombre: "Athletico Madrid", goles = ""},
  {nombre: "Barcelona", goles = ""},
  {nombre: "Celta de Vigo", goles = ""},
  {nombre: "Deportivo La Coruña", goles = ""},
  {nombre: "Eibar", goles = ""},
  {nombre: "Espanyol", goles = ""},
  {nombre: "Getafe", goles = ""},
  {nombre: "Girona", goles = ""}
];

let equiposRestantes;
let posiblesResultados;

function decidirPartidos(){

  for(let i in _.range(0, (equipos.length/2)+1)){
    partidos.push({equipoA: elegirEquipo(), equipoB: elegirEquipo(), resultado = decidirGanador(equipoA, equipoB)});
  }
}

function elegirEquipo(){
   let equipo = equiposRestantes.shift();
   return equipo;
}

function decidirGanador(equipoA, equipoB){
  let ind = Math.floor(Math.random()*posiblesResultados.length);
  let ind2 = Math.floor(Math.random()*posiblesResultados.length);

  equipoA.goles = posiblesResultados[ind];
  equipoB.goles = posiblesResultados[ind2];

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

function nuevoPartido(){
  equiposRestantes = _.shuffle(equipos);
  decidirPartidos();
  generarProbabilidades()
  decidirGanador();
  elems.partido.textContent = `${equipoA.nombre} ${equipoA.goles} - ${equipoB.nombre}-${equipoB.goles}`
}



function generarProbabilidades(){
  let ceros = _.fill(Array(7), 0);
  let unos = _.fill(Array(6), 1);
  let dos = _.fill(Array(5), 2);
  let tres = _.fill(Array(4), 3);
  posiblesResultados = _.concat(ceros, unos, dos, tres);
  posiblesResultados = _.concat(posiblesResultados, [4, 5, 6, 7, 8, 9]);
  posiblesResultados = _.shuffle(posiblesResultados);
}
