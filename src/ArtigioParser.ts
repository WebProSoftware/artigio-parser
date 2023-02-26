class ArtigioParser {
  _isFile: boolean = false;
  _presentationJson: object;

  public constructor() {
    this._isFile = false;
    this._presentationJson = {};
  }

  public readDataByUrl(data: object) {
    return (this._presentationJson = data);
  }
  public getIsFile() {
    return this._isFile;
  }
}
export default ArtigioParser;
