import multer from 'multer';
import path from 'path';

const multerConfig = {
    dest: path.resolve('./tmp/uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('./tmp/uploads'));
        },
        filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
        },
        limits: {
            fileSize: 1024 * 1024 * 5, 
        },
        fileFilter: (req, file, cb) => {
            const allowTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
            ];

            if(allowTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Tipo de arquivo enviado não permitido.'));
            }
        }
    })
}

export default multerConfig;