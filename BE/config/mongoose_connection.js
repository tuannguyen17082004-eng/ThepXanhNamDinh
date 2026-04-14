const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(`${process.env.MONGODB_URI}/ThepXanhNamDinh`)
.then(() => {
    console.log("Connect to database successful!");
})
.catch((err) => {
    console.log("Something wrong?" + err);
});

module.exports = mongoose.connection;