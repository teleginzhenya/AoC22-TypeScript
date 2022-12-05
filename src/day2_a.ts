import { input } from "./day2_input";


type OpponentChoice = 'A' | 'B' | 'C';
type MyChoice = 'X' | 'Y' | 'Z';

const scores: Record<MyChoice, number> = {
    // Rock
    X: 1,
    // Paper
    Y: 2,
    // Scissors
    Z: 3
}

const combinations: Record<OpponentChoice, Record<MyChoice, number>> = {
    // Rock
    'A': {
        // Rock
        'X': 3,
        // Paper
        'Y': 6,
        // Scissors
        'Z': 0
    },
    // Paper
    'B': {
        // Rock
        'X': 0,
        // Paper
        'Y': 3,
        // Scissors
        'Z': 6
    },
    // Scissors
    'C': {
        // Rock
        'X': 6,
        // Paper
        'Y': 0,
        // Scissors
        'Z': 3
    }
}

const answer = input.split('\n').reduce<number>((acc, row) => {
    const [opponent, my] = row.split(' ') as [OpponentChoice, MyChoice];
    return acc += combinations[opponent][my] + scores[my];
}, 0)

console.log(answer);

export { };
