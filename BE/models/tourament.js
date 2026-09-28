const mongoose = require("mongoose");

const touramentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    logo: {
        link: { type: String, require: true },
        id: { type: String, require: true }
    }
})

const Tourament = mongoose.model("Tourament", touramentSchema);

module.exports = Tourament;