

import express from 'express'
import cors from 'cors'
import database  from './database'
import userRouter from './routes/user.routes'
import dogRouter from "./routes/dog.routes"
import multer from 'multer'
import path from 'path'
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/users", userRouter)
app.use('/api/dog',dogRouter)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // הגדרת תיקיית היעד לשמירת הקבצים
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // הגדרת שם הקובץ (לדוגמה: שם מקורי עם תאריך)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });

// יצירת route להעלאת קבצים
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log("api/upload")
  if (!req.file) {
      console.log("api/upload !req.file")
      res.status(400).send('No file uploaded.');
      return
  }

  // יצירת URL לקובץ שהועלה
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
    res.json({
            status:201,
            message: 'File uploaded successfully!',
            data: fileUrl
  });
});


app.listen(5000, () => {
    console.log("server listening on port 5000")
    
    database.then(() => {
        console.log("mongodb connected (:")
    })
})


