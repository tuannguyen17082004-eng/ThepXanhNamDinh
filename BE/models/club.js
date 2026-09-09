const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    name: { type: String, require: true },
    shortname: { type: String, require: true },
    logo: {
        link: { type: String, require: true },
        id: { type: String, require: true }
    }
})

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;