# Chutzpah Runner for Visual Studio Code

![Chutzpah Runner Icon](./resources/logo-sm.png 'ChutzpahRunner')

Execute Chutzpah tests from your context menu.

[![Badge for visual studio code extension version](https://vsmarketplacebadge.apphb.com/version/dfrencham.chutzpahrunner.svg?color=blue)](https://marketplace.visualstudio.com/items?itemName=dfrencham.chutzpahrunner)
[![Badge for visual studio code extension version](https://vsmarketplacebadge.apphb.com/installs/dfrencham.chutzpahrunner.svg?color=blue)](https://marketplace.visualstudio.com/items?itemName=dfrencham.chutzpahrunner)
[![Badge for visual studio code extension version](https://vsmarketplacebadge.apphb.com/rating/dfrencham.chutzpahrunner.svg?color=blue)](https://marketplace.visualstudio.com/items?itemName=dfrencham.chutzpahrunner)
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)

[![Build Status](https://dev.azure.com/dannypf/vscode-chutzpahrunner/_apis/build/status/dfrencham.vscode-chutzpahrunner?branchName=master)](https://dev.azure.com/dannypf/vscode-chutzpahrunner/_build/latest?definitionId=1&branchName=master) 

![Chutzpah Runner Demo](./resources/demo.gif 'Demo')

## Install

1. Open **Extensions** sideBar panel in Visual Studio Code and choose the menu options for **View → Extensions**
1. Search for `chutzpahrunner`
1. Click **Install**
1. Click **Reload**, if required

## Initial Configuration 

1. Ensure you have Chutzpah test runner installed
1. In VS Code preferences, go to `extensions` then `ChutzpahRunner`
1. Set `exePath` to the full path of your `chutzpah.console.exe` executable

## Usage 

1. Right click a .js file in the explorer
1. Select: 
   - "Run Chutzpah" to run in headless mode; or
   - "Run Chutzpah in browser" to run in Chrome for debugging; or
   - "Run Chutzpah with coverage" to run in Chrome with code coverage

## Configuration Options

| Option | Description |
| --- | --- |
| chromeProfileFolder | Temporary directory for Chrome profile. By default C:/ChromeDevSession or ~/ChromeDevSession will be used |
| debug | Print debug information in output |
| disableCORS | Disable cross origin checks during tests |
| engine | Browser engine. Chrome (default) / jsdom / phantom |
| exePath | Full path of your `chutzpah.console.exe` executable |
| parallelism | Number of threads to use when executing tests (default is auto) |
| trace | log tracing information in chutzpah.log |

## Things to be aware of

- If a `chutzpah.json` file exists in the same folder, it will be used by Chutzpah automatically
- Launching Chutzpah in Chrome will open a seperate command window. This is to allow the Chutzpah dev server to run.
- Running with coverage will output cover stats to the output window, and to a html file (displayed at the end of the run).
- (Windows) If the Chutzpah exe is on a different drive to your test spec files, Chrome may fail to load blanket coverage. This appears to be a Chutzpah issue.


## Contributing

Pull requests are welcome. Please see [contributing](contributing.md) for instructions on how to build and test the extension.

## Bugs 

Report bugs or feature requests to the [bug tracker](https://github.com/dfrencham/vscode-chutzpahrunner/issues)

## Credits

- [@mmanela](http://twitter.com/mmanela) for writing the excellent Chutzpah test runner
- [VSCode](https://code.visualstudio.com/) for being awesome