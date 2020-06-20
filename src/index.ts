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

app.listen(process.env.PORT || 3000, () => {
    console.log(`server started on port ${process.env.PORT || 3000}`)
})

module.exports = app;