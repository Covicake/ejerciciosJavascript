let arrayHistorial = [];
let contadores =[];

let elemHistorial = document.getElementById("historial");
let elemResultado = document.getElementById("Resultado");

let elemUno = document.getElementById("uno");
let elemDos = document.getElementById("dos");
let elemTres = document.getElementById("tres");
let elemCuatro = document.getElementById("cuatro");
let elemCinco = document.getElementById("cinco");
let elemSeis = document.getElementById("seis");


function tirarDados() {
  let tirada = Math.floor(Math.random() * 6) + 1;
  construirDado(tirada);
  addHistorial(tirada);
  calcularEstadistica();
}

function addHistorial(tirada) {
  elemHistorial.innerHTML = "";
  let historialMostrado = [];

  arrayHistorial.unshift(tirada); //Añadimos nuevo elemento al principio

  for(let i=0; i<12; i++){
    historialMostrado.push(arrayHistorial[i])  //Guardamos los primeros 11 para enseñarlos en pantalla.
  }

  for(let i=0; i<historialMostrado.length; i++){
    if(historialMostrado[i]){
      elemHistorial.innerHTML += historialMostrado[i]+"<br>";  //Enseñamos los primeros 11.
    }
  }
}


function calcularEstadistica(){
  for (let i = 0; i<6; i++){
    contadores[i] = 0;
  }

  for (let i=0; i<arrayHistorial.length; i++){
    let indice = arrayHistorial[i]-1;
    contadores[indice] += 1;
  }

  for(let i=0; i<contadores.length; i++){
    console.log(i);
    updateEstadistica(i);
  }
}

function updateEstadistica(item){
    let porcentaje = calcularPorcentaje(contadores[item]);
    let items = "item"+ Number(item+1);
    let elemEstadistica = document.getElementById(items);
    elemEstadistica.textContent = Number(item+1)+": "+porcentaje+"%";
}

function calcularPorcentaje(valor){
  let porcentaje = (valor / arrayHistorial.length) * 100;
   porcentaje = porcentaje*100;
   porcentaje = Math.floor(porcentaje);
   porcentaje = porcentaje/100;
  return porcentaje;
}


function construirDado(tirada) {
  elemUno.style.display = "none";
  elemDos.style.display = "none";
  elemTres.style.display = "none";
  elemCuatro.style.display = "none";
  elemCinco.style.display = "none";
  elemSeis.style.display = "none";
  switch (tirada) {
    case 1:
      elemUno.style.display = "flex";
      break;
    case 2:
      elemDos.style.display = "flex";
      break;
    case 3:
      elemTres.style.display = "flex";
      break;
    case 4:
      elemCuatro.style.display = "flex";
      break;
    case 5:
      elemCinco.style.display = "flex" ;
      break;
    default:
      elemSeis.style.display = "flex";
      break;
  }
}
