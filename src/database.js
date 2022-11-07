const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/note-app', { 
    //useCreateIndex: true,
    useNewUrlParser: true,
    //useFindAndModify: false
})
.then(db => console.log('DB esta Conectado'))
.catch(err => console.error(err));