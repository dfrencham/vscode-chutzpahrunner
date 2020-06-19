import * as assert from 'assert';
import { beforeEach, afterEach } from 'mocha';
import * as vscode from 'vscode';
import * as contextHelpers from '../../contextHelpers';
import * as configuration from '../../configuration';
import * as stubHelper from './stubHelper';
import * as fs from 'fs';
import * as sinon from 'sinon';
import * as os from 'os';

suite('ContextHelpers', () => {

    var fsStub: any;
    var osStub: any;
	
	beforeEach(() => {
        fsStub = sinon.stub(fs, 'statSync').returns(stubHelper.getFakeDirectory());
        osStub = sinon.stub(os, 'type').returns("WinNT");
	});

	afterEach(() => {
        fsStub.restore();
        osStub.restore();
	});

	test('getPathFromUri', () => {
		var uri = { fsPath: "path" } as vscode.Uri;
		var result = contextHelpers.getPathFromUri(uri);
		assert.equal(result !== "", true);
    });
    
    test('isWindows', () => {
        var exceptionThrown = false;
        try {
            let result = contextHelpers.isWindows();
        } catch (error) {
            exceptionThrown = true;
        }
        assert.equal(exceptionThrown,false);
    });

    test('getChromeProfilePath', () => {
        assert.equal(contextHelpers.getChromeProfilePath().length > 0, true);
    });
});