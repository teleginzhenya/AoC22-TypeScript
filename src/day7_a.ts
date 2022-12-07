import { input } from "./day7_input";

const items = input.split('\n');

type Content = {
    file?: { name: string, size: number };
    directory?: string;
}

type List = {
    path: string;
    content: Content[];
    size: number;
    parentDir: string | null;
}

const list: List[] = [{ path: '', content: [], parentDir: null, size: 0 }]

let currentDirectory = '';

function changeDirectory(dir: string) {
    if (dir === '..') {
        currentDirectory = currentDirectory.split('/').filter((_, idx) => idx !== currentDirectory.split('/').length - 1).join('/');
    } else if (dir === '/') {
        currentDirectory = '';
    } else {
        const parentDir = currentDirectory;
        currentDirectory += '/' + dir;

        const existingDirectory = list.find(({ path, parentDir }) => path === currentDirectory && parentDir === parentDir);
        if (!existingDirectory) {
            const newDir = { path: currentDirectory, content: [], parentDir: parentDir, size: 0 };
            list.push(newDir);
        };
    }
}

function addContentToDir(filename: string) {
    if (filename.startsWith('dir')) {
        const dir = filename.split(' ')[1];

        const newDir = { path: currentDirectory + '/' + dir, content: [], parentDir: currentDirectory, size: 0 };
        list.push(newDir);
    } else {
        const [size, name] = filename.split(' ');

        const numSize = parseInt(size, 10);
        const newFile = { name, size: numSize };
        const currDir = list.find(({ path }) => path === currentDirectory);
        currDir!.content?.push({ file: newFile });
        currDir!.size += numSize;
    }
}



for (const line of items) {
    if (line.startsWith(`$`)) {
        if (line.startsWith('$ cd')) {
            changeDirectory(line.split(' ')[2])
        }
    } else {
        addContentToDir(line);
    }
}


let answer: number = 0;
const max = 100000;

for (const directory of list) {
    let parentDir = list.find(({ path }) => path === directory.parentDir);

    while (parentDir?.parentDir || parentDir?.parentDir === '') {
        parentDir.size += directory.size;
        parentDir = list.find(({ path }) => path === parentDir?.parentDir);
    }
}

for (const directory of list) {
    if (directory.size <= max) {
        answer += directory.size;
    }
}

console.log(answer);
