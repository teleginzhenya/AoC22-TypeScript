import { input } from "./day3_input";

let firstArr: string[] = [];
let secondArr: string[] = [];

const groupedRows = input.split('\n').reduce<Record<'first' | 'second', string[]>[]>((acc, row) => {
    if (firstArr.length === 3 && secondArr.length === 3) {
        const first = [...firstArr];
        const second = [...secondArr];
        acc.push({ first, second })
        firstArr = [];
        secondArr = [];
    }
    if (firstArr.length < 3) {
        firstArr.push(row);
    } else if (secondArr.length < 3) {
        secondArr.push(row);
    }

    return acc;
}, []);

if (firstArr.length === 3 && secondArr.length === 3) {
    const first = [...firstArr];
    const second = [...secondArr];
    groupedRows.push({ first, second })
    firstArr = [];
    secondArr = [];
};

function arraysIntersection(arr1: string, arr2: string, arr3: string): string {
    const setOne = new Set(arr1.split(''));
    const setTwo = new Set();
    const setThree = new Set();
    arr2.split('').forEach((character) => {
        if (setOne.has(character)) {
            setTwo.add(character);
        }
    });
    arr3.split('').forEach((character) => {
        if (setTwo.has(character)) {
            setThree.add(character);
        }
    });

    return [...setThree][0] as string;
};

function transformToValue(str: string) {
    let charCode = str.charCodeAt(0);
    if (charCode >= 97) {
        charCode -= 96;
    } else {
        charCode -= 38;
    }

    return charCode;
}

const answer = groupedRows.reduce<number>((acc, { first, second }) => {
    const firstIntersection = arraysIntersection(first[0], first[1], first[2]);
    const secondIntersection = arraysIntersection(second[0], second[1], second[2]);

    return acc += transformToValue(firstIntersection) + transformToValue(secondIntersection);
}, 0);

console.log(answer);

export { };
