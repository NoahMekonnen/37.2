process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb")

let item1 = { price: 3, name: "chips" }

beforeEach(function () {
    items.push(item1);
});

afterEach(function () {
    items.length = 0;
})

describe("GET /items", function(){
    test("Get all the items", async function(){
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: [item1]})
    })
})

describe("POST /items", function(){
    test("Add an item", async function(){
        let item2 = { price: 2.50, name: "Water" }
        const res = await request(app).post('/items').send(item2)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({"added": item2})
    })
})

describe("GET /items/:name", function(){
    test("Get an item", async function(){
        const res = await request(app).get(`/items/${item1.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(item1)
    })
})

describe("PATCH /items/:name", function(){
    test("Change an item", async function(){
        const res = await request(app).patch('/items/chips').send({ price: 4, name: "chips" })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"updated": item1})
    })
})

describe("DELETE /items/:name", function(){
    test("Delete an item", async function(){
        const res = await request(app).delete('/items/chips')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message:"Deleted"})
    })
})