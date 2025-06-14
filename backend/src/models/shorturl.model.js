import mongoose from "mongoose";

const shorturlschema = new mongoose.Schema({
    full_url : {
        type : String,
        require : true
    },
    short_url : {
        type : String,
        require : true,
        index : true,
        unique : true
    },
    clicks : {
        type : Number,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const shorturlmodel = mongoose.model("shorturlmodel",shorturlschema)
export default shorturlmodel;
