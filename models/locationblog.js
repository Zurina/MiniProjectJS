var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationblogSchema = new Schema({
    info: {type: String, required: true},
    pos: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true}
    },
    // Not embedding, this represents a one to many relationship with the reference on the many side. DENORMALIZING
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // verify whether unique works this way
    likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    created: {type: Date, default: Date.now}
})

//Does not get into the database
LocationblogSchema.virtual('slug').get(function() {
    return "/locationblog/"+this.id
})

LocationblogSchema.virtual('likedByCount').get(function() {
    return this.likedBy.length
})

module.exports = mongoose.model("locationblog", LocationblogSchema)