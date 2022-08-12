require('dotenv').config();

const config = {

	port: process.env.PORT,

	mongo_db: process.env.MONGO_DB,

};

module.exports = { config };