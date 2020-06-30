import * as vscode from "vscode";
import * as child_process from 'child_process';

/**
 * Spawns test in a terminal window.
 * For test debugging we run the tests this way to allow the dev webserver to run
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 */
export function terminalTests(chutzpahPath: string, args: string[], terminal: vscode.Terminal) {
	terminal.show(true);
	if (terminal) {
		
		terminal.sendText("", true); // account for previous test runs

		var termType = vscode.env.shell.toLocaleLowerCase();
			
		if (termType.includes("powershell"))
			terminal.sendText(formatPowershell(chutzpahPath, args), true);

		else if (termType.includes("wsl") || termType.includes("bash"))
			terminal.sendText(formatUnix(chutzpahPath, args), true);

		else 
			// assume cmd if nothing else matches
			terminal.sendText(formatCmd(chutzpahPath, args), true);
		
	}
}

/**
 * Spawns test in dedicated output channel
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 * @param testPath Path to tests, used for display only
 */
export function spawnTests(chutzpahPath: string, args: string[], testPath: string, channel?: vscode.OutputChannel): vscode.OutputChannel {
	let chutzpahChannel = channel ?? vscode.window.createOutputChannel('ChutzpahOutput');
	chutzpahChannel.show(true);
	chutzpahChannel.appendLine(`Chutzpah started: ${testPath}`);

	const proc = child_process.spawn(`"${chutzpahPath}"`, args,{ shell: true });
	
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
	
	return chutzpahChannel;
}

/**
 * Selects the first terminal, or creates a new one if none are found
 */
export function selectTerminal(): vscode.Terminal {

	const terminals = vscode.window.terminals;
	const terminalName = 'ChutzpahTerm';
	const testTerminal = terminals.filter((a)=>a.name===terminalName);
	
	if (testTerminal.length) {
		testTerminal[0].dispose();
	}

	return vscode.window.createTerminal(`ChutzpahTerm`);
}

/**
 * Format command string for cmd shell
 * @param cmd 
 */
export function formatCmd(cmd: string, args: string[]): string {
	return `"${cmd}" ${args.join(" ")}`;
}

/**
 * Format command string for powershell shell
 * @param cmd 
 */
export function formatPowershell(cmd: string, args: string[]): string {
	return `& '${cmd}' ${args.join(" ").split("\"").join("'")}`;
}

/**
 * Format command string for *nix shell
 * @param cmd 
 */
export function formatUnix(cmd: string, args: string[]): string {
	const unixPath = cmd[0].toLocaleLowerCase() + cmd.substring(2).split("\\").join("/");
	return `"/mnt/${unixPath}" ${args.join(" ")}`;
}
