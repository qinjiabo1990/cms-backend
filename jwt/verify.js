const jwt = require('jsonwebtoken');

const secret = "secret";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjIzNjMwODY2LCJleHAiOjE2MjM3MTcyNjZ9.dDP2IhRAfo5diAHXOdMBb75r4MO16jFmWO-7s8wglmY'

const valid = jwt.verify(token, secret)

console.log(valid);