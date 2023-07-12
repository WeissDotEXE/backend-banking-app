import {Response} from "express";
import multer from "multer";
import ImageModel from "../models/imageModel";

const Storage = multer.diskStorage({
    destination: "Uploads",
    filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('testImage')

const uploadFile = async (req: any, res: Response) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({status: "fail", message: err})
            }
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png/jpg/jpeg'
                }
            })
            newImage.save();
        })

    } catch (error) {
        res.status(400).json({status: "error", message: error})
    }
}

export {uploadFile}