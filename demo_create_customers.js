var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mean";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbmean = db.db('mean');
	dbmean.createCollection("customers", function(err, res) {
		if(err) throw err;
		console.log("Collection created!");
		
		var docs = [{'customerNumber':'C-00001', 'customerName':'KK Company', 'contactLastName':'Law', 'contactFirstName':'Kwok Kit',
					'phone':'852-12341234','addressLine1':'Flat 2018, Block C','addressLine2':'Talkoo Plaza','city':'Hong Kong','title':'Mr',
					'creditLimit':'15000','createDate':'2017-12-30 14:00','updateDate':'2017-12-30 14:00'},
					{'customerNumber':'C-00002', 'customerName':'AA Company', 'contactLastName':'Chow', 'contactFirstName':'Alice',
					'phone':'852-98769876','addressLine1':'Room 1208, AA Building','addressLine2':'Long Beach','city':'Hong Kong','title':'Miss',
					'creditLimit':'28000','createDate':'2017-12-30 15:00','updateDate':'2017-12-30 15:00'}];
		
		dbmean.collection('customers').insert(docs, {w:1}, function(err, res) {});
		
	    db.close();
	});
});