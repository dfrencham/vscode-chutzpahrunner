import * as assert from 'assert';
import { before } from 'mocha';
import * as sinon from 'sinon';
import * as extension from '../../extension';
import * as configuration from '../../configuration';
import * as runner from '../../runner';
import * as vscode from 'vscode';

suite('Extension', () => {

	test('run chutzpah', () => {
		const stub = sinon
		.stub(vscode.window, 'showErrorMessage')
		.returns(Promise.resolve(undefined));

		var fake = sinon.fake.returns('path');
		sinon.replace(configuration,'getChutzpahPath',fake);

		var fake2 = sinon.fake.returns('path');
		sinon.replace(configuration,'getParallelism',fake2);

		var fakeRun = sinon.fake.returns(true);
		sinon.replace(runner,'spawnTests', fakeRun);

		var fakeRun2 = sinon.fake.returns(true);
		sinon.replace(runner,'terminalTests', fakeRun2);		

		var uri = { fsPath: "path" } as vscode.Uri;
		extension.runChutzpah(uri, false);

		assert.equal(fakeRun.called, true);
		assert.equal(fakeRun2.called, false);

		sinon.restore();
	});

	test('activate', () => {
		var context =  new TestExtensionContext();
		extension.activate(context);
		assert.equal(context.subscriptions.length,2);
	});
});


class TestExtensionContext implements vscode.ExtensionContext {
    subscriptions: {
		dispose(): any;
	}[] = [];
    workspaceState!: vscode.Memento;
    globalState!: vscode.Memento;
    extensionPath!: string;
    storagePath!: string;
    globalStoragePath!: string;
    logPath!: string;

    asAbsolutePath(relativePath: string): string {
        return relativePath;
    }
}
