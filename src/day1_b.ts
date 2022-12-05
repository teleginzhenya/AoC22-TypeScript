import { input } from "./day1_input";

const sumArray: number[] = [];

const elves = input.split('\n\n');
elves.forEach((items) => {
    let calories = 0;
    items.split('\n').forEach((item) => {
        calories += parseInt(item, 10);
    })
    sumArray.push(calories);
});

sumArray.sort((a, b) => b - a);

console.log(sumArray[0], sumArray[1], sumArray[2]);
console.log(sumArray[0] + sumArray[1] + sumArray[2]);

export { };
