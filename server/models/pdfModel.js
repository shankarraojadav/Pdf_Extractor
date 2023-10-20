import mongoose from "mongoose";


const pdfSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signin',
        required: true
    },

    url: {
        type: String,
        required: true
    },

    publicId: String,
    upladedAt: {
        type: Date,
        default: Date.now
    }
});


const PdfModel = mongoose.model('pdfFile', pdfSchema);

export default PdfModel;