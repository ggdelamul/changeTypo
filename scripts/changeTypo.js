console.log("changeTypo.js");

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
chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
  let data = message;
  console.log(data);
  let typo = data.font;
  let searchPlus = "+";
  let hasAplus = typo.indexOf(searchPlus);
  if (hasAplus != -1) {
    console.log(typo + " a un plus");
    typo = typo.replaceAll("+", " ");
    console.log(typo + "apres replace()");
  } else {
    console.log(typo + " n'en a pas");
  }
  let tag = data.tag;
  console.log(typo, tag);
  changeTypo(typo, tag);
});
