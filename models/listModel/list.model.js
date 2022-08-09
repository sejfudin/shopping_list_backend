import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listSchema = new Schema({

    listName: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    productList: [
        {
            productName: {
                type: String
            },
            quantity: {
                type: Number
            }
        }
    ]
},
    { timestamps: true }
);

export default mongoose.model("List", listSchema);