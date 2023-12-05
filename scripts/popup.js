console.log("popup.js");
const btn = document.querySelector("button");
//1 créer toute les variables
let police1;
let htmlElement1;
let police2;
let htmlElement2;
let error = document.querySelector(".error");
//2 modifier les methodes ajout de parametre get HtmlElementValue getTypoValue
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
  //creer le logique pour éviter le doublon de tag html
  if (htmlElement1 == htmlElement2) {
    console.log("les 2 tags html sont identiques");
    error.style.display = "block";
  } else {
    console.log("envoi le message à la page");
    error.style.display = "none";
    sendMessage();
  }
  // console.log(police1 + "police1");
  // console.log(htmlElement1 + "tag1");
  // console.log(police2 + "police2");
  // console.log(htmlElement2 + "tag2");
});
