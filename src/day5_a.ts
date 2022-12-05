import { input } from "./day5_input";

const rows = input.split('\n');

let idx = 0;
let currentRow = rows[idx];

const hashTable: Record<string, string[]> = {};

while (!Number.isInteger(parseInt(currentRow[1], 10))) {
    const splittedRow = currentRow.match(/.{1,4}/g);

    splittedRow!.map((item) => item.replaceAll(' ', '')).forEach((item, idx) => {
        if (item === '') {
            return;
        }

        const sanitizedItem = item.replaceAll('[', '').replaceAll(']', '');

        if (hashTable[idx] && hashTable[idx].length > 0) {
            hashTable[idx].push(sanitizedItem);
        } else {
            hashTable[idx] = [sanitizedItem];
        }
    })

    idx += 1;
    currentRow = rows[idx];
}

Object.entries(hashTable).forEach(([key, value]) => {
    hashTable[key] = value.reverse();
})

type CommandType = Record<'amount' | 'from' | 'to', number>;

const commands: CommandType[] = [];

idx += 2;
currentRow = rows[idx];

while (currentRow && currentRow.length > 0) {
    const [amount, from, to] = currentRow.replaceAll('move ', '').replaceAll('from ', '').replaceAll('to ', '').split(' ').map((item) => parseInt(item, 10));
    commands.push({ amount, from, to })
    idx += 1;
    currentRow = rows[idx];
}

commands.forEach(({ amount, from, to }, index) => {
    let i = 0;
    while (i < amount) {
        const poped = hashTable[from - 1].pop()!;
        hashTable[to - 1].push(poped);
        i += 1;
    }
})

const answer = Object.values(hashTable).reduce<string>((acc, item) => {
    if (item.length > 0) {
        acc += item.pop();
    }

    return acc;
}, '')

console.log(answer);

export { };
