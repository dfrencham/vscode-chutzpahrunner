import { StateBag } from './../../stateBag';
import * as assert from 'assert';
import { beforeEach, afterEach } from 'mocha';
import * as sinon from 'sinon';
import * as extension from '../../extension';
import * as configuration from '../../configuration';
import * as runner from '../../runner';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as stubHelper from './stubHelper';

suite('Extension', () => {

	var fsStub: any;
	
	beforeEach(() => {
		fsStub = sinon.stub(fs, 'statSync').returns(stubHelper.getFakeDirectory());
	});

	afterEach(() => {
		fsStub.restore();
	});

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
		extension.runChutzpah(uri, false, false, {} as StateBag);

		assert.equal(fakeRun.called, true);
		assert.equal(fakeRun2.called, false);

		sinon.restore();
	});

	test('run chutzpah - bad path', () => {
		const stub = sinon
		.stub(vscode.window, 'showErrorMessage')
		.returns(Promise.resolve(undefined));

		var fake = sinon.fake.returns("");
		sinon.replace(configuration,'getChutzpahPath',fake);

		var fake2 = sinon.fake.returns('path');
		sinon.replace(configuration,'getParallelism',fake2);		

		var uri = { fsPath: "" } as vscode.Uri;
		var result = extension.runChutzpah(uri, true, true, {} as StateBag);

		assert.equal(result, false);
		sinon.restore();
	});	

	test('activate', () => {
		var context =  new TestExtensionContext();
		extension.activate(context);
		assert.equal(context.subscriptions.length,3);
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
