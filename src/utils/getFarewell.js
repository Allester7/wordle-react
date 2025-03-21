export function getFarewell(languages){
    const options = [
        `Farewell ${languages}`,
        `Adios ${languages}`,
        `Oh no, not ${languages}`,
        `Off ot the sunset ${languages}`,
        `${languages}, it's been real`
    ]
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
