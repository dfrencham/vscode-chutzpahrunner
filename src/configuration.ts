import * as vscode from "vscode";
import * as fs from "fs";

/**
 * Gets the configured value for Chutzpah exe path
 */
export function getChutzpahPath(): string {
    try {
        let vsConfig = vscode.workspace.getConfiguration("chutzpahrunner");
        let exePath = vsConfig.get<string>("exePath") || "";

        if ((exePath !== "") && (fs.existsSync(exePath))) {
            return exePath;
        }
    } catch (error) {
        console.log(error);
    }
    return "";
}

/**
 * Gets the configured value for Parallelism
 */
export function getParallelism(): number {
    let vsConfig = vscode.workspace.getConfiguration("chutzpahrunner");
    let parallelism = vsConfig.get<number>("parallelism") || 0;
    return parallelism;
}

/**
 * Gets the configured value for disableCORS
 */
export function getDisableCORS(): boolean {
    let vsConfig = vscode.workspace.getConfiguration("chutzpahrunner");
    let disableCORS = vsConfig.get<boolean>("disableCORS") || false;
    return disableCORS;
}

/**
 * Gets the temp folder for a chrome profile
 */
export function getChromeProfileFolder(): string {
    let vsConfig = vscode.workspace.getConfiguration("chutzpahrunner");
    let item = vsConfig.get<string>("chromeProfileFolder") || "";
    return item;
}