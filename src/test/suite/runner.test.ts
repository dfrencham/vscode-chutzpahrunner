import * as assert from 'assert';
import * as sinon from 'sinon';
import * as runner from '../../runner';
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as events from 'events';

suite('Runner', () => {

    test('terminalTests', () => {
        
        let term = new TestTerminal();
        let terms :TestTerminal[] = [];
        term.name = "bob";
        terms.push(term);
        
        runner.terminalTests("path",[],term);

        assert.equal(term.visible,true);
        assert.notEqual(term.text,"");
    });

    test('spawnTests', () => {
        
        let testChannel = new TestOutputChannel();

        const stub = sinon
		.stub(vscode.window, 'createOutputChannel')
        .returns(testChannel);

        var fakeChild = {
            stdout: new events.EventEmitter(),
            stderr: new events.EventEmitter()
        };

        sinon.stub(child_process, 'spawn').returns(fakeChild as child_process.ChildProcess);

        runner.spawnTests("test",["blah"],"path", undefined);

        assert.equal(testChannel.showCalled,true);
        assert.equal(testChannel.appendCalled,true);
        assert.equal(stub.called,true);

        sinon.restore();
    });

	test('select terminal', () => {
        vscode.window.createTerminal(`ChutzpahTerm`);
        var result = runner.selectTerminal();
        assert.notEqual(result,undefined);
    });

    test('format cmd', () => {
        const cmd = "c:\\tools\\chutzpah.exe";
        const args = ["/engine chrome"];
        const result = runner.formatCmd(cmd,args);

        assert.strictEqual(result,'"c:\\tools\\chutzpah.exe" /engine chrome');
    });

    test('format powershell', () => {
        const cmd = "c:\\tools\\chutzpah.exe";
        const args = ["/engine chrome"];
        const result = runner.formatPowershell(cmd,args);

        assert.strictEqual(result,"& 'c:\\tools\\chutzpah.exe' /engine chrome");
    });

    test('format *nix', () => {
        const cmd = "c:\\tools\\chutzpah.exe";
        const args = ["/engine chrome"];
        const result = runner.formatUnix(cmd,args);

        assert.strictEqual(result,'"/mnt/c/tools/chutzpah.exe" /engine chrome');
    });

});

class TestTerminal implements vscode.Terminal {
    name!: string;    
    processId!: Thenable<number>;
    visible = false;
    text = "";
    sendText(text: string, addNewLine?: boolean | undefined): void {
        this.text = text;
    }
    show(preserveFocus?: boolean | undefined): void {
        this.visible = true;
    }
    hide(): void {
        this.visible = false;
    }
    dispose(): void {
    }
}

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