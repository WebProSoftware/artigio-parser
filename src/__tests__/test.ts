import { ArtigioParser, Language } from '../../lib';
const fs = require('fs');
const getJsonFile = () => {
  const data = fs.readFileSync('./example/basic-parse/presentation.json');
  return JSON.parse(data);
};

const parser = new ArtigioParser({
  dataJson: getJsonFile(),
  keyPrefix: 'rad-st84-rover-space-',
  assetsPath: 'C:\\tata\\',
});

test('Change language GOOD', () => {
  expect(parser.changeLanguage('pl')).toBe(true);
});

test('Change Language BAD', () => {
  expect(parser.changeLanguage('sss')).toBe(false);
});

test('Get Data By Default Language', () => {
  expect(parser.getScreenDataByCurrentLang('intro', true)).toBeInstanceOf(Object);
});

test('Get lanugage list', () => {
  expect(parser.getLanguageList()).toBeInstanceOf(Array<Language>);
});

test('Get Data By Bad Language', () => {
  try {
    parser.getScreenDataByLang('app', 'es', true);
    expect(true).toBe(false);
  } catch (error: any) {
    expect(error.message).toBe('Lang es is not defined on Artigio');
  }
});

test('Get bad screen data', () => {
  try {
    parser.getScreenDataByLang('dsadas', 'pl');
    expect(true).toBe(false);
  } catch (error: any) {
    expect(error.message).toBe('screen-is-not-found');
  }
});

// test('Get GlobalPopup Data Done', () => {
//   expect(parser.getAllLangPopupData('terms-and-conditions', true)).toBeInstanceOf(Object);
// });

test('Get all translation items', () => {
  try {
    expect(parser.getAllLangTranslations());
  } catch (error: any) {
    expect(error.message).toBe('screen-is-not-found');
  }
});

test('Get single translation item', () => {
  const translateKey = 'rover-space';
  try {
    expect(parser.getAllLangTranslationByKey(translateKey));
  } catch (error: any) {
    expect(error.message).toBe('screen-is-not-found');
  }
});

test('Get exception single translation item ', () => {
  const translateKey = 'rover-spacedeeee';
  try {
    parser.getAllLangTranslationByKey(translateKey);
    expect(true).toBe(false);
  } catch (error: any) {
    expect(error.message).toBe(`The translation key ${translateKey} is not ubn the json file`);
  }
});

test('Get GlobalPopup Data bad', () => {
  try {
    parser.getAllLangPopupData('intro', true);
    expect(true).toBe(false);
  } catch (error: any) {
    expect(error.message).toBe('popup-is-not-found');
  }
});
