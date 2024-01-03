import {
  getWeightValue,
  getHtmlElementValue,
  getTypoValue,
} from "./modules/fonctionsPopup.js";
import { Configuration } from "./modules/class.js";
// variables
let a = 5;
let b = 2;
a = a + b;
b = a - b;
a = a - b;
console.log(a, b);
const btn = document.querySelector("button");
let police1;
let htmlElement1;
let police2;
let htmlElement2;
let weight1;
let weight2;
const errorContainer = document.querySelector(".error-container");
const error1 = document.querySelector(".error1");
const error2 = document.querySelector(".error2");

// passer le message au scripts de la page courante
const sendMessage = (objet1, objet2) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      config1: objet1,
      config2: objet2,
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
  if (htmlElement1 == htmlElement2) {
    console.log("les 2 tags html sont identiques");
    if (error1.textContent == "") {
      error1.textContent =
        "Vous avez sélectionner 2 fois le même tag HTML , merci de modifier votre sélection";
    }
    errorContainer.style.display = "block";
  } else {
    errorContainer.style.display = "none";
    //construction de la configuration
    let configuration1 = new Configuration(police1, htmlElement1, weight1);
    let configuration2 = new Configuration(police2, htmlElement2, weight2);
    configuration1.makeUrl();
    configuration2.makeUrl();
    async function testerEtModifierURL(url, config) {
      try {
        const response = await fetch(url);
        // Vérifier le statut de la réponse
        if (response.ok) {
          console.log("L'URL a été chargée avec succès.");
          let letNewConfig = [url, config.weight];
          return letNewConfig; // Retourne l'URL d'origine si le statut est OK
        } else {
          console.error(
            `Échec du chargement de l\'URL ${url}. Statut de la réponse : ${response.status}`
          );
          //Ajout de l'affichage d'erreur
        }
      } catch (e) {
        console.error(`Erreur lors de la requête pour l\'URL ${url} :`, e);
      }
      // Si la requête échoue, modifiez l'URL et retournez la nouvelle URL
      console.log("Modification de l'URL suite à un échec de la requête.");
      error.textContent = `Graisse de police ${config.typo} indisponible graisse par defaut regular`;
      error.style.display = "block";
      const modifiedUrl =
        "https://fonts.googleapis.com/css2?family=" +
        config.typo +
        ":wght@" +
        400 +
        "&display=swap"; // Modifiez cette ligne selon vos besoins
      ///////////////dernier ajout //////////////////////////////
      ///////////////////////////////////////////////////////////

      const modifiedWeight = 400;
      let letNewConfig = [modifiedUrl, modifiedWeight];
      return letNewConfig;
      //////////////        !!!!!!!!!!!!!!!!!     modif du return a la place de return modifiedUrl    ///////////
    }
    async function testerEtMettreAJourAllURL(config, config2) {
      // Appel de la fonction testerEtModifierURL avec await pour récupérer le résultat
      const resultat = await testerEtModifierURL(config.url, config);
      const resultat2 = await testerEtModifierURL(config2.url, config2);
      // reucpération des tableaux
      console.log(resultat, "1er tableau");
      // console.log(resultat2, "2er tableau");
      // Mettre à jour la propriété url de l'objet config avec la nouvelle URL
      config.url = resultat[0];
      config.weight = resultat[1];
      config2.url = resultat2[0];
      config2.weight = resultat2[1];
      // Utiliser ou afficher l'objet config avec la nouvelle URL
      console.log("Objet config avec la nouvelle URL :", config);
      // console.log("Objet config avec la nouvelle URL :", config2);
    }
    // Appel de la fonction asynchrone en passant l'objet config1 en paramètre
    testerEtMettreAJourAllURL(configuration1, configuration2)
      .then(() => {
        return configuration1, configuration2;
      })
      .then(() => {
        console.log(configuration1.url, "url1 valide et modifier ");
        console.log(configuration2.url, "url2 valide et modifie");
        sendMessage(configuration1, configuration2);
      });
    chrome.runtime.onMessage.addListener((message) => {
      console.log(message);
    });
  }
});
