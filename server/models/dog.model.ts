


import mongoose from "mongoose";


const DogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
    male: { type: Boolean, required: true },
    indoor: { type: Boolean, required: true },
    trained: { type: Boolean, required: true },
    vaccinated: { type: Boolean, required: true },
    pottyTrained: { type: Boolean, required: true },
    sterilized: { type: Boolean, required: true },
    puppy: { type: Boolean, required: true },
    breed:[ {type:String }],
    size: { type: String,enum:['small','medium','large'], required: true },
    contactName: { type: String, required: true },
    contactTel: { type: String, required: true },
    createdAt:{type:Date,default:Date.now}
})


const DogModel = mongoose.model('dogs', DogSchema)


export default DogModel