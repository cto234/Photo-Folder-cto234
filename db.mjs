import mongoose from 'mongoose'

const SongSchema = new mongoose.Schema({
    //All this data will be read from spotify 
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    plays: {type: Number, required: true}
})

const ListSchema = new mongoose.Schema({
    //contains a list of songs. Multiple lists will be created based on different parameters
    songs: [{SongSchema}]
})

const user = new mongoose.Schema({
    //each user has an array of lists - I haven't decided what they'll be yet but for example
    //top songs all time, past month, first songs listened to on spotify, etc
    //depends exactly what data is made available through the spotify API 
    //I know # of plays is available at least
    lists: [{type: mongoose.Schema.Types.ListSchema}]
})