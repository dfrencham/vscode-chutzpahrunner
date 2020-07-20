import * as vscode from "vscode";
import * as fs from "fs";

const CONFIG_SECTION = "chutzpahrunner";

/**
 * Gets the configured value for Chutzpah exe path
 */
export function getChutzpahPath(): string {
    try {
        let vsConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
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
    let vsConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
    let parallelism = vsConfig.get<number>("parallelism") || 0;
    return parallelism;
}

/**
 * Gets the temp folder for a chrome profile
 */
export function getChromeProfileFolder(): string {
    let vsConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
    let item = vsConfig.get<string>("chromeProfileFolder") || "";
    return item;
}

/**
 * Gets the engine
 */
export function getEngine(): string {
    let vsConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
    let engine = vsConfig.get<string>("engine") || "chrome";
    return engine;
}

/**
 * generic get bool from configuration
 * @param key flag name
 */
export function getConfigurationFlag(key: string): boolean {
    let vsConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
    return vsConfig.get<boolean>(key) ?? false;
}