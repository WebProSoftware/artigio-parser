const fs = require("fs");
const { ArtigioParser } = require("../../lib");

const getJsonFile = () => {
  const data = fs.readFileSync(`./presentation.json`);
  return JSON.parse(data);
}

//get data
const presentationJson = getJsonFile();

const artigio = new ArtigioParser({
  dataJson: presentationJson,
  keyPrefix: "baj-interactive-fun-",
  assetsPath: "C:\\test\\"
});
const defaultLanguage = artigio.getDefaultLanguage().value;

const languages = artigio.getLanguageList();
const screens = artigio.getScreens();

// const appScreenDataCurrentLang = artigio.getScreenDataByCurrentLang("app", true);
// console.log(appScreenDataCurrentLang);


console.log(artigio.getNameScreens())
const appScreenDataAllLang = artigio.getAllLangScreenData("gamification", true);
console.log(appScreenDataAllLang["en"])
// console.log(appScreenDataAllLang["pl"])

console.log(artigio.getPopups());
const popupData = artigio.getAllLangPopupData("terms-and-conditions", true);
// console.log(popupData["pl"]);




