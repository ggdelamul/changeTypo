console.log("popup.js");
let police;
let htmlElement;
const btn = document.querySelector("button");
const getHtmlElementValue = () => {
  let selectHtmlElement = document.querySelector("#choixTag");
  let selectedHtmlElement = selectHtmlElement.value;
  return selectedHtmlElement;
};
const getTypoValue = () => {
  let selectPolice = document.querySelector("#choixPolice");
  let selectedPolice = selectPolice.value;
  return selectedPolice;
};
const sendMessage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      font: police,
      tag: htmlElement,
    });
  });
};
btn.addEventListener("click", () => {
  police = getTypoValue();
  htmlElement = getHtmlElementValue();
  sendMessage();
  console.log(police + "police");
  console.log(htmlElement + "tag");
});
