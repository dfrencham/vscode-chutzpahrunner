import * as assert from 'assert';
import { before } from 'mocha';
import * as sinon from 'sinon';
import * as extension from '../../extension';
import * as configuration from '../../configuration';
import * as runner from '../../runner';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});

suite('runChutzpah', () => {
	test('basic test', () => {
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

		stub.restore();
	});
});
