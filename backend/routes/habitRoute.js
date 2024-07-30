import express from 'express';
import { Habit } from '../models/habit.js'

const router = express.Router();

// Get route to get all books from the database
router.get('/', async (request, response) => {
    try{
        const habit = await Habit.find({});
        return response.status(200).json({
            count: habit.length,
            data: habit

        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: (error.message + "but at least backend is working") });

    }
})
// // Get route to get one book from the database
// router.get('/:id', async (request, response) => {
//     try{
//         const { id } = request.params;
//         const book = await Book.findById(id);
//         return response.status(200).json(book);
//     } catch (error){
//         console.log(error.message);
//         response.status(500).send({ message: error.message });

//     }
// })
// // Post route -> route for Save a new book
// router.post('/', async (request, response) => {
//     try {
//         //input validation
//         if (!request.body.title || !request.body.author || !request.body.publishYear){
//             return response.status(400).send({message: 'Send all required fields: title, author, publishYear'});
//         }
//         //initialize a new book
//         const newBook = {
//             title: request.body.title,
//             author: request.body.author,
//             publishYear: request.body.publishYear,
//         };

//         const book = await Book.create(newBook); //using a mongoose.model which has a mongoose Schema

//         return response.status(201).send(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// // Route for Update a book
// router.put('/:id', async (request, response) => {
//     try{
//         if ( !request.body.title || !request.body.author || !request.body.publishYear ) {
//             return response.status(400).send({message: 'Send all required fields: title, author, publishYear'});
//         }
//         const { id } = request.params;

//         const result = await Book.findByIdAndUpdate(id, request.body);

//         if (!result) {
//             return response.status(404).json({ message: 'Book not ound' });
//         }

//         return response.status(200).send({ message: 'Book updated successfully' });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });
// // Route for deleting a book
// router.delete('/:id', async (request, response) => {
//     try {
//         const { id } = request.params;
//         const result = await Book.findByIdAndDelete(id);
//         if(!result){
//             return response.status(404).json({ message: 'Book not found '});
//         }

//         return response.status(200).send({ message: 'Book deleted successfully' });
        
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// })

export default router;