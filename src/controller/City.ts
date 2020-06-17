import { ICityController, IRequest, ICityResponse, TCities, IResponse } from '../interfaces';
import { finished } from 'stream';
import { resolve } from 'path';
const citylist: TCities = require('../city.list.json');
const { Worker } = require('worker_threads');

function chunkArray(array, size) {
    if (array.length <= size) {
        return [array]
    }
    return [array.slice(0, size), ...chunkArray(array.slice(size), size)]
}

export default class CityController implements ICityController {
    private threadpool: any;
    constructor(workerPool?: any) {
        this.threadpool = workerPool;
    }
    create: IRequest;
    find: IRequest;
    findAll: IRequest;

    search: ICityResponse = async (req, res, next) => {
        const { query } = req.params;

        if (query.length < 3) {
            return res.status(400).json({
                status: 'error',
                message: "Query too short",
                data: []
            })
        }
        /**
         * @experiment and @evaluation
         * Using a pool of worker threads
         * const chunks = chunkArray(citylist, citylist.length / 4)
         * let final = []
         * let finished = 0;
         * let values = await new Promise((resolve, reject) => {
         *   for (let chunk of chunks) {
         *      this.threadpool.runTask({ query, chunklist: chunk }, (err, result) => {
         *             final = [...final, ...result]
         *             if (++finished === 4) {
         *                 resolve(final)
         *                 this.threadpool.close()
         *             }
         *         })
         *     }
         * })
         * 
         */

        
        /**
         * @experiment
         *  Without pooling 
         * let values = await new Promise((resolve, reject) => {
         *     let finished = 0;
         *  let final = [];
         *    for (let chunk in chunks) {
         *        let worker = new Worker('./src/worker/search-worker.js');
         *        worker.on('message', result => {
         *            final = [...final, ...result]
         *            finished++;
         *            if (finished === 4) {
         *                resolve(final)
         *            }
         *        })
         *        worker.postMessage({ query, chunklist: chunks[chunk] })
         *    }
         *  })
         * */ 

        
         let values = citylist.filter(({ name, state, coord }) => name.toUpperCase().includes(query.toUpperCase()))
        let response: IResponse<TCities> = {
            status: "success",
            message: query,
            data: values
        }
        res.locals.data = response
        res.status(200).json(response)
        next()
    }

}