const path = require('path');
const vscode = require('vscode');
const touch = require('touch');
const fs = require('fs');
const parse = require('./parser');

function activate(context) {
  vscode.workspace.workspaceFolders.forEach(ws => {
    const watcher = vscode.workspace.createFileSystemWatcher(ws.uri.path + '/**', false, true, true);
    const onCreateEvent = watcher.onDidCreate(e => {
      if ((e.path.includes('{') && e.path.includes('}')) || e.path.includes(',')) {
        const name = path.basename(e.path);
        const basePath = path.dirname(e.path);

        const [first, ...filesToCreate] = parse(name);

        fs.rename(e.path, basePath + '/' + first, err => {
          vscode.window.showErrorMessage(err.message);
        });

        filesToCreate.forEach(f => {
          touch(basePath + '/' + f);
        });

        vscode.workspace.openTextDocument(basePath + '/' + first).then(doc => {
          vscode.commands
            .executeCommand('workbench.action.closeActiveEditor')
            .then(() =>
              vscode.window.showTextDocument(doc, vscode.ViewColumn.Active, true).then(editor => editor.show())
            );
        });
      }
    });

    context.subscriptions.push(onCreateEvent);
  });
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
