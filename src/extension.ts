import { TestParameters } from './testParameters';
import { StateBag } from './stateBag';
import * as vscode from "vscode";
import * as configuration from './configuration';
import * as runner from './runner';
import * as contextHelpers from "./contextHelpers";

export function activate(context: vscode.ExtensionContext) {
	const state = {} as StateBag;
	let openInBrowser,coverage,newWindow: boolean;

	let disposables = [];
	disposables.push(vscode.commands.registerCommand('extension.runChutzpah', (uri: vscode.Uri) => {	
		openInBrowser = false;
		coverage = false;
		newWindow = false;
		runChutzpah(uri,openInBrowser,coverage,newWindow,state);
	}));
	disposables.push(vscode.commands.registerCommand('extension.runChutzpahInBrowser', (uri: vscode.Uri) => {
		openInBrowser = true;
		coverage = false;
		newWindow = true;
		runChutzpah(uri,openInBrowser,coverage,newWindow,state);
	}));
	disposables.push(vscode.commands.registerCommand('extension.runChutzpahWithCoverage', (uri: vscode.Uri) => {
		openInBrowser = false;
		coverage = true;
		newWindow = false;
		runChutzpah(uri,openInBrowser,coverage,newWindow,state);
	}));
	context.subscriptions.push(...disposables);
}

export function deactivate() {}

/**
 * Start Chutzpah run
 * @param uri File or folder path to test
 * @param openBrowser Open in browser for debug
 */
export function runChutzpah(uri: vscode.Uri, openBrowser: boolean, coverage: boolean, newWindow: boolean, state: StateBag): boolean {

	var chutzpahPath = configuration.getChutzpahPath();
	if (chutzpahPath === "") {
		vscode.window.showErrorMessage("Chutzpah Path is not valid");
		return false;
	}
	
	let parallelism = configuration.getParallelism();
	let testPath = contextHelpers.getPathFromUri(uri);
	let engine = configuration.getEngine();
	let tempFile: string|null = null;
	let disableCORS = configuration.getConfigurationFlag("disableCORS");

	let args = [`"${testPath}"`,"/engine",engine];

	if (disableCORS && engine === "chrome" && openBrowser) {
		args.push("/browserArgs");
		args.push(`"--disable-web-security --user-data-dir=${contextHelpers.getChromeProfilePath()}"`);
	}

	if (openBrowser) args.push(...["/openInBrowser","chrome"]);
	if (parallelism > 0) args.push(...["/parallelism",parallelism.toString()]);
	if (coverage) {
		tempFile = contextHelpers.getCoverageTempFile();
		args.push(... ["/coverage","/coveragehtml",tempFile]);
	}
	if (configuration.getConfigurationFlag("trace")) args.push("/trace");
	if (configuration.getConfigurationFlag("debug")) args.push("/debug");

	const testParams = {
		chutzpahPath: chutzpahPath,
		args: args,
		testPath: testPath,
		newWindow: newWindow,
		tempFile: tempFile
	} as TestParameters;

	state.outputChannel = runner.spawnTests(testParams,state.outputChannel);

	return true;
}
