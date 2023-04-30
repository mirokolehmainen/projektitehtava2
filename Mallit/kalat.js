const mongoose = require('mongoose')

//Tehdääm schema ja määritellään lisäämisehdot
const KalatSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Kirjoita kalan nimi"]
        },
        _id: {
            type: Number,
            required: true,
            
        },
        description:{
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Kalat = mongoose.model('Kalat', KalatSchema);

module.exports = Kalat;