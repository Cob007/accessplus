/**
 * Created by michealcob on 7/11/18.
 */
const mongoose = require('mongoose');

const VisitorSchema = mongoose.Schema({
    viname : String,
    number : String,
    company : String,
    viaim : String,
    cond : String,
    status : Boolean
}, {
    timestamps : true
});

module.exports = mongoose.model("Visitor", VisitorSchema);