import { List, Screen, SubModule } from './ArtigioModel';

const prepareModelElement = (artigioModule: Screen, lang: string) => {
  let result = {};
  artigioModule.subModules.forEach((item: SubModule, idx: number) => {
    let valueByModuleType = ArtigioHelper.getValueBySubmodule(item, lang);
    if (item.moduleType === 0 && valueByModuleType) {
      const fakeList = valueByModuleType as List;
      valueByModuleType = prepareModelElement(fakeList, item.key);
    }
    if ((item.moduleType === 5 || item.moduleType === 12) && valueByModuleType instanceof Array<List>) {
      let arrayResult: any[] = [];
      valueByModuleType.forEach((itemList: any) => {
        arrayResult = [...arrayResult, prepareModelElement(itemList, lang)];
      });
      valueByModuleType = arrayResult;
    }
    const value = {
      [ArtigioHelper.convertJsonKey(item.key)]: valueByModuleType,
    };
    result = {
      ...result,
      ...value,
    };
  });
  return result;
};

const getValueBySubmodule = (subModule: SubModule, lang: string) => {
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
      return subModule.files ? (subModule.isTranslated ? subModule.files[lang] : subModule.files) : '';
    case 5:
      return subModule.list as List[];
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

const convertJsonKey = (key: string) => {
  let result = '';
  key.split('-').forEach((item, idx) => {
    result += idx > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;
  });
  return result;
};

export const ArtigioHelper = {
  getValueBySubmodule,
  convertJsonKey,
  prepareModelElement,
};
