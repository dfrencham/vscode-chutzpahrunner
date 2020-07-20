import { TestParameters } from './testParameters';
import * as vscode from "vscode";
import * as child_process from 'child_process';
import * as helpers from './contextHelpers';

/**
 * Spawns test in dedicated output channel
 * @param chutzpahPath Path to Chutzpah exe
 * @param args Arguments for Chutzpah
 * @param testPath Path to tests, used for display only
 */
export function spawnTests(params: TestParameters, channel?: vscode.OutputChannel): vscode.OutputChannel {
	let chutzpahChannel = channel ?? vscode.window.createOutputChannel('ChutzpahOutput');
	
	chutzpahChannel.clear();
	chutzpahChannel.show(true);

	chutzpahChannel.appendLine('');
	chutzpahChannel.appendLine(`Running Chuzpah: ${params.chutzpahPath} ${params.args.join(' ')}`);

	const proc = child_process.spawn(`"${params.chutzpahPath}"`, 
									 params.args, 
									 { 
										shell: true,
										detached: params.newWindow, 
										cwd: helpers.getDir(params.testPath),
										stdio: 'pipe' 
									 }
									);

	proc.stdout.on('data', (data) => {
		chutzpahChannel.append(`${data}`);
	});
	
	proc.stderr.on('data', (data) => {
		chutzpahChannel.append(`${data}`);
	});

	proc.on('close', () => {
		if (params.tempFile) {
			const link = vscode.Uri.file(params.tempFile);
			chutzpahChannel.appendLine('');
			chutzpahChannel.append(`Coverage report ${params.tempFile}`);
			chutzpahChannel.appendLine('');
			vscode.env.openExternal(link);
		}
	});

	//proc.on('close', (code) => {
		// do not print exit code
		// chutzpahChannel.append(`${code}`);
	//});
	
	return chutzpahChannel;
}
