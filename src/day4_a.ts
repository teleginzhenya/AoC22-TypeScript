import { input } from "./day4_input";

function prepareSet(range: string) {
    const [rangeStart, rangeEnd] = range.split('-');
    const start = parseInt(rangeStart, 10);
    const end = parseInt(rangeEnd, 10);
    const length = end - start + 1;

    return new Set(new Array(length).fill(1).map((_, idx) => idx + start));
}

function prepareSets(row: string) {
    const [rangeOne, rangeTwo] = row.split(',');
    const setOne = prepareSet(rangeOne);
    const setTwo = prepareSet(rangeTwo);

    return ({
        setOne,
        setTwo
    })
}

function isFirstSetIncludedInSecond(setOne: Set<number>, setTwo: Set<number>) {
    let isIncluded = true;

    setOne.forEach((itemInFirst) => {
        if (!setTwo.has(itemInFirst)) {
            isIncluded = false;
        }
    });

    return isIncluded;
}

const answer = input.split('\n').reduce<number>((acc, row) => {
    const { setOne, setTwo } = prepareSets(row)
    if (setOne.size < setTwo.size) {
        if (isFirstSetIncludedInSecond(setOne, setTwo)) {
            acc += 1;
        }
    } else {
        if (isFirstSetIncludedInSecond(setTwo, setOne)) {
            acc += 1;
        }
    }

    return acc;
}, 0)

console.log(answer);

export { };
