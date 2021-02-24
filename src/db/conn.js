const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});
const connection = mongoose.connection;
connection.then(() => {
    console.log('db connection...!!!');
}).catch(() => {
    console.log('no connection...!!!');
});

module.exports=connection;