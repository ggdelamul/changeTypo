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

export { getWeightValue, getHtmlElementValue, getTypoValue };
