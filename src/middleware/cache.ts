import { Request, Response, NextFunction } from 'express'
import { ICache } from '../interfaces';
// import NodeCache from 'node-cache';
const NodeCache = require('node-cache')


class SimpleCache implements ICache {

    private cache: any;

    constructor(ttl: number) {
        this.cache = new NodeCache({ stdTTL: ttl })
    }
    getUrlFromRequest = (req: Request): string => {
        const url = req.originalUrl
        return url
    }

    set = (req: Request, res: Response, next: NextFunction): any => {
        const url = this.getUrlFromRequest(req)
        this.cache.set(url, res.locals.data)
        return next()
    }
    get = (req: Request, res: Response, next: NextFunction): any => {
        const url = this.getUrlFromRequest(req)
        const content = this.cache.get(url)
        console.log(url)
        if (content) {
            return res.status(200).json(content)
        }
        return next()
    }

}

export default SimpleCache;