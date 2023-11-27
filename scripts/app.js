// Créez une nouvelle balise link
var linkElement1 = document.createElement("link");
// Définissez les attributs de la balise link1
linkElement1.rel = "preconnect";
linkElement1.href = "https://fonts.googleapis.com";
// Créez une nouvelle balise link2
var linkElement2 = document.createElement("link");
// Définissez les attributs de la balise link2
linkElement2.rel = "preconnect";
linkElement2.href = "https://fonts.gstatic.com";
linkElement2.crossOrigin = "crossorigin";
// Créez une nouvelle balise link3
var linkElement3 = document.createElement("link");
// Définissez les attributs de la balise link3
linkElement3.rel = "stylesheet";
linkElement3.href =
  "https://fonts.googleapis.com/css2?family=Vina+Sans&display=swap";

// Ajoutez la balise link à l'en-tête (head) du document
document.head.appendChild(linkElement1);
document.head.appendChild(linkElement2);
document.head.appendChild(linkElement3);

element = document.querySelector("h1");
element.style.fontFamily = "Vina sans";
