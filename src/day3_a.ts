import { input } from "./day3_input";

const answer = input.split('\n').reduce<number>((acc, row) => {
    const firstCompartment = row.slice(0, row.length / 2).split('');
    const secondCompartment = row.slice(row.length / 2).split('');

    const hashMap: Record<string, boolean> = {};

    firstCompartment.forEach((item) => { hashMap[item] = true });

    const duplicated = secondCompartment.find((item) => {
        if (hashMap[item]) {
            return true;
        }
        return false
    });

    let charCode = duplicated!.charCodeAt(0);
    if (charCode >= 97) {
        charCode -= 96;
    } else {
        charCode -= 38;
    }

    return acc += charCode;
}, 0);

console.log(answer);

export { };
