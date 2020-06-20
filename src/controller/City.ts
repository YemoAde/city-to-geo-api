import { ICityController, IRequest, ICityResponse, TCities, IResponse } from '../interfaces';
const citylist: TCities = require('./../city.list.json');

export default class CityController implements ICityController {
    search: ICityResponse = async (req, res, next) => {
        const { query } = req.params;

        if (query.length < 3) {
            return res.status(400).json({
                status: 'error',
                message: "Query too short",
                data: []
            })
        }
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