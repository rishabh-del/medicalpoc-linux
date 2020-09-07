'use strict';

var fs = require('fs');
var os = require('os');
var router = require('./router');
var express = require('express');
var app = express();
//server = http.createServer(app);
var queries = require('./blockchainController/queries');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
var compression = require('compression');
var helmet = require('helmet');
var { User } = require('../models/userSchema');
var { Org } = require('../models/orgSchema');
var authy = require('authy')('Kl1QZBwUjW6L5NKfiUv7bj0KFF0RGlYm');
//var createpdf = require('../backend/createpdf');
var moment = require('moment');
var yamlGenerator = require('../../first-network/generateYaml');
var scriptGenerator = require('../../first-network/generateScript');
const util = require('util');
// Need cookieParser and expressSession for session support
var expressSession = require('express-session');
// In memory session store
var sessionStore = new expressSession.MemoryStore;
const exec = util.promisify(require('child_process').exec);
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../frontend`));
app.use(bodyParser.urlencoded({
   extended: true
}));
// *******remove these once Angular front end is written ********
app.set('views', `${__dirname}/../frontend`); // __dirname is {workspace}/build
app.engine('html', require('ejs').renderFile);
app.use(compression()); //Compress all routes
app.use(helmet());
app.set('view engine', 'html');
var Users = [];
app.use(router);
app.use(expressSession({ key: 'JSESSIONID', secret: 'whatever', store: sessionStore, maxAge: Date.now() + (1000), resave: false, saveUninitialized: true }));

app.post('/medicalHistory', async (req, res) => {
   console.log("inside medicalHistory", req.body.patientKey, req.body.date);
   let data = {
      key: req.body.patientKey,
      date: req.body.date
   }
   let response = await queries.medicalHistory(data);
   res.send(response.result);
});

app.post('/medicalHistoryForDoctor', async (req, res) => {
   console.log("inside medicalHistoryForDoctor", req.body.patientKey, req.body.date);
   var arr = [];
   for (var i = 0; i < req.body.patientKey.length; i++) {
      console.log(req.body.patientKey[i]);
      let data = {
         key: req.body.patientKey[i],
         date: req.body.date[i]
      }
      let response = await queries.medicalHistory(data);
      arr.push(JSON.parse(response.result));

   }
   res.send(arr);
});

app.get('/getAllPdf', async (reque, respo) => {
   var patientId = null;
   var date = new Date();
   var file_name = null;
   var file_name_No_Date = null;
   var file = null;
   var k = 0;
   var id = null;
   var proj_location = os.homedir + '/' + 'medicalpoc';
   let response = null;
   var folder_path = os.homedir() + '/' + 'medicalpoc/medical/backend/report';
   console.log(folder_path, " folder path is");
   fs.readdir(folder_path, async (requ, resp) => {
console.log("reso is" , resp);
      resp.forEach(function (element) {
         var patient_file_path = folder_path + "/" + element; // <=== DECLARE IT HERE

         console.log("Loop files/folders : " + patient_file_path);
         fs.readdir(patient_file_path, async (req, res) => {
            //if (res.length == 0) throw "Directory is empty";
            console.log("request", req, "response", res, k, id);
            for (var i = 0; i < res.length; i++) {
               //console.log(res.length());
               file_name_No_Date = res[i].toString().split("_")[0];
               file_name = res[i].toString();
               console.log("patient path ", patient_file_path, element, file_name);
               patientId = element;
               // doctorId = resp[0].split("_")[1]
               date = res[i].split("_")[1].split(".")[0];
               file = fs.readFileSync(patient_file_path + '/' + file_name, 'base64');
               console.log("after split", patientId, date, patient_file_path + '/' + file_name);
               var data = {
                  key: patientId,
                  file: file,
                  date: date,
                  dataType: file_name_No_Date,
               }
               data.date = moment(data.date, 'DD-MMM-YYYY').format('YYYYMMDD')
               response = await queries.createMedicalDoc(data);
            }

            if (response.result == "Successfully committed the change to the ledger by the peer" || response == null) {
               let query = `
         rm -r "${patient_file_path}"
         `
               await exec(query).then(function (response) {
                  console.log("exec result : ", response.stdout.search("Error"));
               }).catch(function (err) {
                  throw err;
               });
            }
         });
      }, this);

   });


   if (response == null) {
      respo.send("No File Found In Directory");

   } else if (response.result == "Successfully committed the change to the ledger by the peer") {
      respo.send(response.result);

   } else {
      respo.send("Error commiting chaincode!");

   }

})



app.post('/allmedicalHistory', async (req, res) => {
   console.log("inside allmedicalHistory", req.body.patientKey);
   let data = {
      key: req.body.dataType + req.body.patientKey
   }
   let response = await queries.allmedicalHistory(data);
   res.send(response.result);
});

app.post('/createMedicalDoc', async (req, res) => {

   var data = {
      key: req.body.patientKey != undefined ? req.body.patientKey : "MED",
      file: req.body.file,
      date: req.body.date
   }

   let response = await queries.createMedicalDoc(data);
   console.log(response.result);
   if (response.result == "Successfully committed the change to the ledger by the peer") {
      res.send(response.result);
   } else {
      res.send("Error commiting chaincode!");
   }
});




app.post('/downloadReport', async (req, res) => {
   var now = new Date();
   var file_path = null;
   let data = {
      key: req.body.dataType + '224633',
      dateFrom: req.body.date_from,
      dateTo: req.body.date_to,
      dataType: req.body.dataType
   }
   if (data.dataType != 'xrayImpression') {
      var file_name = data.key + '_' + data.date + '.pdf';
   } else {
      var file_name = data.key + '_' + data.date + '.jpg'
   }
   data.dateFrom = moment(data.dateFrom, 'DD-MMM-YYYY').format('YYYYMMDD').toString();
   data.dateTo = moment(data.dateTo, 'DD-MMM-YYYY').format('YYYYMMDD').toString();

   // console.log("resultdate", resultDate)
   var finalResult = null;
   console.log("download report data is ", data)
   let response = null;
   if (data.dateTo == '' || data.dateTo == null || data.dateTo == undefined || data.dateTo == 'Invalid date') {
      data.dateTo = '';
      data.dateFrom = '';
      response = await queries.medicalHistory(data);
   } else {
      response = await queries.medicalHistoryByRange(data);
   }
   if (response.result == '') {
      throw new Error("Response came empty");
   } else {
      console.log(JSON.parse(response.result).length);
      var file_list = [];
      var file_data = null;
      let converFinalResult = null;
      // if(JSON.parse(response.result).length == 1){
      for (var i = 0; i < JSON.parse(response.result).length; i++) {
         finalResult = JSON.parse(response.result)[i].Record;
         if (JSON.parse(response.result)[i].Record.dataType != 'xrayImpression') {
            file_name = JSON.parse(response.result)[i].Record.dataType + (i + 1) + '.pdf';
         } else {
            file_name = JSON.parse(response.result)[i].Record.dataType + (i + 1) + '.jpg';

         }
         // JSON.parse(response.result)[i].Record.date = moment(JSON.parse(response.result)[i].Record.date, 'YYYYMMDD').format('DD-MMM-YYYY').toString();

         file_path = os.homedir() + '/' + 'medicalpoc/medical/backend/blockFiles' + '/' + file_name;
         file_data = "data:application/pdf;base64," + finalResult.file;
         finalResult.date = moment(finalResult.date, 'YYYYMMDD').format('DD-MMM-YYYY').toString();
         fs.appendFile(file_path, file_data, (err) => {
            if (err) throw err;
            fs.writeFileSync(file_path, file_data, (err) => {
               if (err) throw err;
            });

         });
         file_list.push(finalResult);

      }
      // console.log(file_list);
      res.send(file_list);

   }


});


/**
 * 

. org3-crypto.yaml
. docker-compose-org3.yaml
. connection-org3.json
. connection-org3.yaml
. configtx.yaml
step1org3.sh
step2org3.sh
step3org3.sh
utils.sh

  rm -r ${req}-artifacts
   rm -r docker-compose-${req}.yaml
   rm -r channel-artifacts/${req}.json
   mkdir ${req}-artifacts
   cp ../medical/backend/configtx.yaml ${req}-artifacts
   cp ../medical/backend/${req}-crypto.yaml ${req}-artifacts
   cp ../medical/backend/docker-compose-${req}.yaml .
   rm -r ../medical/backend/configtx.yaml
   rm -r ../medical/backend/${req}-crypto.yaml
   rm -r ../medical/backend/docker-compose-${req}.yaml
 */
app.post('/addOrg', async (req, res) => {
   // ./addOrg.sh
   var org_number = 0;
   var chaincodeVersion = req.body.chaincodeVersion;
   var port1 = 0;
   var port2 = 0;
   var port3 = 0;
   //var org_name = req;
   console.log("req is", req.body);
   var org_name = req.body.orgName;
   switch (org_name) {
      case "org3":
         // code block
         port1 = 11051;
         port2 = 12051;
         port3 = 11052;
         org_number = 3;
         break;
      case "org4":
         // code block
         port1 = 13051;
         port2 = 14051;
         port3 = 13052;
         org_number = 4;
         break;
      case "org5":
         // code block
         port1 = 15051;
         port2 = 16051;
         port3 = 15052;

         org_number = 5;
         break;
      case "org6":
         // code block
         port1 = 17051;
         port2 = 18051;
         port3 = 17052;

         org_number = 6;
         break;
      case "org7":
         // code block
         port1 = 19051;
         port2 = 20051;
         port3 = 19052;

         org_number = 7;
         break;
      case "org8":
         // code block
         port1 = 21051;
         port2 = 22051;
         port3 = 21052;

         org_number = 8;
         break;
      case "org9":
         // code block
         port1 = 23051;
         port2 = 24051;
         port3 = 23052;

         org_number = 9;
         break;
      case "org10":
         // code block
         port1 = 25051;
         port2 = 26051;
         port3 = 25052;

         org_number = 10;
         break;
      case "org11":
         // code block
         port1 = 27051;
         port2 = 28051;
         port3 = 27052;

         org_number = 11;
         break;
      case "org12":
         // code block
         port1 = 29051;
         port2 = 30051;
         port3 = 29052;

         org_number = 12;
         break;
      default:
         // code block
         port1 = 31051;
         port2 = 32051;
         port3 = 31052;

         org_number = 13;

   }

   yamlGenerator.generateCrypto(org_name, port1, port2, port3);
   yamlGenerator.generateconnectionyaml(org_name, port1, port2, port3);
   yamlGenerator.generateconnectionjson(org_name, port1, port2, port3);
   yamlGenerator.generateConfigtx(org_name, port1, port2, port3);
   yamlGenerator.generateDockerCompose(org_name, port1, port2, port3);
   //scriptGenerator.generateInstallOrgScript(req, chaincodeVersion);


   var query = `
   cd ../../first-network
   rm -r ${org_name}-artifacts
   rm -r docker-compose-${org_name}.yaml
   rm -r channel-artifacts/${org_name}.json
   rm -r connection-${org_name}.yaml
   rm -r connection-${org_name}.json
   mkdir ${org_name}-artifacts
   cp ../medical/backend/configtx.yaml ${org_name}-artifacts
   cp ../medical/backend/${org_name}-crypto.yaml ${org_name}-artifacts
   cp ../medical/backend/docker-compose-${org_name}.yaml .
   cp ../medical/backend/connection-${org_name}.yaml .
   cp ../medical/backend/connection-${org_name}.json .
   rm -r ../medical/backend/configtx.yaml
   rm -r ../medical/backend/${org_name}-crypto.yaml
   rm -r ../medical/backend/docker-compose-${org_name}.yaml
   rm -r ../medical/backend/connection-${org_name}.yaml
   rm -r ../medical/backend/connection-${org_name}.json

   `;
   console.log(query);
   await exec(query).then(function (response) {


      console.log("exec result : ", response.stdout.search("Error"));
      res.status(200).send("success");

   }).catch(function (err) {
      throw err;
   });

})


/**
 * Mongo connection
 */
mongoose
   .connect('mongodb+srv://medicalBlock:medPass@cluster0-qq1fv.mongodb.net/test', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   }).then(() => console.log('DB Connected!')).catch(err => {
      console.log("DB Connection Error:");
   });
var db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function () {
   console.log("connection succeeded");
})
//db.collection('userdata').findOne({emailID: { $eq: email }}, function (error, response){
  // if(error) {
    //  res.send(error);
  // }else{
    //  res.send(response);
   //}
//})

app.post('/loginPage', function (req, res) {
   var email = req.body.email;
   var pass = req.body.password;
   req.session.email = req.body.email;
   // var userType = req.body.role;
   //console.log("login request",email, pass);
   db.collection('userdata').findOne({ 
      emailID: { $eq: email }
   }, function (err, result) {
      console.log(result, err);
      if (result == null) {
         res.status(401).send('User Does not exist');
      } else {
         if (result.password == pass) {
            console.log("success", result);
            res.status(200).send(result);
         } else {
            res.status(401).send('Password Does Not Match');
         }
      }
      req.session.user = result;
   })
})

app.get('/getOrg', function (req, res) {
   Org.find({}, function (err, users) {
      var userMap = {};
      users.forEach(function (user) {
         userMap[user] = user;
      });
      res.send(userMap);
   });
});

app.post('/deleteOrgFromDb', function (req, res) {
   //console.log("org is",req.body.orgName);
   Org.deleteOne({ orgName: req.body.orgName }).then(function (response) {
      // console.log(response);
      if (response.ok == 1) {
         res.status(200).send("deleted");
      } else {
         res.send("No Org found");
      }
   })

});

app.post('/verifyUser', async (req, res) => {
   console.log(req.body);
   authy.verify(req.body.userData.authyId, req.body.otp, function (err, resp) {
      console.log(resp, err);
      db.collection('userdata').findOne({ emailID: req.body.userData.emailID }).then(function (response) {
         console.log("collection", response);

         if (response == null) {
            console.log("user does not exists");
            res.status(401).send("User does not Exists!");
         } else {
            console.log("id is:", response._id);
            db.collection('userdata').updateOne({ "_id": response._id }, // Filter
               { $set: { "verified": true } }

            ).then(function (err, collection) {

               console.log("Record inserted Successfully", err, collection);
               res.status(200).send(collection);
            });
         }
      })
   });
})

app.post('/signup', async (req, respo) => {
   // var name = req.body.name;
   var name = req.body.name;
   var mobile = req.body.mobile;
   var email = req.body.email;
   var pass = req.body.password;
   var role = req.body.userType;
   var userId = req.body.userId;
   // var phone = req.body.phone;

   console.log(email, pass, role);
   var data = {
      name: name,
      mobile: mobile,
      verified: false,
      authyId: '',
      emailID: email.toLowerCase(),
      password: pass,
      role: role,
      userId: userId
   }

   req.session.user = data;
   // var force = false;
   authy.register_user(data.emailID, data.mobile, '+91', function (err, res) {
      if (err) throw err;
      console.log(res, err);
      data.authyId = res.user.id;
      authy.request_sms(data.authyId, function (err, resp) {
         console.log(resp, err);
         // if(err) throw err;
         console.log('Creating package in mongodb');

         db.collection('userdata').findOne({ emailID: data.emailID }).then(function (response) {
            console.log("collection", response);

            if (response != null) {
               console.log("user already exists");
               respo.status(401).send("User Already Exists!");
            } else {
               db.collection('userdata').insertOne(data, function (err, collection) {
                  if (err) throw err;
                  console.log("Record inserted Successfully", collection.ops);
                  respo.status(200).send(collection.ops);
               });
            }
         })
      });
   });
})

app.post('/addOrgDetailToDb', async (req, res) => {
   var orgName = req.body.orgName;
   var chaincodeVersion = req.body.chaincodeVersion;
   var port1 = req.body.port1;
   var port2 = req.body.port2;
   var port3 = req.body.port3;

   console.log(orgName, chaincodeVersion, port1, port2, port3);
   var data = {
      orgName: orgName,
      chaincodeVersion: chaincodeVersion,
      port1: port1,
      port2: port2,
      port3: port3
   }

   console.log('Creating package in mongodb');

   db.collection('orgdata').findOne({ orgName: data.orgName }).then(function (response) {
      console.log("da aaya", response);

      if (response != null) {
         console.log("Org already exists");
         res.status(401).send("Org Already Exists!");
      } else {

         db.collection('orgdata').insertOne(data, function (err, collection) {
            if (err) throw err;
            console.log("Record inserted Successfully", collection.ops);
            res.status(200).send(collection.ops);
         });
      }
   });
});

function checkSignIn(req, res, next) {
   if (req.session.user) {
      next();     //If session exists, proceed to page
   } else {
      console.log(req);
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);  //Error, trying to access unauthorized page!
   }
}



app.post('/fetch',async function(req,res){
   var patientId = req.body.data;
   var response = await queries.fetchFile(patientId);  

 console.log(response);
 res.send(response);
});

app.post('/request', async function(req,res){
var file = req.body.data;
var response = await queries.requestFile(file);

console.log(response);
res.send(response);
});

app.post('/status' , async function(req,res){
   
})

app.post('/landing', checkSignIn, function (req, res) {
   res.redirect('/login');
});

app.get('/logout', function (req, res) {
   console.log(req.session);
   req.session.destroy(function () {
      console.log("user logged out.");
   });
   res.redirect('/');
});

app.use('/landing', function (err, req, res, next) {
   console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

app.get('/', function (req, res) {
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(5000, function(req, res){
   console.log("Server listening at 5000");
});
