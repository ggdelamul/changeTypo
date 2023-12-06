console.log("popup.js");
const btn = document.querySelector("button");
//1 créer toute les variables
let police1;
let htmlElement1;
let police2;
let htmlElement2;
let weight1;
let weight2;
let error = document.querySelector(".error");
//2 Ajout de la méthode permettant de récupérer la graisse de police
const getWeightValue = (selecteur) => {
  let weightSelectElement = document.querySelector(selecteur);
  let selectedWeight = weightSelectElement.value;
  return selectedWeight;
};
const getHtmlElementValue = (selecteur) => {
  let selectHtmlElement = document.querySelector(selecteur);
  let selectedHtmlElement = selectHtmlElement.value;
  return selectedHtmlElement;
};
const getTypoValue = (police) => {
  let selectPolice = document.querySelector(police);
  let selectedPolice = selectPolice.value;
  return selectedPolice;
};
//5 passer le message
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
//4 recupérer les valeurs
btn.addEventListener("click", () => {
  police1 = getTypoValue("#choixPolice");
  htmlElement1 = getHtmlElementValue("#choixTag");
  police2 = getTypoValue("#SecondchoixPolice");
  htmlElement2 = getHtmlElementValue("#SecondchoixTag");
  //recup de l'éléments graisse
  weight1 = getWeightValue("#choixWeight");
  console.log(typeof weight1 + "ici");

  if (htmlElement1 == htmlElement2) {
    console.log("les 2 tags html sont identiques");
    error.style.display = "block";
  } else {
    console.log("envoi le message à la page");
    error.style.display = "none";
    // sendMessage();
  }
  chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    console.log(message);
  });
});
