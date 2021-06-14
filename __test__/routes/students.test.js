const supertest = require('supertest');
const app = require('../../src/app');
const Student = require('../../src/models/student');
const { connectToDB } = require('../../src/utils/db');

const request = supertest(app);

//it() == test()
it('should return 201 if request is valid', async () => {
    connectToDB();
    const res = await request
        .post('/api/students')
        .send({ firstName: 'Bob', lastName: 'Qin', email: '123@gmail.com' });
    expect(res.statusCode).toBe(201);
});

it('should save student to database if request is valid', async () => {
    connectToDB();
    await request 
        .post('/api/students')
        .send({ firstName: 'Bob', lastName: 'Qin', email: '123@gmail.com' });
    const student = await Student.findOne({email:'123@gmail.com'});
    expect(student.firstName).toBe('Bob');
    expect(student.lastName).toBe('Qin');
});

// test('1+1===2', () => { //'这里是描述'
//     expect(1 + 1).toBe(2);
// })