const request = require("supertest")
const app = require("../app.js")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

beforeAll((done) => {

    queryInterface.bulkInsert("Todos",
        [
            {
                id: 1001,
                tittle: "AAA",
                description: "AAA",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1002,
                tittle: "BBB",
                description: "BBB",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1003,
                tittle: "CCC",
                description: "CCC",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
    ).then(() => {
        done();
    }).catch((err) => {
        console.log(err)
    })
})

afterAll((done) => {

    queryInterface.bulkDelete("Todos", null, {})
        .then(() => {
            done()
        }).catch(err => {
            console.log(err)
        })
})

describe('GET Todos', () => {


    it("List Todos", (done) => {
        // supertest
        request(app)
            .get("/todos")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.length).toEqual(3)
                const todos = response.body;
                const firstTodo = todos[0]
                expect(firstTodo.id).toEqual(1001)
                expect(firstTodo.tittle).toEqual("AAA")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("Get Detail Todos", (done) => {
        // supertest
        request(app)
            .get(`/todos/${1001}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                console.log(response.body, "<<<<<<")
                const todo = response.body;
                expect(todo.id).toEqual(1001)
                expect(todo.tittle).toEqual("AAA");
                expect(todo.description).toEqual("AAA");
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("Test Error Not Found", (done) => {
        // supertest
        request(app)
            .get(`/todos/${1001123123}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                const { message } = response.body;

                expect(message).toBe("Error Not Found")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})