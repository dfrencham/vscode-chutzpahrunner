import * as vscode from "vscode";
import * as configuration from './configuration';
import * as runner from './runner';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	let disposables = [];
	disposables.push(vscode.commands.registerCommand('extension.runChutzpah', (uri: vscode.Uri) => {	
		runChutzpah(uri,false,false);
	}));
	disposables.push(vscode.commands.registerCommand('extension.runChutzpahInBrowser', (uri: vscode.Uri) => {
		runChutzpah(uri,true,false);
	}));
	disposables.push(vscode.commands.registerCommand('extension.runChutzpahWithCoverage', (uri: vscode.Uri) => {
		runChutzpah(uri,true,true);
	}));

	context.subscriptions.push(...disposables);
}

export function deactivate() {}

/**
 * Start Chutzpah run
 * @param uri File or folder path to test
 * @param openBrowser Open in browser for debug
 */
export function runChutzpah(uri: vscode.Uri, openBrowser: boolean, coverage: boolean): boolean {

	var chutzpahPath = configuration.getChutzpahPath();
	if (chutzpahPath == "") {
		vscode.window.showErrorMessage("Chutzpah Path is not valid");
		return false;
	}
	var parallelism = configuration.getParallelism();
	var testPath = getPathFromUri(uri);

	let args = [testPath,"/engine","chrome"];
	if (openBrowser)
		args.push(...["/openInBrowser","chrome"]);
	if (parallelism)
		args.push(...["/parallelism",parallelism.toString()]);
	if (coverage)
		args.push("/coverage")

	if (!openBrowser) {
		runner.spawnTests(chutzpahPath,args,testPath);
	} else {
		var terminal = runner.selectTerminal();
		runner.terminalTests(chutzpahPath,args,terminal);
	}

	return true;
}

/**
 * Converts vscode URI to path
 * Returns empty string if path not found.
 * Add trailing slash for folder.
 * @param uri 
 * @todo Move to utility class
 */
export function getPathFromUri(uri: vscode.Uri): string {
	var result = fs.statSync(uri.fsPath);
	if (!result) {
		return "";
	} else {
		if (result.isDirectory()) {
			return uri.fsPath.endsWith(path.sep) ? uri.fsPath : uri.fsPath + path.sep;
		}
		return uri.fsPath;
	}
}
