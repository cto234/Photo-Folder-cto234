import mongoose from 'mongoose'
import mongooseSlugPlugin from 'mongoose-slug-plugin';

//Each image has an optional caption associated with it, and of course the url of the image itself
const ImageSchema = new mongoose.Schema({
    caption: {type: String, required: false},
    url: {type: String, required: true}
})

//Each folder contains an array of images, but can be empty. A title is requried for each folder.
const FolderSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
})

FolderSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});

mongoose.model('Image', ImageSchema);
mongoose.model('Folder', FolderSchema);


//connection to MongoDB Atlas - https://cloud.mongodb.com/v2/6361786d773fda03b90618ce#clusters
mongoose.connect('mongodb+srv://cto234:DAIvyPcaHYTl46Z3@final.nzkn2yu.mongodb.net/?retryWrites=true&w=majority');
