import * as vscode from "vscode";
import * as configuration from './configuration';
import * as runner from './runner';

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

	let args = [uri.fsPath,"/engine","chrome"];
	if (openBrowser)
		args.push(...["/openInBrowser","chrome"]);
	if (parallelism)
		args.push(...["/parallelism",parallelism.toString()]);
	if (coverage)
		args.push("/coverage")

	if (!openBrowser) {
		runner.spawnTests(chutzpahPath,args,uri);
	} else {
		var terminal = runner.selectTerminal();
		runner.terminalTests(chutzpahPath,args,terminal);
	}

	return true;
}
