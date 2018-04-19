"use strict";

var arrayHistorial = [];
var contadores = [];

var elemHistorial = document.getElementById("historial");
var elemResultado = document.getElementById("Resultado");

var elemUno = document.getElementById("uno");
var elemDos = document.getElementById("dos");
var elemTres = document.getElementById("tres");
var elemCuatro = document.getElementById("cuatro");
var elemCinco = document.getElementById("cinco");
var elemSeis = document.getElementById("seis");

function tirarDados() {
  var tirada = Math.floor(Math.random() * 6) + 1;
  construirDado(tirada);
  addHistorial(tirada);
  calcularEstadistica();
}

function addHistorial(tirada) {
  elemHistorial.innerHTML = "";
  var historialMostrado = [];

  arrayHistorial.unshift(tirada); //Añadimos nuevo elemento al principio

  for (var i = 0; i < 12; i++) {
    historialMostrado.push(arrayHistorial[i]); //Guardamos los primeros 11 para enseñarlos en pantalla.
  }

  for (var _i = 0; _i < historialMostrado.length; _i++) {
    if (historialMostrado[_i]) {
      elemHistorial.innerHTML += historialMostrado[_i] + "<br>"; //Enseñamos los primeros 11.
    }
  }
}

function calcularEstadistica() {
  for (var i = 0; i < 6; i++) {
    contadores[i] = 0;
  }

  for (var _i2 = 0; _i2 < arrayHistorial.length; _i2++) {
    var indice = arrayHistorial[_i2] - 1;
    contadores[indice] += 1;
  }

  for (var _i3 = 0; _i3 < contadores.length; _i3++) {
    console.log(_i3);
    updateEstadistica(_i3);
  }
}

function updateEstadistica(item) {
  var porcentaje = calcularPorcentaje(contadores[item]);
  var items = "item" + Number(item + 1);
  var elemEstadistica = document.getElementById(items);
  elemEstadistica.textContent = Number(item + 1) + ": " + porcentaje + "%";
}

function calcularPorcentaje(valor) {
  var porcentaje = valor / arrayHistorial.length * 100;
  porcentaje = porcentaje * 100;
  porcentaje = Math.floor(porcentaje);
  porcentaje = porcentaje / 100;
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
      elemCinco.style.display = "flex";
      break;
    default:
      elemSeis.style.display = "flex";
      break;
  }
}
