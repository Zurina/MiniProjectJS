var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcryptjs = require('bcryptjs')

var JobSchema = new Schema({
    type: String,
    company: String,
    companyUrl: String
})

var UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}, // should be hashed though ...
    firstname: String,
    lastname: String,
    email: {type: String, required: true},
    created: {type: Date, default: Date.now},
    lastUpdated: Date, // middleware will take care of this
    // Observe embedding
    jobs: [JobSchema]
})

UserSchema.pre('save', function(next) {
    this.password = bcryptjs.hashSync(this.password, bcryptjs.genSaltSync(10)); // hashing
    this.lastUpdated = new Date()
    next()
})

UserSchema.pre('update', function(next) {
    this.update({}, {$set : { lastUpdated : new Date() } })
    next()
})

module.exports = {
    user: mongoose.model('User', UserSchema),
    job: mongoose.model('Job', JobSchema)
}