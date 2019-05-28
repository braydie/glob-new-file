# Glob New File

VSCode extension that allows glob-like syntax when creating a new file to create multiple files at once.

![](/glob-new-file.gif)

## Features

Expect the following sort of results:

| Pattern               | Created files                                |
| --------------------- | -------------------------------------------- |
| index.{js, test.js}   | index.js, index.test.js                      |
| index.js,Component.js | index.js, Component.js                       |
| index{A,B,C}.js       | indexA.js, indexB.js, indexC.js              |
| index{A,B}.{js,css}   | indexA.js, indexA.css, indexB.js, indexB.css |

## Known Issues

It works on my machine...! This is my first extension so there's possibly some issues in there somewhere.

## Release Notes

### 0.0.2

Updated to use fsPath for looking working with file system. This should mean better cross-plat support

### 0.0.1

Initial release.
