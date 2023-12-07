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
  //construction de la configuration
  let config1 = new Configuration(police1, htmlElement1, weight1);
  let config2 = new Configuration(police2, htmlElement2, weight2);
  config1.makeUrl();
  async function testerEtModifierURL(url, config) {
    try {
      const response = await fetch(url);
      // Vérifier le statut de la réponse
      if (response.ok) {
        console.log("L'URL a été chargée avec succès.");
        return url; // Retourne l'URL d'origine si le statut est OK
      } else {
        console.error(
          `Échec du chargement de l\'URL ${url}. Statut de la réponse : ${response.status}`
        );
      }
    } catch (e) {
      console.error(`Erreur lors de la requête pour l\'URL ${url} :`, e);
    }
    // Si la requête échoue, modifiez l'URL et retournez la nouvelle URL
    console.log("Modification de l'URL suite à un échec de la requête.");
    const modifiedUrl =
      "https://fonts.googleapis.com/css2?family=" +
      config.typo +
      ":wght@" +
      400 +
      "&display=swap"; // Modifiez cette ligne selon vos besoins
    return modifiedUrl;
  }

  async function testerEtMettreAJourURL(config) {
    // Appel de la fonction testerEtModifierURL avec await pour récupérer le résultat
    const resultat = await testerEtModifierURL(config.url, config);
    // Mettre à jour la propriété url de l'objet config avec la nouvelle URL
    config.url = resultat;
    // Utiliser ou afficher l'objet config avec la nouvelle URL
    console.log("Objet config avec la nouvelle URL :", config);
  }
  // Appel de la fonction asynchrone en passant l'objet config1 en paramètre
  testerEtMettreAJourURL(config1).then(() => {
    console.log(config1.url, "👍");
    if (htmlElement1 == htmlElement2) {
      console.log("les 2 tags html sont identiques");
      error.style.display = "block";
    } else {
      // console.log("envoi le message à la page");
      error.style.display = "none";
      // sendMessage(config1, config2);
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
  });
});
