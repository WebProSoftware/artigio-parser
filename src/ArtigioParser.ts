import {
  ArtigioModel,
  ArtigioParserOptions,
  DefaultLanguage,
  Language,
  List,
  PresentationSettings,
  Resolution,
  Screen,
} from './ArtigioModel';
import { ArtigioHelper } from './ArtigioHelper';

class ArtigioParser {
  private _presentationJson!: ArtigioModel;
  private _currentLang: string;
  private _prefix: string;
  private _assetsPath: string | null;

  public constructor(options: ArtigioParserOptions) {
    this._presentationJson = options.dataJson;
    this._prefix = options.keyPrefix ? options.keyPrefix : '';
    this._currentLang = options.defaultLanguage ? options.defaultLanguage : 'pl';
    this._assetsPath = options.assetsPath ? options.assetsPath : null;
  }

  public setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  public changeLanguage(langCode: string) {
    if (this.checkLanguageInJson(langCode)) {
      this._currentLang = langCode;
      return true;
    }
    return false;
  }

  public setPresentationJson(data: ArtigioModel) {
    this._presentationJson = data;
  }
  public getPresentationJson(): ArtigioModel {
    return this._presentationJson;
  }
  public getPresentationSettings(): PresentationSettings {
    return this._presentationJson.presentationSettings;
  }
  public getResolution(): Resolution {
    return this._presentationJson.presentationSettings.resolution;
  }
  public getDefaultLanguage(): DefaultLanguage {
    return this._presentationJson.presentationSettings.defaultLanguage;
  }
  public getLanguageList(): Language[] {
    return this._presentationJson.dictionaries.languages;
  }
  public getScreens(): Screen[] {
    return this._presentationJson.screens;
  }
  public getPopups(): Screen[] {
    return this._presentationJson.globalPopups;
  }
  public getNameScreens(usePrefix: boolean = true): string[] {
    return this._presentationJson.screens.map((item: Screen) => {
      return usePrefix ? item.key.replace(this._prefix, '') : item.key;
    });
  }

  public getScreen(screenKey: string, usePrefix: boolean = false): Screen {
    const findPrefix = usePrefix ? `${this._prefix}${screenKey}` : screenKey;
    const findScreen = this._presentationJson.screens?.find((x: Screen) => x.key === findPrefix) as Screen | undefined;
    if (!findScreen) throw new Error('screen-is-not-found');
    return findScreen;
  }

  public getGlobalPopup(popupKey: string, usePrefix: boolean = false): Screen {
    const findPrefix = usePrefix ? `${this._prefix}${popupKey}` : popupKey;
    const findPopup = this._presentationJson.globalPopups?.find((x: Screen) => x.key === findPrefix) as
      | Screen
      | undefined;
    if (!findPopup) throw new Error('popup-is-not-found');
    return findPopup;
  }

  public getScreenDataByLang(screenKey: string, lang: string, usePrefix: boolean = false) {
    if (this.checkLanguageInJson(lang)) {
      return ArtigioHelper.prepareModelElement(
        this.getScreen(screenKey, usePrefix),
        lang,
        this._assetsPath,
        this._prefix,
      );
    }
    throw new TypeError('Lang ' + lang + ' is not defined on Artigio');
  }

  public getScreenDataByCurrentLang(screenKey: string, usePrefix: boolean = false): any {
    return ArtigioHelper.prepareModelElement(
      this.getScreen(screenKey, usePrefix),
      this._currentLang,
      this._assetsPath,
      this._prefix,
    );
  }

  public getAllLangScreenData(screenKey: string, usePrefix: boolean = false): any {
    let result: object = {};
    this.getLanguageList().forEach((item, idx) => {
      result = {
        ...result,
        [item.tag]: ArtigioHelper.prepareModelElement(
          this.getScreen(screenKey, usePrefix),
          item.tag,
          this._assetsPath,
          this._prefix,
        ),
      };
    });
    return result;
  }

  public getAllLangPopupData(globalPopupKey: string, usePrefix: boolean = false): any {
    let result: object = {};
    this.getLanguageList().forEach((item, idx) => {
      result = {
        ...result,
        [item.tag]: ArtigioHelper.prepareModelElement(
          this.getGlobalPopup(globalPopupKey, usePrefix),
          item.tag,
          this._assetsPath,
          this._prefix,
        ),
      };
    });
    return result;
  }

  private checkLanguageInJson(lang: string): boolean {
    return !!this.getLanguageList().find((x: Language) => x.tag === lang);
  }
}
export default ArtigioParser;
