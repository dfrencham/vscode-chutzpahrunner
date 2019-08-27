import * as assert from 'assert';
import * as sinon from 'sinon';
import * as configuration from '../../configuration';
import * as vscode from 'vscode';
import * as fs from "fs";

suite('Configuration', () => {

	test('getChutzpahPath', () => {
        
        let config = new Config();
        const stub = sinon
		.stub(vscode.workspace, 'getConfiguration')
        .returns(config);

        const stubFile = sinon
        .stub(fs,"existsSync")
        .returns(true);

        var result =  configuration.getChutzpahPath();
        assert.equal(config.callCount,1);
        assert.notEqual(result,"");

        sinon.restore();
    });

    test('getParallelism', () => {
        
        let config = new Config();
        const stub = sinon
		.stub(vscode.workspace, 'getConfiguration')
        .returns(config);

        configuration.getParallelism();
        assert.equal(config.callCount,1);

        sinon.restore();
    });
});

class Config implements vscode.WorkspaceConfiguration {
    public callCount = 0;

    readonly [key: string]: any;    get<T>(section: string): T | undefined;
    get<T>(section: string, defaultValue: T): T;
    get(section: any, defaultValue?: any) {
        this.callCount++;
        return section as string;
    }
    has(section: string): boolean {
        throw new Error("Method not implemented.");
    }
    inspect<T>(section: string): { key: string; defaultValue?: T | undefined; globalValue?: T | undefined; workspaceValue?: T | undefined; workspaceFolderValue?: T | undefined; } | undefined {
        throw new Error("Method not implemented.");
    }
    update(section: string, value: any, configurationTarget?: boolean | vscode.ConfigurationTarget | undefined): Thenable<void> {
        throw new Error("Method not implemented.");
    }
}
