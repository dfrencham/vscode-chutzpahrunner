import { StateBag } from './stateBag';
import * as vscode from "vscode";
import * as configuration from './configuration';
import * as runner from './runner';
import * as contextHelpers from "./contextHelpers";

export function activate(context: vscode.ExtensionContext) {
	const state = {} as StateBag;

	let disposables = [];
	disposables.push(vscode.commands.registerCommand('extension.runChutzpah', (uri: vscode.Uri) => {	
		runChutzpah(uri,false,false,state);
	}));
	disposables.push(vscode.commands.registerCommand('extension.runChutzpahInBrowser', (uri: vscode.Uri) => {
		runChutzpah(uri,true,false,state);
	}));
	disposables.push(vscode.commands.registerCommand('extension.runChutzpahWithCoverage', (uri: vscode.Uri) => {
		runChutzpah(uri,true,true,state);
	}));
	context.subscriptions.push(...disposables);
}

export function deactivate() {}

/**
 * Start Chutzpah run
 * @param uri File or folder path to test
 * @param openBrowser Open in browser for debug
 */
export function runChutzpah(uri: vscode.Uri, openBrowser: boolean, coverage: boolean, state: StateBag): boolean {

	var chutzpahPath = configuration.getChutzpahPath();
	if (chutzpahPath === "") {
		vscode.window.showErrorMessage("Chutzpah Path is not valid");
		return false;
	}
	var parallelism = configuration.getParallelism();
	var testPath = contextHelpers.getPathFromUri(uri);

	let args = [`"${testPath}"`,"/engine","chrome"];

	let disableCORS = configuration.getDisableCORS();
	if (disableCORS) {
		args.push("/browserArgs");
		args.push(`--disable-web-security --user-data-dir="${contextHelpers.getChromeProfilePath()}"`);
	}

	if (openBrowser)
		args.push(...["/openInBrowser","chrome"]);
	if (parallelism)
		args.push(...["/parallelism",parallelism.toString()]);
	if (coverage)
		args.push("/coverage");

	if (!openBrowser) {
		state.outputChannel = runner.spawnTests(chutzpahPath,args,testPath,state.outputChannel);
	} else {
		var terminal = runner.selectTerminal();
		runner.terminalTests(chutzpahPath,args,terminal);
	}

	return true;
}
