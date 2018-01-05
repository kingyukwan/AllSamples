const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var formidable = require('formidable');
const path = require('path');
var xls2Json = require('xls-to-json-lc');
var xlsx2Json = require("xlsx-to-json-lc");
var moment = require("moment");
// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
router.post('/file', (req, res)=>{
    console.log('/file called');

      // create an incoming form object
  var form = new formidable.IncomingForm();
  
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
    form.keepExtensions = true;
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    // console.log(form.uploadDir);
    form.on('file', function(field, file) {
    //   fs.rename(file.path, path.join(form.uploadDir, file.name));
        // console.log(file);
        console.log('on file called');
        // console.log(".\\uploads\\"+path.basename(file.path));
        // var dir = __dirname;
        //var filePath = path.resolve(dir, '../test/Persona_Sheet_New.xlsx');
        // console.log(path.resolve(dir, ".\\uploads\\test.xls")); // fileName object with relative path of file
        try{
            var filename = path.basename(file.path);
            if('.xls' == path.extname(filename))
                xls2Json({
                            "input": ".\\server\\routes\\uploads\\"+ filename,
                            "output": null,
                            "lowerCaseHeaders": true
                        }
                    ,function(err, output){
                    console.log("xls2Json finished");
                    if(err){
                        console.log(err);
                        res.json({err_code:0, err_desc:err});
                    }else{
                        if(output){
                            var json = JSON.parse(output);
                            console.log("json.length="+json.length);
                            for(var i = 0;i < json.length;i++){
                                console.log(parseInt(json["Age"]));
                            }
                            connection((db)=>{
                                db.collection('excel').insert(output, function(err, result){
                                    if(err)console.log(err);
                                    console.log('insert finished');
                                        
                                    res.json({err_code:0,err_desc:null,data:output});
                                });
                            });
                        }
                    }
                });
            else if('.xlsx' == path.extname(filename)){
                xlsx2Json({
                    "input": ".\\server\\routes\\uploads\\"+ filename,
                    "output": null,
                    "lowerCaseHeaders": true
                },function(err, output){
                console.log("xlsx2Json finished");
                if(err){
                    console.log(err);
                    res.json({err_code:0, err_desc:err});
                }else{
                    if(output){
                        console.log("output.length="+output.length);
                        //type conversion before save to mongodb
                        for(var i = 0;i < output.length;i++){
                            output[i]["age"] = parseInt(output[i]["age"]);
                            output[i]["create date"] = new Date(moment(output[i]["create date"],"YYYY/MM/DD").format());
                        }
                        connection((db)=>{
                            db.collection('excel').insert(output, function(err, result){
                                if(err)console.log(err);
                                console.log('insert finished');
                                    
                                res.json({err_code:0,err_desc:null,data:output});
                            });
                        });
                    }
                }
            });
        }else{
            res.json({err_code:0,err_desc:"invalid format!!"});
        }
        }catch(e){
            res.json({err_code:1,err_desc:"Corrupted excel file"});
        }
    });
  
    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
  
    // once all the files have been uploaded, send a response to the client
    // form.on('end', function() {
    //   res.end('success');
    // });
  
    // parse the incoming request containing the form data
    form.parse(req);
});

module.exports = router;