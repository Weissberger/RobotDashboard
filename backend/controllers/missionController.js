const Mission = require("../models/Missions");
const email = require("../handlers/email.js");
const {Parser} = require('json2csv');
const fs = require('fs');

exports.storeMission =  async(req, res, next) => {
    console.log(req.user, 'user!?!?')
    if(!req.user) return res.status(401).send('Not Authorized');
    const {type, data} = req.body
    const newMission = new Mission({ user: req.user, type, data: JSON.stringify(data) });
    // Hash password before saving in database
    newMission.save().then(()=> {
        console.log('sending mail')
        return res.status(200).send("success")
    });
}

exports.emailMissions =  async(req, res, next) => {
    if(!req.user) return res.status(401).send('Not Authorized');
    const fields = ['type', 'data']
    let missions = await Mission.find({user: req.user._id}, {_id:0, user:0, __v:0});
    const data = missions;
    console.log(missions)
    const parser = new Parser({fields: fields})
    const csv = parser.parse(missions)
    csvFileName = 'csvData.csv'
    fs.writeFile(__dirname + '/../temp/' + csvFileName, csv, (err) => console.log(err, 'error?'))
    email.sendMail({
        user: req.user, 
        subject: 'mission history',
        attachments: [{
            filename:csvFileName,
            path: __dirname + '/../temp/' + csvFileName
        }]
    })
    return res.status(200).send('success');
}