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

const neededScore: Record<MyChoice, number> = {
    // Lose
    X: 0,
    // Draw
    Y: 3,
    // Win
    Z: 6
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
    const [opponent, outcome] = row.split(' ') as [OpponentChoice, MyChoice];
    const my = Object.entries(combinations[opponent]).reduce<MyChoice>((acc, [key, score]) => {
        if (neededScore[outcome] === score) {
            acc = key as MyChoice;
        }

        return acc;
    }, 'X')

    return acc += combinations[opponent][my] + scores[my];
}, 0)

console.log(answer);

export { };
