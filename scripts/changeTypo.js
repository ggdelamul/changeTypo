console.log("changeTypo.js");
let data;
const changeTypo = (config) => {
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
  linkElement3.href = `https://fonts.googleapis.com/css2?family=${config.typo}&display=swap`;
  document.head.appendChild(linkElement1);
  document.head.appendChild(linkElement2);
  document.head.appendChild(linkElement3);
  let tagHtml = document.querySelectorAll(config.tag);
  for (let i = 0; i < tagHtml.length; i++) {
    tagHtml[i].style.fontFamily = config.typo;
  }
};
chrome.runtime.onMessage.addListener((message) => {
  let data = message;
  console.log(data);
  if (typeof data == "object") {
    console.log("j'ai bien mon message");
    chrome.runtime.sendMessage({
      message: "Bien reçu Bien reçu",
    });
  } else {
    console.log("erreur dans l'envoi du message");
  }
  const { config1, config2 } = data;
  changeTypo(config1);
  changeTypo(config2);
});
