import { input } from "./day6_input";

const items = input.split('');

let i = 0;
let answer = -1;
const n = 4;

while ((i < items.length - n) && answer < 0) {
    const set = new Set();
    let result = true;

    for (let j = i; j < i + n; j += 1) {
        if (set.has(items[j])) {
            set.add(items[j]);
            result = false;
        } else {
            set.add(items[j]);
        }
    }

    i += 1;
    if (result) {
        answer = i + n - 1;
    }
}

console.log(answer);
