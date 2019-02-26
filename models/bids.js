const mongoose=require('mongoose');

const Schema= mongoose.Schema;

const BidsSchema=new Schema({
    item_name:{
        type:String,
        required:[true,'Item Name field is required']
    },
    user_name:{
        type:String,
        required:[true,'User Name field is required']
    },
    amount:{
        type:Number,
        required:[true,'Bid Amount field is required']
    }

});

const Bids=mongoose.model('bids',BidsSchema);

module.exports=Bids ;