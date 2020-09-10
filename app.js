require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let cors = require('cors')

let user = require('./controllers/usercontroller');
let character = require('./controllers/charactercontroller');
let attribute = require('./controllers/attributecontroller');
let race = require('./controllers/racecontroller');
let classes = require('./controllers/classcontroller');


sequelize.sync();
//sequelize.sync({force: true})
app.use(cors());
app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', user);
app.use('/character', character);
app.use('/attribute', attribute);
app.use('/race', race);
app.use('/class', classes);


app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`);
})