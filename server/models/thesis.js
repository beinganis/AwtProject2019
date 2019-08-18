const mongoose = require('mongoose'); 

var thesisSchema = new mongoose.Schema({
    
    title: {
        type:String,
        required: 'title can\'t empty'
    },
   description: {
        type:String,
        required: 'atleasr 200 lines'
    },
    
    professor_id: {
        type:Number,
        required: true
    }

    

});


mongoose.model('Thesis',thesisSchema,'thesis');