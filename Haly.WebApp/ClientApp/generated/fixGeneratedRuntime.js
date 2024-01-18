// The generated runtime.ts file has ts errors. This script disables them with the '@ts-nocheck'
// directive.

/* eslint-disable */
const fs = require("fs");

const prependToFile = (filePath, lineNum, strToInsert) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const lines = data.split('\n');
        lines.splice(lineNum - 1, 0, strToInsert);

        const content = lines.join('\n');

        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            }
        });
    });
};

const filePath = './generated/haly/runtime.ts';
const prependString = '// @ts-nocheck\n';

// Put '@ts-nocheck' on third line. It has to be after the ones disabling linting, otherwise we will
// get a warning from eslint.
prependToFile(filePath, 3, prependString);
