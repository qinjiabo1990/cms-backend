const supertest = require('supertest');
const app = require('../../src/app');
const Student = require('../../src/models/student');
const { connectToDB, disconnectDB } = require('../../src/utils/db');

const request = supertest(app);

describe('/students', () => {
    //hooks - 提前写好的函数，如果重新定义就执行，为重新定义就跳过
    beforeAll(() => {
        connectToDB();
    })
    afterAll(async ()=>{
        await disconnectDB();
    })
    beforeEach(async () => {
        await Student.deleteMany({});
    })
    afterEach(async () => {
        await Student.deleteMany({});
    })
    describe('POST', () => {
        const validStudent = { 
            firstName: 'Bob', 
            lastName: 'Qin', 
            email: '123@gmail.com' 
        };

        const createStudent = async (body) => {
            return request.post('/api/students').send(body);
        }

        //it() == test()
        it('should return 201 if request is valid', async () => { 
            //connectToDB();
            const res = await createStudent(validStudent);
            expect(res.statusCode).toBe(201);
            // await Student.deleteMany({});//清空所有数据，以防互相影响 -- 不优雅
        });

        it('should save student to database if request is valid', async () => {
            //connectToDB();
            await createStudent(validStudent);
            const student = await Student.findOne({ email: validStudent.email });
            expect(student.firstName).toBe(validStudent.firstName);
            expect(student.lastName).toBe(validStudent.lastName);
        });

        // it('should return 400 if email is missing', async() => {
        //     const student = {firstName: validStudent.firstName, lastName: validStudent.lastName};
        //     const res = await createStudent(student);
        //     expect(res.statusCode).toBe(400);
        // })

        it.each`
            field          | value
            ${'firstName'} | ${undefined}
            ${'lastName'}  | ${undefined}
            ${'email'}     | ${undefined}
            ${'firstName'} | ${'a'}
            ${'email'}     | ${'@'}
            ${'email'}     | ${'a@'}
            ${'email'}     | ${'a@b'}
            ${'email'}     | ${'a@b.c'}
        `('should return 400 when $field is $value', async ({field, value}) => {
            const student = {...validStudent};
            student[field] = value;
            const res = await createStudent(student);
            expect(res.statusCode).toBe(400);
        })
    })
})



// test('1+1===2', () => { //'这里是描述'
//     expect(1 + 1).toBe(2);
// })