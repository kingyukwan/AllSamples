var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mean";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbmean = db.db('mean');
	dbmean.createCollection("users", function(err, res) {
		if(err) throw err;
		console.log("Collection created!");
		

	dbmean.collection('users').insert({"cust_num" : "N-00001", "cust_name":"KK Company", "contactLastName":"Law", "contactFirstName":"Kwok Kit", "phone":"852-12341234", "addressLine1":"flat 2018, block c", "addressLine2":"talkoo plaza", "city":"Hong Kong", "email":"test@pccw.com", "gender":"M", "creditLimit":"15000", "createDate":new Date(), "updateDate":new Date()});

    dbmean.collection('users').insert({"cust_num" : "N-00002", "cust_name":"KK Company", "contactLastName":"Law", "contactFirstName":"Kwok Kit", "phone":"852-12341234", "addressLine1":"flat 2018, block c", "addressLine2":"talkoo plaza", "city":"Hong Kong", "email":"test@pccw.com", "gender":"M", "creditLimit":"15000", "createDate":new Date(), "updateDate":new Date()});

    db.close();
    });
});