const mongoose=require('mongoose');

const Schema= mongoose.Schema;

const AuctionSchema=new Schema({
    item_name:{
        type:String,
        required:[true,'Name field is required']
    },
    item_desc:{
        type:String,
        required:[true,'Description field is required']
    },
    start_time:{
        type:Date,
        default: Date.now
    },
    end_time:{
        type:Date,
        default: Date.now
    },
    starting_amount:{
        type:Number,
        required:[true,'Starting Amount field is required']
    },
    winner:{
        type:String
    },
    image_url:{
        type:String
    }

});

const Auction=mongoose.model('auction',AuctionSchema);

module.exports=Auction;