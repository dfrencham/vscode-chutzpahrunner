# Contributing

Pull requests are welcome. How to contribute:

1. Fork this repository and create a feature branch.
1. Ensure the unit tests run (see below).
1. Ensure any new code contributions have sufficient test coverage. 80% is a good ballpark.
1. Make sure you've loaded the extension and ensured all context menu options still work.
1. Submit a pull request.

## Building the extension

To build the extension:

1. Run `npm install` to install all node module dependencies.
1. Run `npm run compile` to build the extension.

## Running the extension

In Visual Studio Code, the extension may be launched via the debug tab - using the Run Extension option. Note that this will automatically build the extension.

## Running the tests

Run `npm run test` to run the unit tests.

For coverage, run `npm run test:coverage`