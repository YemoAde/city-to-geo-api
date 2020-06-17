import { IResources, ICityController, ICache, IResponse, TCities } from "../interfaces";
import { Router, } from 'express';

const CityRouter = Router()
CityRouter.get('/search/:q',)

export default class CityResource implements IResources<ICityController> {
    controller: ICityController;
    router: Router = Router();
    cacheStrategy: ICache;

    //dependency Injection
    constructor(controller: ICityController, cacheStrategy: ICache) {
        this.cacheStrategy = cacheStrategy;
        this.router.get('/search/:query',
            cacheStrategy.get,
            controller.search,
            cacheStrategy.set
        )
    }

    getRouter() {
        return this.router;
    }
}