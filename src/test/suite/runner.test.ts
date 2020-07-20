import { TestParameters } from './../../testParameters';
import * as assert from 'assert';
import * as sinon from 'sinon';
import * as runner from '../../runner';
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as events from 'events';

suite('Runner', () => {

    test('spawnTests', () => {
        
        let testChannel = new TestOutputChannel();

        const stub = sinon
		.stub(vscode.window, 'createOutputChannel')
        .returns(testChannel);

        let sandbox = sinon.createSandbox();

        let spawnEvent = new events.EventEmitter();
        (spawnEvent as any).stdout = new events.EventEmitter();
        (spawnEvent as any).stderr = new events.EventEmitter();

        sandbox.stub(child_process, 'spawn').returns(spawnEvent as child_process.ChildProcess);

        var params = {
            testPath: "path",
            args: ["blah"]
        } as TestParameters;
        runner.spawnTests(params);

        assert.equal(testChannel.showCalled,true);
        assert.equal(testChannel.appendCalled,true);
        assert.equal(stub.called,true);

        sinon.restore();
    });

});

class TestOutputChannel implements vscode.OutputChannel {
    name: string = "";  
    showCalled = false;
    appendCalled = false;

    append(value: string): void {
        this.appendCalled = true;
    }
    appendLine(value: string): void {
        this.appendCalled = true;
    }
    clear(): void {
        console.log("clear");
    }
    show(preserveFocus?: boolean | undefined): void;
    show(column?: vscode.ViewColumn | undefined, preserveFocus?: boolean | undefined): void;
    show(column?: any, preserveFocus?: any) {
        this.showCalled = true;
    }
    hide(): void {
        console.log("hide");
    }
    dispose(): void {
        console.log("dispose");
    }
}