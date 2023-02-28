const fs = require("fs");
const { ArtigioParser } = require("artigio-cms-parser");

const getJsonFile = () => {
  const data = fs.readFileSync(`./presentation.json`);
  return JSON.parse(data);
}

//get data
const presentationJson = getJsonFile();

const artigio = new ArtigioParser({
  dataJson: presentationJson,
  keyPrefix: "kpn-st14-app02-"
});
const defaultLanguage = artigio.getDefaultLanguage().value;

const languages = artigio.getLanguageList();
const screens = artigio.getScreens();

const appScreenDataCurrentLang = artigio.getScreenDataByCurrentLang("app", true);

const appScreenDataAllLang = artigio.getAllLangScreenData("app", true);



