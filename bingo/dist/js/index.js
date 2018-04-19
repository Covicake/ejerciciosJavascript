"use strict";

//--------Globales-----------

var elems = {
  cartones: document.querySelectorAll(".carton .numeros"),
  bola_bingo: document.querySelector(".bola"),
  centro: document.querySelector(".centro"),
  boton: document.querySelector(".boton")
};

var numeros = void 0;
var carton = { cpu: [], jugador: [] };

//----------Funciones--------------
function sacarNumero() {
  var numeroBola = numeros.shift(); //Elimina y saca el primer numero.
  elems.bola_bingo.textContent = String(numeroBola);
  comprobarNumero(numeroBola);
  comprobarLinea("cpu");
  comprobarLinea("jugador");

  comprobarGanador();
}

function comprobarLinea(player) {

  var linea = carton.cpu.slice(0, 5);

  var contador = [0, 0, 0];

  for (var i in linea) {
    var l1 = i;
    var l2 = Number(i) + 5;
    var l3 = Number(i) + 10;
    var numeroLinea1 = document.querySelector("." + player + " .n" + l1);
    var numeroLinea2 = document.querySelector("." + player + " .n" + l2);
    var numeroLinea3 = document.querySelector("." + player + " .n" + l3);

    if (numeroLinea1 != undefined && numeroLinea1.classList.contains("tachado")) {
      console.log(player, i);
      contador[0]++;
    }
    if (numeroLinea2 != undefined && numeroLinea2.classList.contains("tachado")) {
      console.log(player, i);
      contador[1]++;
    }
    if (numeroLinea3 != undefined && numeroLinea3.classList.contains("tachado")) {
      console.log(player, i);
      contador[2]++;
    }
  }

  if (contador[0] == 5 || contador[1] == 5 || contador[2] == 5) {
    ganador(player);
  }
}

function comprobarNumero(numeroBola) {
  if (carton.cpu.includes(numeroBola) || carton.jugador.includes(numeroBola)) {
    var indiceCpu = carton.cpu.indexOf(numeroBola);
    var indiceJug = carton.jugador.indexOf(numeroBola);

    var numeroTacharCpu = document.querySelector(".cpu .n" + indiceCpu);
    var numeroTacharJug = document.querySelector(".jugador .n" + indiceJug);

    if (numeroTacharCpu != undefined) {
      numeroTacharCpu.classList.add("tachado");
    }
    if (numeroTacharJug != undefined) {
      numeroTacharJug.classList.add("tachado");
    }
  }
}

function comprobarGanador() {
  var contador = 0;
  carton.cpu.forEach(function (e, i) {
    var numeroCpu = document.querySelector(".cpu .n" + i);
    if (numeroCpu.classList.contains("tachado")) {
      contador++;
    }
  });
  if (contador == 15) {
    ganador("CPU");
  } else {
    contador = 0;
    carton.jugador.forEach(function (e, i) {
      var numeroJugador = document.querySelector(".jugador .n" + i);
      if (numeroJugador.classList.contains("tachado")) {
        contador++;
      }
    });
    if (contador == 15) {
      ganador("Jugador");
    }
  }
}

function ganador(ganador) {
  var div = document.createElement("div");
  div.classList.add("textoCarton");
  div.textContent = "Gana " + ganador;
  elems.centro.appendChild(div);
  elems.boton.setAttribute("onclick", "nuevaPartida()");
  elems.boton.textContent = "Reiniciar";
}

function nuevoCarton() {
  var numeros_carton = _.shuffle(numeros).slice(0, 15);
  return numeros_carton;
}

function mostrarCartones() {

  var textoGanador = document.querySelector(".centro .textoCarton");
  textoGanador.remove();

  elems.cartones[0].innerHTML = "";
  elems.cartones[1].innerHTML = "";

  elems.boton.setAttribute("onclick", "sacarNumero()");
  elems.boton.textContent = "Sacar numero";

  for (var i in _.range(1, 16)) {
    var numeroJ = document.createElement("div");
    var numeroC = document.createElement("div");

    numeroJ.className = "numero n" + i;
    numeroC.className = "numero n" + i;

    numeroJ.textContent = carton.jugador[i];
    numeroC.textContent = carton.cpu[i];

    elems.cartones[0].appendChild(numeroJ);
    elems.cartones[1].appendChild(numeroC);
  }
}
function nuevaPartida() {
  numeros = _.shuffle(_.range(1, 91));
  carton.cpu = nuevoCarton();
  carton.jugador = nuevoCarton();

  mostrarCartones();
}

nuevaPartida();
