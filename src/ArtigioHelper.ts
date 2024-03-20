import { Language, List, Screen, SubModule, Translation } from './ArtigioModel';

const prepareModelElement = (
  artigioModule: Screen,
  lang: string,
  assetsPath: string | null = null,
  prefix: string | null = null,
) => {
  let result = {};
  artigioModule.subModules.forEach((item: SubModule, idx: number) => {
    let valueByModuleType = ArtigioHelper.getValueBySubmodule(item, lang, assetsPath);
    if (item.moduleType === 0 && valueByModuleType) {
      const fakeList = valueByModuleType as List;
      valueByModuleType = prepareModelElement(fakeList, lang, assetsPath, prefix);
    }
    if ((item.moduleType === 5 || item.moduleType === 12) && valueByModuleType instanceof Array<List>) {
      let arrayResult: any[] = [];
      valueByModuleType.forEach((itemList: any) => {
        arrayResult = [...arrayResult, prepareModelElement(itemList, lang, assetsPath, prefix)];
      });
      valueByModuleType = arrayResult;
    }
    const value = {
      [ArtigioHelper.convertJsonKey(item.key, prefix)]: valueByModuleType,
    };

    result = {
      ...result,
      ...value,
    };
  });
  return result;
};

const getValueBySubmodule = (subModule: SubModule, lang: string, assetsPath: string | null = null) => {
  switch (subModule.moduleType) {
    case 0:
      return subModule ? subModule : null;
    case 1:
      return subModule.text ? (subModule.isTranslated ? subModule.text[lang] : subModule.text) : '';
    case 2:
      return subModule.text ? (subModule.isTranslated ? subModule.text[lang] : subModule.text) : '';
    case 3:
      return {
        index: subModule.selectedIndex,
        value: subModule.selectedValue ? subModule.selectedValue : null,
      };
    case 4:
      const filePath = subModule.files ? (subModule.isTranslated ? subModule.files[lang] : subModule.files) : '';
      if (filePath) {
        return assetsPath ? assetsPath + filePath : filePath;
      } else {
        return filePath;
      }
    case 5:
      return subModule.list as List[];
    case 10:
      return subModule.color;
    case 11:
      return subModule.checked;
    case 12:
      return subModule.list as List[];
    case 13:
      return subModule.number ? Number(subModule.number) : 0;
    default:
      return '';
  }
};

const convertJsonKey = (key: string, prefix: string | null = null) => {
  let result = '';
  if (prefix) key = key.replace(prefix!, '');

  key.split('-').forEach((item, idx) => {
    result += idx > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;
  });
  return result;
};

const prepareTranslation = (translations: Translation[], lang: Language, findKey: string | null = null) => {
  let result = {};
  if (findKey === null) {
    translations.forEach((item, idx) => {
      result = {
        ...result,
        [convertJsonKey(item.key)]: item.value[lang.tag],
      };
    });
    return result;
  } else {
    return translations.find((item, idx) => item.key === findKey)?.value[lang.tag];
  }
};

export const ArtigioHelper = {
  getValueBySubmodule,
  convertJsonKey,
  prepareModelElement,
  prepareTranslation,
};
