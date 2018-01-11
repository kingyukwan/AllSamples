var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mean";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbmean = db.db('mean');
	dbmean.createCollection("orders", function(err, res) {
		if(err) throw err;
		console.log("Collection created!");
		
	dbmean.collection('orders').insert({"ord_num":"C-00001","cust_num":"N-00001","ord_date":"5/1/2018 12:00","requiredDate":"5/1/2018 12:00","shippedDate":"5/1/2018 12:00","itemQty":"5","status":"Pending","remarks":"be careful the items"});

    db.close();
    });
});