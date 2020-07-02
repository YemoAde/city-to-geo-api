import * as express from 'express'
import * as bodyParser from 'body-parser';
import CityResource from './resources/City';
import CityController from './controller/City';
import SimpleCache from './middleware/cache';
import { IResponse, TCities } from './interfaces';
const WorkerPool = require('./worker/pool');
const os = require('os');

const app = express()

/**
 * @experiment and @evaluation Threading
 * Evaluation of using multiple threads for searching through the json divided into chunks
 * 
 *  Number of Thread - 4
 * See City Controller for commented Code
 * The use of Threads amounted to more time (about x4)for possibly the following reasons
 * - The cost of spinning a worker thread even with use of async Resource for a pool of worker threads
 * - The cost of splitting the json into chunks and the reconstruction of results
 * - This operation is not a type to solve with multiple threads. It is more costly
 * 
 * 
 */
//  create WorkerPool for search
// const searchworkerPool = new WorkerPool(os.cpus().length, 'search-worker.js')
// app.use('/city',
//     new CityResource(
//         new CityController(searchworkerPool),
//         new SimpleCache(5 * 60)
//     ).getRouter())

/**
 * @experiment
 * The Simple node Caching improved the response time by a factor of x4
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.json({ status: true })
});

app.use('/city',
    new CityResource(
        new CityController(),
        new SimpleCache(5 * 60)
    ).getRouter())

app.listen(5000, () => {
    console.log('server started on port 5000')
})

module.exports = app;