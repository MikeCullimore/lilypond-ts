import * as child from 'child_process';
import * as path from 'path';
import * as fs from 'node:fs';

const excludeList = ['common.ly'];

const findFilesWithExtension = (path: string, extension: string): string[] => {
    let files = fs.readdirSync(path);
    return files.filter( file => file.match(new RegExp(`.*\.(${extension})`, 'ig')));
}

// Call Lilypond to compile script to sheet music image (SVG) and MIDI.
const compileLilypondScript = (lilypondScript: string, folder: string): void => {
    const command = `lilypond --svg --output=${folder} -dno-point-and-click ${lilypondScript}`;
    try {
        child.execSync(command);
    } catch (error) {
        console.error(error);
    }
}

// https://stackoverflow.com/questions/5953239/how-do-i-change-file-extension-with-javascript
const changeExtension = (filepath: string, extension: string): string => {
    return path.format({ ...path.parse(filepath), base: '', ext: extension })
}

const makeCroppedSvgDefault = (lilypondScript: string): string => {
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

    return svgCroppedPath;
}

const optimiseSvg = (svgPath: string): void => {
    const command = `svgo ${svgPath}`;
    child.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

const folder = 'src/scales';
const lilypondScripts = findFilesWithExtension(folder, '.ly').filter(file => !excludeList.includes(file));
console.log(lilypondScripts);
// const lilypondScript = path.join(folder, 'g-major-two-octaves-hands-together.ly');

lilypondScripts.forEach((filename) => {
    const lilypondScript = path.join(folder, filename);
    compileLilypondScript(lilypondScript, folder);
    const svgPath = makeCroppedSvgDefault(lilypondScript);
    optimiseSvg(svgPath);
});
