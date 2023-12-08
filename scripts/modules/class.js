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
  makeUrl() {
    const debutUrl = "https://fonts.googleapis.com/css2?family=";
    const finUrl = "&display=swap";
    this.url = debutUrl + this.typo + ":wght@" + this.weight + finUrl;
    return this.url;
  }
}
