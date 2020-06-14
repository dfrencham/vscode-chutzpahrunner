import * as vscode from "vscode";
import * as child_process from 'child_process'

/**
 * Spawns test in a terminal window.
 * For test debugging we run the tests this way to allow the dev webserver to run
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 */
export function terminalTests(chutzpahPath: string, args: string[], terminal: vscode.Terminal) {
	args[0] = `"${args[0]}"`;
	terminal.show(true);
	if (terminal) {
		terminal.sendText("", true); // account for previous test runs
		terminal.sendText(`${chutzpahPath} ${args.join(" ")}`, true);
	}
}

/**
 * Spawns test in dedicated output channel
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 * @param testPath Path to tests, used for display only
 */
export function spawnTests(chutzpahPath: string, args: string[], testPath: string) {
	let chutzpahChannel = vscode.window.createOutputChannel('ChutzpahOutput');
	args[0] = `"${args[0]}"`;
	chutzpahChannel.show(true);
	chutzpahChannel.appendLine(`Chutzpah started: ${testPath}`);

	const proc = child_process.spawn(chutzpahPath, args,{ shell: true });
	
	proc.stdout.on('data', (data) => {
		chutzpahChannel.append(`${data}`);
	});
	
	proc.stderr.on('data', (data) => {
		chutzpahChannel.append(`${data}`);
	});
	
	//proc.on('close', (code) => {
		// do not print exit code
		// chutzpahChannel.append(`${code}`);
	//});
}

/**
 * Selects the first terminal, or creates a new one if none are found
 */
export function selectTerminal(): vscode.Terminal {

	//const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;	
	const terminals = vscode.window.terminals;

	if (terminals.length) {
		return terminals[terminals.length-1];
	} else {
		return vscode.window.createTerminal(`Ext Terminal #1`);
	}
}