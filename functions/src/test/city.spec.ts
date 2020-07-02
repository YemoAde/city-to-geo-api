const supertest = require('supertest');
const app = require('../index');

describe("Testing city-to-geo-api", () => {

    it("tests the base route and returns true for status", async () => {

        const response = await supertest(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);

    });
    it("tests the search with short input and returns error for status", async () => {

        const response = await supertest(app).get('/city/search/ad');

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');

    });
    it("tests the search route and returns true for status", async () => {
        const response = await supertest(app).get('/city/search/Lagos');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    it("tests the search route and check for coordinates", async () => {
        const response = await supertest(app).get('/city/search/Lagos');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array)
        expect(response.body.data[0]).toHaveProperty('coord');
    });
})