import mongoose from 'mongoose'
import mongooseSlugPlugin from 'mongoose-slug-plugin';

//Each image has an optional caption associated with it, and of course the url of the image itself
const ImageSchema = new mongoose.Schema({
    caption: {type: String, required: false},
    url: {type: String, required: true}
})

//Each folder contains an array of images, but can be empty. A title is requried for each folder.
const FolderSchema = new mongoose.Schema({
    images: [ImageSchema],
    title: {type: String, required: true}
})

FolderSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});

mongoose.model('Image', ImageSchema);
mongoose.model('Folder', FolderSchema);

mongoose.connect('mongodb://127.0.0.1/final-project-cto234');
