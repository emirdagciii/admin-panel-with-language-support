const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        baslik:{type:{}, require:true},
        img:{type:String, require:true},
        description:{type:{}, require:true},
        amazon:{type:String, require:true},
        trendyol:{type:String, require:true},
        pttAvm:{type:String, require:true},
    },
    {timestamps:true}
);

const Product = mongoose.model("products",ProductSchema);
module.exports = Product;