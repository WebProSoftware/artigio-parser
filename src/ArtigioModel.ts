export type ArtigioModel = {
  translations: Translation[];
  presentationSettings: PresentationSettings;
  dictionaries: Dictionaries;
  styleId?: any;
  screens: Screen[];
  screensavers?: any;
  globalPopups?: any;
};
export type Translation = {
  key: string;
  value: Record<string, string>;
};
export type PresentationSettings = {
  presentationId: string;
  key: string;
  name: string;
  defaultLanguage: DefaultLanguage;
  mediaPath: string;
  shouldIncludeMediaPath: boolean;
  stylePath: string;
  resolution: Resolution;
};
export type Dictionaries = {
  moduleTypes: ModuleType[];
  languages: Language[];
  enumLists: EnumList[];
};
export type EnumList = {
  key: string;
  name: string;
  enums: string[];
};
export type DefaultLanguage = {
  name: string;
  value: number;
  tag: string;
};
export type Language = {
  id: number;
  tag: string;
  name: string;
};
export type Resolution = {
  width: number;
  height: number;
};
export type ModuleType = {
  id: number;
  name: string;
  keys: string[];
};
export type SelectedModule = {
  moduleType: number;
  key: string;
  name: string;
};
export type Text = {
  [key: string | number]: string;
};
export type Files = {
  [key: string | number]: string;
};
export type SubModule = {
  moduleType: number;
  key: string;
  name: string;
  isTranslated?: boolean;
  text?: Text;
  selectedModule?: SelectedModule;
  selectedIndex?: number;
  selectedValue?: string;
  checked?: boolean;
  number?: string;
  files?: Files;
  list?: List[];
  color?: string;
  subModules?: SubModule[];
  referenceId?: string;
};
export type List = {
  moduleType: number;
  key: string;
  name: string;
  moduleId: string;
  referenceId: string;
  subModules: SubModule[];
};
export type Screen = {
  moduleId: string;
  key: string;
  name: string;
  referenceId: string;
  subModules: SubModule[];
};
export type ArtigioParserOptions = {
  dataJson: ArtigioModel;
  defaultLanguage?: string;
  keyPrefix?: string;
  assetsPath?: string;
};
