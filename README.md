# Chutzpah Runner for Visual Studio Code

![Chutzpah Runner Icon](./resources/logo-sm.png 'ChutzpahRunner')

Execute Chutzpah tests from your context menu.

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
1. Select "Run Chutzpah" to run in headless mode; or
1. Select "Run Chutzpah in browser" to run in Chrome for debugging

## Configuration Options

| Option | Description |
| --- | --- |
| exePath | Full path of your `chutzpah.console.exe` executable |
| parallelism | Number of threads to use when executing tests (default is auto) |

## Credits

- [@mmanela](http://twitter.com/mmanela) for writing the very useful Chutzpah test runner
- The VSCode team for this fantastic editor