'use strict';


let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let User = require('./model/users');
let app = express();
let router = express.Router();
let port = process.env.API_PORT || 3001;
let fs = require('fs');
let mongoDB = 'mongodb://test:test@ds145892.mlab.com:45892/mydb';
mongoose.connect(mongoDB, { useMongoClient: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use('/api', router);
app.listen(port, function() {
    console.log(`api running on port ${port}`);
    readFiles();
});
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});
router.route('/getScore')
    .post(function(req,res){
        let result = findTotalScore(req.body);
        console.log(result);
        return res.json(result);

});
router.route('/users')
    .get(function(req,res){
        User.find(function(err,users){
            if(err)
                res.send(err);
            let avg = findAverage(users);
            res.json({ userlist: users , avg: isNaN(avg) ? 0 : avg});
        });
    })
    .post(function(req,res){
        let user = new User();
        user.user = req.body.user;
        user.age = req.body.age;
        user.gender = req.body.gender;
        user.pushups = req.body.pushups;
        user.situps = req.body.situps;
        user.score = req.body.score;
        user.status = req.body.status;
        user.save(function(err){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    });

let pushups_age = [],pushups = [],pushups_rep = [],situps_age = [],situps = [],situps_rep = [];

//Functions to read file
function readFiles(){
    read('push_up.txt',pushups_age,pushups_rep,pushups);
    read('sit_up.txt',situps_age,situps_rep,situps);
}

function read(filename,age,rep,dataArray){
    let all_rows = [];
    fs.readFile(filename,function(err,data){
        if(err) throw err;
        all_rows = data.toString().split("\n");
        let range = all_rows[0].split('\t');
        age.push(17);

        for(let i=1;i<range.length;i++){
            age.push(parseInt((''+range[i]).substr(0,2)));
        }

        for(let i=2;i<all_rows.length;i++){
            let temp = all_rows[i].split('\t');
            rep.push(parseInt(temp.shift()));
            dataArray.push(temp);
        }
    });
}
//Function to find average for dashboard
function findAverage(users){
    let sum = 0, avg = 0;
    for(let i=0;i<users.length;i++){
        sum += users[i].score;
    }
    avg = sum / users.length;
    return avg.toFixed(2);
}
//Function to find total score for user
function findTotalScore(user){
    let ageIndex = 0,pushup_score = 0,situp_score = 0,score = 0,status = 'Fail';
    for(let i=0;i<pushups_age.length-1;i++){
        if(pushups_age[i] <= user.age && pushups_age[i+1] > user.age)
            ageIndex = i;
    }
    if (ageIndex === undefined)
        ageIndex = pushups_age.length-1;

    let start = user.gender === 'M' ? 0 : 1;
    let repIndex = pushups_rep.indexOf(parseInt(user.pushups));
    if(repIndex !== -1 && !isNaN(user.pushups))
        pushup_score = parseInt(pushups[repIndex][start+ageIndex*2]);

    repIndex = situps_rep.indexOf(parseInt(user.situps))
    if(repIndex !== -1 && !isNaN(user.situps))
        situp_score = parseInt(situps[repIndex][ageIndex]);

    score = pushup_score + situp_score ;

    if(pushup_score > 60 && situp_score > 60)
        status = 'Pass';
    return {
        status:status,
        score:score
    };
}