# Artigio CMS Parser

Getting started


## Installation

Install artigio cms parser with npm

```bash
  npm install artigio-cms-parser
```

## Usage/Examples
Init app example

### Initialize

```javascript
const artigio = new ArtigioParser({
        dataJson: window.common.presentationJson,
        keyPrefix: "project-appName-",
        assetsPath: window.common.presentationAssetsPath
});
```
Options:
- `dataJson` - artigio presentation file parsed to json
- `keyPrefix` - string prefix
- `defaultLanguage` - string, tag from artigio e.g. "PL", "EN"
- `assetsPath` - path to assets dictionary or url to cdn

