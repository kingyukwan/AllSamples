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


router.post('/usersByNum', (req, res) => {
    console.log("parm="+req.body.custNum);
    connection((db) => {
        db.collection('users')
            .aggregate([
                {
                $lookup:
                    {
                    from: "orders",
                    localField: "cust_num",
                    foreignField: "cust_num",
                    as: "orders_docs"
                    }
                },
                {
                   $match: {"cust_num":req.body.custNum}
                }
            ])
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

router.post('/ordersByUser', (req, res) => {
    console.log("parm="+req.body.custNum);
    connection((db) => {
        db.collection('orders')
            .find({cust_num:req.body.custNum})
            .toArray()
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/order', (req, res) => {
    console.log('countOrder');
    console.log("parm="+req.body.ordNum);
    connection((db) => {
        db.collection('orders')
            .find({ord_num:req.body.ordNum})
            .count()
            //.toArray()
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*router.post('/orderSubmit', (req, res) => {
    console.log("parm="+req.body.custNum);
    connection((db) => {
        db.collection('orders')
            .insert({
                "ord_num":req.body.ordNum,
                "cust_num":req.body.custNum,
                "ord_date":req.body.ordDate
            })
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});*/

router.post('/orderSubmit', (req, res) => {
    console.log("orderSubmit parm="+req.body.user.num+","+req.body.order.date);
    connection((db) => {
        db.collection('orders')
            .insert({
                "ord_num":req.body.order.num,
                "cust_num":req.body.user.num,
                "ord_date":req.body.order.date,
                "requiredDate":req.body.order.requiredDate,
                "shippedDate":req.body.order.shippedDate,
                "itemQty":req.body.order.itemQty,
                "status":req.body.order.status,
                "remarks":req.body.order.remarks
            })
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/orderUpdate', (req, res) => {
    console.log("orderUpdate parm="+req.body.order.num);
    connection((db) => {
        db.collection('orders')
            .update(
                { ord_num: req.body.order.num },
                {
                    "ord_num":req.body.order.num,
                    "cust_num":req.body.user.num,
                    "ord_date":req.body.order.date,
                    "requiredDate":req.body.order.requiredDate,
                    "shippedDate":req.body.order.shippedDate,
                    "itemQty":req.body.order.itemQty,
                    "status":req.body.order.status,
                    "remarks":req.body.order.remarks
                },
                { upsert: false }
            )
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/custUpdate', (req, res) => {
    console.log("custUpdate parm="+req.body.user.num);
    connection((db) => {
        db.collection('users')
            .update(
                { cust_num: req.body.user.num },
                {$set:
                    {
                        "cust_num" : req.body.user.num, 
                        "cust_name": req.body.user.name, 
                        "contactLastName": req.body.user.contactLastName, 
                        "contactFirstName": req.body.user.contactFirstName, 
                        "phone": req.body.user.phone, 
                        "addressLine1": req.body.user.addressLine1, 
                        "addressLine2": req.body.user.addressLine2, 
                        "city": req.body.user.city, 
                        "email": req.body.user.email, 
                        "gender": req.body.user.gender, 
                        "creditLimit": req.body.user.creditLimit,
                        "updateDate":req.body.user.updateDate
                    }
                },
                { upsert: false }
            )
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


router.get('/orders', (req, res) => {
    connection((db) => {
        db.collection('order').aggregate([
            { $lookup:
                {
                    from: 'customers',
                    localField: 'customerNumber',
                    foreignField: 'customerNumber',
                    as: 'customerDetail'
                }
            },
            { $unwind: "$customerDetail"},
            { $project:
                {
                    "_id" : 0,
                    "orderNumber" : 1,
                    "orderDate" : 1,
                    "requiredDate" : 1,
                    "shippedDate" : 1,
                    "itemQty" : 1,
                    "status" : 1,
                    "remarks" : 1,
                    "customerNumber" : 1,
                    "customerDetail.customerName" : 1,
                    "customerDetail.contactLastName" : 1,
                    "customerDetail.contactFirstName" : 1,
                    "customerDetail.phone" : 1,
                    "customerDetail.addressLine1" : 1,
                    "customerDetail.addressLine2" : 1,
                    "customerDetail.city" : 1,
                    "customerDetail.title" : 1,
                    "customerDetail.creditLimit" : 1,
                    "customerDetail.createDate" : 1,
                    "customerDetail.updateDate" : 1
                }
            }
        ])
            //.find()
            .toArray()
            .then((orders) => {
                response.data = orders;
                response.rows = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
