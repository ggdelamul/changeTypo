console.log("changeTypo.js");
let data;
const changeTypo = (police, tag) => {
  // Créez une nouvelle balise link
  let linkElement1 = document.createElement("link");
  linkElement1.rel = "preconnect";
  linkElement1.href = "https://fonts.googleapis.com";
  let linkElement2 = document.createElement("link");
  linkElement2.rel = "preconnect";
  linkElement2.href = "https://fonts.gstatic.com";
  linkElement2.crossOrigin = "crossorigin";
  let linkElement3 = document.createElement("link");
  linkElement3.rel = "stylesheet";
  linkElement3.href =
    /*"https://fonts.googleapis.com/css2?family=Vina+Sans&display=swap";*/
    `https://fonts.googleapis.com/css2?family=${police}&display=swap`;
  document.head.appendChild(linkElement1);
  document.head.appendChild(linkElement2);
  document.head.appendChild(linkElement3);
  let tagHtml = document.querySelectorAll(tag);
  for (let i = 0; i < tagHtml.length; i++) {
    tagHtml[i].style.fontFamily = police;
  }
};
/* creation d'une fonction permettant d'itérer sur l'obejt reçu, appliquer le traitement de retrait du plus le cas échéant et retourner l'objet */
const removeAplus = (objet) => {
  let searchPlus = "+";
  for (let value in objet) {
    if (objet.hasOwnProperty(value)) {
      // console.log(value + ": " + objet[value]);
      let hasAplus = objet[value].indexOf(searchPlus);
      if (hasAplus != -1) {
        console.log(objet[value] + " a un plus");
        objet[value] = objet[value].replaceAll("+", " ");
        console.log(objet[value] + "apres replace()");
      } else {
        console.log(objet[value] + " n'en a pas");
      }
    }
  }
  return objet;
};

chrome.runtime.onMessage.addListener((message) => {
  let data = message;
  console.log(typeof data);
  if (typeof data == "object") {
    console.log("j'ai bien mon message");
    chrome.runtime.sendMessage({
      message: "Bien reçu Bien reçu",
    });
  } else {
    console.log("erreur dans l'envoi du message");
  }
  let newData = removeAplus(data);
  const { font1, font2, tag1, tag2 } = newData;
  changeTypo(font1, tag1);
  changeTypo(font2, tag2);
});
