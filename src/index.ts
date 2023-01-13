import * as child from 'child_process';
import * as path from 'path';
import * as fs from 'node:fs';

// todo: generate *.ly script given scale, octaves, hands together, contrary/similar motion.

// Call Lilypond to compile script to sheet music image (SVG) and MIDI.
const folder = 'src/scales';
const lilypondScript = path.join(folder, 'g-major-two-octaves-hands-together.ly');
let command = `lilypond --svg --output=${folder} -dno-point-and-click ${lilypondScript}`;
try {
    child.execSync(command);
} catch (error) {
    console.error(error);
}

// https://stackoverflow.com/questions/5953239/how-do-i-change-file-extension-with-javascript
const changeExtension = (filepath: string, extension: string): string => {
    return path.format({ ...path.parse(filepath), base: '', ext: extension })
}

const svgPath = changeExtension(lilypondScript, '.svg');
const svgCroppedPath = changeExtension(lilypondScript, '.cropped.svg');

fs.unlink(svgPath, (err) => {
    if (err) throw err;
    console.log(`Successfully deleted ${svgPath}`);
});

fs.rename(svgCroppedPath, svgPath, (err) => {
    if (err) throw err;
    console.log(`Successfully renamed ${svgCroppedPath} to ${svgPath}`);
});

// Optimise SVG.
command = `svgo ${svgPath}`;
child.exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});