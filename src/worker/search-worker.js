// import { TCities } from '../interfaces'
const { parentPort } = require('worker_threads');

// interface SearchProp {
//     query: string,
//     chunklist: TCities
// }

// parentPort.on('message', (task: SearchProp) => {
//     const { query, chunklist } = task
//     let results = chunklist.map(({ name, state, coord }) => {
//         if (name.includes(query) || state.includes(query)) {
//             return coord
//         }
//     })
//     //perform search on chunk and return result
//     parentPort.postMessage(results);
// });

parentPort.on('message', (task) => {
    const { query, chunklist } = task
    let results = chunklist.filter(({ name, state, coord }) => name.toUpperCase().includes(query.toUpperCase()))
    //perform search on chunk and return result
    parentPort.postMessage(results);
});