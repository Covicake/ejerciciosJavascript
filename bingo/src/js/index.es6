//--------Globales-----------

let elems = {
  cartones: document.querySelectorAll(".carton .numeros"),
  bola_bingo: document.querySelector(".bola"),
  centro: document.querySelector(".centro"),
  boton: document.querySelector(".boton")
};

let numeros;
let carton = {cpu: [], jugador: []};


//----------Funciones--------------
function sacarNumero(){
  let numeroBola = numeros.shift(); //Elimina y saca el primer numero.
  elems.bola_bingo.textContent = String(numeroBola);
  comprobarNumero(numeroBola);
  comprobarLinea("cpu");
  comprobarLinea("jugador");

  comprobarGanador();
}

function comprobarLinea(player){

  let linea = carton.cpu.slice(0, 5);

  let contador = [0, 0, 0];

  for(let i in linea){
    let l1 = i;
    let l2 = Number(i) + 5;
    let l3 = Number(i) + 10;
    let numeroLinea1 = document.querySelector(`.${player} .n${l1}`);
    let numeroLinea2 = document.querySelector(`.${player} .n${l2}`);
    let numeroLinea3 = document.querySelector(`.${player} .n${l3}`);

    if(numeroLinea1 != undefined && numeroLinea1.classList.contains("tachado")){
      console.log(player, i);
      contador[0]++;
    }
    if(numeroLinea2 != undefined && numeroLinea2.classList.contains("tachado")){
      console.log(player, i);
      contador[1]++;
    }
    if(numeroLinea3 != undefined && numeroLinea3.classList.contains("tachado")){
      console.log(player, i);
      contador[2]++;
    }
  }

  if(contador[0] == 5 || contador[1] == 5 || contador[2] == 5){
    ganador(player);
  }
}

function comprobarNumero(numeroBola){
  if(carton.cpu.includes(numeroBola) || carton.jugador.includes(numeroBola)){
    let indiceCpu = carton.cpu.indexOf(numeroBola);
    let indiceJug = carton.jugador.indexOf(numeroBola);

    let numeroTacharCpu = document.querySelector(`.cpu .n${indiceCpu}`);
    let numeroTacharJug = document.querySelector(`.jugador .n${indiceJug}`);

    if(numeroTacharCpu != undefined){
      numeroTacharCpu.classList.add("tachado");
    }
    if(numeroTacharJug != undefined){
      numeroTacharJug.classList.add("tachado");
    }
  }
}

function comprobarGanador(){
  let contador = 0;
  carton.cpu.forEach(function(e, i){
    let numeroCpu = document.querySelector(`.cpu .n${i}`);
    if(numeroCpu.classList.contains("tachado")){
      contador++;
    }
  });
  if (contador==15){
    ganador("CPU");
  }else{
    contador = 0;
    carton.jugador.forEach(function(e, i){
      let numeroJugador = document.querySelector(`.jugador .n${i}`);
      if(numeroJugador.classList.contains("tachado")){
        contador++;
      }
    });
    if (contador==15){
      ganador("Jugador");
  }
  }
}

function ganador(ganador){
  let div = document.createElement("div");
  div.classList.add("textoCarton");
  div.textContent = `Gana ${ganador}`;
  elems.centro.appendChild(div);
  elems.boton.setAttribute("onclick", "nuevaPartida()");
  elems.boton.textContent = "Reiniciar";
}

function nuevoCarton(){
  let numeros_carton = _.shuffle(numeros).slice(0,15);
  return numeros_carton;
}

function mostrarCartones(){

    let textoGanador = document.querySelector(".centro .textoCarton");
    textoGanador.remove();

    elems.cartones[0].innerHTML = "";
    elems.cartones[1].innerHTML = "";

    elems.boton.setAttribute("onclick", "sacarNumero()");
    elems.boton.textContent = "Sacar numero";

    for(let i in _.range(1, 16)){
      let numeroJ = document.createElement("div");
      let numeroC = document.createElement("div");

      numeroJ.className = `numero n${i}`;
      numeroC.className = `numero n${i}`;

      numeroJ.textContent = carton.jugador[i];
      numeroC.textContent = carton.cpu[i];

      elems.cartones[0].appendChild(numeroJ);
      elems.cartones[1].appendChild(numeroC);
    }
}
function nuevaPartida(){
  numeros = _.shuffle(_.range(1, 91));
  carton.cpu = nuevoCarton();
  carton.jugador = nuevoCarton();

  mostrarCartones();
}

nuevaPartida();
