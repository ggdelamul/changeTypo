import {
  getWeightValue,
  getHtmlElementValue,
  getTypoValue,
} from "./modules/fonctionsPopup.js";
import { Configuration } from "./modules/class.js";
// variables
const btn = document.querySelector("button");
let police1;
let htmlElement1;
let police2;
let htmlElement2;
let weight1;
let weight2;
let error = document.querySelector(".error");
// passer le message au scripts de la page courante
const sendMessage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      font1: police1,
      tag1: htmlElement1,
      font2: police2,
      tag2: htmlElement2,
    });
  });
};
//recupérer les valeurs
btn.addEventListener("click", () => {
  police1 = getTypoValue("#choixPolice");
  htmlElement1 = getHtmlElementValue("#choixTag");
  police2 = getTypoValue("#SecondchoixPolice");
  htmlElement2 = getHtmlElementValue("#SecondchoixTag");
  //recup de l'éléments graisse1
  weight1 = getWeightValue("#choixWeight");
  weight1 = parseInt(weight1);
  //recup de l'éléments graisse2
  weight2 = getWeightValue("#choixWeight2");
  weight2 = parseInt(weight2);
  let config1 = new Configuration(police1, htmlElement1, weight1);
  let config2 = new Configuration(police2, htmlElement2, weight2);
  console.log(config1);
  console.log(config2);

  if (htmlElement1 == htmlElement2) {
    console.log("les 2 tags html sont identiques");
    error.style.display = "block";
  } else {
    console.log("envoi le message à la page");
    error.style.display = "none";
    //sendMessage();
  }
  chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
  });
});
