import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as vscode from "vscode";
import * as configuration from './configuration';

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

export function isWindows() {
	return os.type().toLowerCase().includes("win");
}

export function getChromeProfilePath() {
    var profilePath = configuration.getChromeProfileFolder();
    
    // user has overridden path
    if (profilePath.length) 
        return profilePath;
    
    if (isWindows())
		return "C:/ChromeDevSession";
	else
		return "~/ChromeDevSession";
}
