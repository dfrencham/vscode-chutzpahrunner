import * as vscode from "vscode";
import { spawn } from 'child_process';

/**
 * Spawns test in a terminal window.
 * For test debugging we run the tests this way to allow the dev webserver to run
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 */
export function terminalTests(chutzpahPath: string, args: string[]) {
	var terminal = selectTerminal();
	terminal.show(true);
	if (terminal) {
		terminal.sendText(`${chutzpahPath} ${args.join(" ")}`, true);
	}
}

/**
 * Spawns test in dedicated output channel
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 * @param uri Path to tests, used for display only
 */
export function spawnTests(chutzpahPath: string, args: string[], uri: vscode.Uri) {
	let chutzpahChannel = vscode.window.createOutputChannel('ChuzpahOutput');
	chutzpahChannel.show(true);
	chutzpahChannel.append(`Chutzpah started: ${uri}`);

	const proc = spawn(chutzpahPath, args,{ shell: true });
	
	proc.stdout.on('data', (data) => {
		chutzpahChannel.append(`${data}`);
	});
	
	proc.stderr.on('data', (data) => {
		chutzpahChannel.append(`${data}`);
	});
	
	proc.on('close', (code) => {
		// do not print exit code
		// chutzpahChannel.append(`${code}`);
	});
}

/**
 * Selects the first terminal, or creates a new one if none are found
 */
export function selectTerminal(): vscode.Terminal {

	const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;	

	if (terminals.length) {
		return terminals[terminals.length-1];
	} else {
		return vscode.window.createTerminal(`Ext Terminal #1`);
	}
}