export class Configuration {
  typo;
  tag;
  weight;
  url;
  constructor(typo, tag, weight) {
    this.typo = typo;
    this.tag = tag;
    this.weight = weight;
  }
  removeAplus() {
    let searchPlus = "+";
    let hasAplus = this.typo.indexOf(searchPlus);
    if (hasAplus != 1) {
      this.typo = this.typo.replace("+", " ");
    }
    return this.typo;
  }
  makeUrl() {
    const debutUrl = "https://fonts.googleapis.com/css2?family=";
    const finUrl = "&display=swap";
    this.url = debutUrl + this.typo + ":wght@" + this.weight + finUrl;
    return this.url;
  }
}
