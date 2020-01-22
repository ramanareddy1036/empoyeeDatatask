const express     = require('express');
const path = require('path');
require(path.resolve('./db/mongo.js'));
const userRoutes = require(path.resolve('./router/user.js'));

const app   = express();
const port  =  process.env.PORT || 3005

app.use(express.json());

app.use(userRoutes);


app.listen(port,() =>{
    console.log('server is up on ' + port);
})