const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { Book, User } = require('../models');

db.once('open', async () => {
    // Create books
    let books = [];
    let BookModel = mongoose.model('Book', Book)
    for(let i = 0; i < 100; i++){
        let authors = []
        let authorCount = getRandomInt()
        for(let j = 0; j < authorCount; j++){
            authors.push(faker.random.word())
        }
        let description = faker.lorem.sentence()
        let title = faker.lorem.words(getRandomInt())
        let image = `${faker.image.nature()}?random=${Math.round(Math.random() * 1000)}`
        let link = faker.internet.url()
        let bookId = faker.datatype.uuid()
        books.push({
            authors,
            description,
            title,
            image,
            link,
            bookId
        })
    }

    BookModel.insertMany(books).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });

});

function getRandomInt() {
    let rando = Math.floor(Math.random() * 3)
    if(rando === 0) {
        rando = 1
    }

    return rando;
}
