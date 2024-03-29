import express, {Request, Response} from "express";
import {protect} from "../controllers/authController";
import multer from "multer";
import * as path from "path";
import Image from "../models/imageModel";
import fs from "fs";

const router = express.Router();


// router.route("/").post(upload.single("image"), uploadImage)

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

router.route('/upload').post(protect, upload.single('image'), async (req, res) => {
    try {
        console.log("hellooo")
        const image = new Image({
            filename: req.file!.filename,
            originalname: req.file!.originalname,
            path: `/uploads/${req.file!.filename}`, // Adding the path here
        });
        const response = await image.save();
        res.status(200).json({status: "success", data: response});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
});

router.route("/get/:fileId").get(async (req: Request, res: Response) => {
    try {
        const image = await Image.findById(req.params.fileId);
        if (image) {
            res.json({status: "success", data: image})
        } else {
            res.status(404).json({status: "fail", message: 'Image not found'});
        }
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
});
router.route("/delete/:filename").delete(async (req: Request, res: Response) => {
    try {
        const filename = req.params.filename;
        // Check if a filename is provided
        if (!filename) {
            return res.status(400).json({error: 'Filename is missing in the URL.'});
        }
        // Navigate one level above
        const parentDirectory = path.resolve(__dirname, '..');
        const filePath = path.join(parentDirectory, 'uploads', filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
                res.status(500).json({error: 'Unable to delete the file'});
            } else {
                console.log(`File ${filename} deleted successfully`);
                res.status(200).json({message: 'File deleted successfully'});
            }
        });
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
})

export default router