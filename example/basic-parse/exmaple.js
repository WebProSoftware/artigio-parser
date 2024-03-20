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
  keyPrefix: "rad-st84-rover-space-",
  assetsPath: "C:\\test\\"
});
const defaultLanguage = artigio.getDefaultLanguage().value;

const languages = artigio.getLanguageList();
const screens = artigio.getScreens();

// const appScreenDataCurrentLang = artigio.getScreenDataByCurrentLang("app", true);
// console.log(appScreenDataCurrentLang);


console.log(artigio.getNameScreens())
const appScreenDataAllLang = artigio.getAllLangScreenData("intro", true);
console.log(appScreenDataAllLang);
// console.log(appScreenDataAllLang["en"])
// console.log(appScreenDataAllLang["pl"])

const translationsAllLang = artigio.getAllLangTranslations();
console.log(translationsAllLang)

const translationByKey = artigio.getAllLangTranslationByKey("rover-space");
console.log(translationByKey);

// console.log(artigio.getPopups());
// const popupData = artigio.getAllLangPopupData("terms-and-conditions", true);
// console.log(popupData["pl"]);




