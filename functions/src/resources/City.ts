import { IResources, ICityController, ICache } from "../interfaces";
import { Router, } from 'express';

export default class CityResource implements IResources<ICityController> {
    controller: ICityController;
    router: Router = Router();
    cacheStrategy: ICache;

    //dependency Injection
    constructor(controller: ICityController, cacheStrategy: ICache) {
        this.controller = controller;
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