import './db.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { ppid } from 'process';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

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
    Folder.findOne({slug: req.params.slug})
    .populate('images')                         //folder schema only references images. Need to populate
    .exec((err, folder) => {
        if(err){
            console.log(err);
        }else{
            res.render('folder-contents', {
            title: folder.title,
            slug: folder.slug,
            images: folder.images
            });
        }     
    });
});
    

app.post('/folder/:slug', (req, res) => {
    const newImage = new Image({
        url: req.body.url,
        caption: req.body.caption
    });
    newImage.save((err, result) => {
        if(err){
            console.log(err);
            res.render('error', {message: 'Error adding image'});
        }else{
            //now add to folder...
            Folder.findOne({slug: req.params.slug}, function(err, folder){
                if(err){
                    console.log(err);
                }else{
                    console.log("Adding this image: ", result);
                    folder.images.push(result._id);//save image's id to the article whose page we're on
                    console.log("To this folder: ", folder);
                    console.log("Folder is: "+folder.images.length+" length");
                    folder.save((err, result) => {
                        const route = '/folder/'+req.params.slug;    //res.redirect('/folder/:slug') wasn't working. This does.
                        res.redirect(route); 
                    });
                    
                }
            });

        }
    })
})

app.get('/folder/:slug/add-image', (req, res) => {
    res.render('add-image', {slug: req.params.slug});
})

//=======       ^ ROUTE HANDLERS ^ ==============================================//




app.listen(process.env.PORT || 3000);
