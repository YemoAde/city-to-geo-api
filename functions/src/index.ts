import * as functions from 'firebase-functions';
import * as express from 'express'
import CityResource from './resources/City';
import CityController from './controller/City';
import SimpleCache from './middleware/cache';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.json({ status: true })
});

app.use('/city',
    new CityResource(
        new CityController(),
        new SimpleCache(5 * 60)
    ).getRouter())

    export default app;


export const application = functions.https.onRequest(app);