const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

///////////////// [ BLOG SCHEMA HERE ] /////////////////
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: objectId,
        required: true,
        ref: ('Author')
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    isPublished: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

///////////////// [ EXPRORTED BLOG MODEL ] /////////////////
module.exports = mongoose.model("Blog", blogSchema)