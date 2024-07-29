import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"


dotenv.config()



const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DATABASE_STRING,
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        //await RestaurantsDAO.injectDB(client) // getting intial refrence to the database's restaurant collection
        //await ReviewsDAO.injectDB(client) // getting initial refrence to the database's reviews collection
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })