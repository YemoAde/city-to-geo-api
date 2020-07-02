# city-to-geo-api

A simple Typescript/NodeJS City to lat/lon search api hosted [here](http://city-to-geo-api.herokuapp.com/city/search).
Development in progress.
- Uses Simple Caching
- Applies an OOP Design Pattern
- Experiments with worker threads ( 😒 Did not make it faster in my use case)

## Usage

```bash
curl -v http://city-to-geo-api.herokuapp.com/city/search/?
```
For example,
```bash
curl -v http://city-to-geo-api.herokuapp.com/city/search/Lagos
```

## Tests

```bash
npm run test && npm run coverage
```
## Contribution

```bash
npm install
```
- Write Tests



## Todo
- Swagger Documentation
- Authentication
- Advanced Caching (Maybe Redis)
- Request Throttling
- Document Time Evaluation with Worker Threads vs w/o Worker Threads

## Credits
- Open Weather Map

## License
[MIT](https://choosealicense.com/licenses/mit/)
