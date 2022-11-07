import './db.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

const Image = mongoose.model('Image');
const Folder = mongoose.model('Folder');

//=======       ^ APP  SETUP ^     ==============================================//
//-------------------------------------------------------------------------------//
//=======       v MIDDLEWARE v     ==============================================//



//=======       ^ MIDDLEWARE ^     ==============================================//
//-------------------------------------------------------------------------------//
//=======       v ROUTE HANDLERS v ==============================================//

app.get('/', (req, res) => {                //home page
    Folder.find({}).sort('-createdAt').exec((err, folders) => {
        res.render('index', {home: true, folders: folders});
      });});

app.get('/add', (req, res) => {             //add folder page
    res.render('add');
})

app.post('/add', (req, res) => {
    const newFolder = new Folder({ title: req.body.title });   
    newFolder.save((err, result) => {
        if(err){
            console.log(err);
            res.render('error', {message: 'Error adding article'}); 
        }else{
            console.log(result);
            console.log(result.title + " created successfully");
            res.redirect('/');
        }
    })
})

app.get('/folder/:slug', (req, res) => {
    res.render('folder-contents', {message: "Work in progress"});
})

//=======       ^ ROUTE HANDLERS ^ ==============================================//




app.listen(process.env.PORT || 3000);
