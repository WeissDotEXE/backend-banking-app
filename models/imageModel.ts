import mongoose from "mongoose";

const imageModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Image must have a name"]
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model("Image", imageModel)
export default Image