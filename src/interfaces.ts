import { Request, Response, Router, NextFunction } from 'express';

export type IRequest = (req: Request, res: Response) => any

export type ICityResponse = (req: Request, res: Response<IResponse<TCities>>, next?: NextFunction) => any

export interface IController {
    create: IRequest;
    find: IRequest;
    findAll: IRequest
}

export interface ICityController extends IController {
    search: (req: Request, res: Response) => any
}

export interface IResources<IController> {
    controller: IController;
    router: Router;
    cacheStrategy: ICache;
}

export type TCities = Array<ICity>
export interface ICity {
    id: number,
    name: string,
    state: string,
    country: string,
    coord: {
        lon: number,
        lat: number
    }
}

export interface IResponse<T> {
    status: "error" | "success",
    message: string,
    misc?: any
    data: T | null
}


export interface ICache {
    getUrlFromRequest: (req: Request) => string;
    set: (req: Request, res: Response, next: NextFunction) => any;
    get: (req: Request, res: Response, next: NextFunction) => any;
    clear?: (req: Request, res: Response, next: NextFunction) => any;
}
