const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    filePath: {
        type: String,
        required: true,
        trim: true
    },
    fileName:
    {
       type: String,
       trim:true
    },
    
    fileType: String,
    fileSize: String,
    
    fileUploadDate: Date
});

mongoose.model('Media', MediaSchema , 'files');


module.exports.addNewFile = (newFile, callback) => {
    newFile.save(callback);
}

