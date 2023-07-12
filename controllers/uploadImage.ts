import Image from "../models/imageModel";
import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import multer from "multer";

let fileName: string | null = null;

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        fileName = `${file.fieldname}-${Date.now()}.${extension}`;
        cb(null, fileName);
    },
});

//@ts-ignore
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb("Not an Image", false)
    }
}

const uploadImage = async (req: Request, res: Response) => {
    try {
        const {name, description} = req.body;

        const obj = new Image({
            name: fileName,
            description,
            img: {
                // @ts-ignore
                data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
                contentType: "image/png",
            },
        })

        const response = await Image.create(obj)
        res.status(200).json({status: "success", data: response})
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

export {uploadImage, upload}