import mongoose from "mongoose";

const imageModel = new mongoose.Schema({
    filename: {type: String, required: [true, 'file must have a filename']},
    originalname: {type: String, required: [true, "file must have an originalname"]},
    path: String
})

const Image = mongoose.model("Image", imageModel)
export default Image