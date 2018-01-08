var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mean";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbmean = db.db('mean');
	dbmean.createCollection("order", function(err, res) {
		if(err) throw err;
		console.log("Collection created!");
		
		var docs = [{'orderNumber':'O-00001', 'orderDate':'2017/11/30 11:30', 'requiredDate':'2017/11/30 11:30', 'shippedDate':'2017/12/07 18:00',
					'itemQty':'500','status':'Completed','remarks':'Premium Customer','customerNumber':'C-00001'},
					{'orderNumber':'O-00002', 'orderDate':'2017/11/30 15:15', 'requiredDate':'2017/11/30 15:15', 'shippedDate':'2017/12/01 21:35',
					'itemQty':'1200','status':'Dispatched','remarks':'','customerNumber':'C-00002'},
					{'orderNumber':'O-00003', 'orderDate':'2017/12/14 10:30', 'requiredDate':'2017/12/17 14:00', 'shippedDate':'',
					'itemQty':'900','status':'Assist','remarks':'Resources not available','customerNumber':'C-00001'},
					{'orderNumber':'O-00004', 'orderDate':'2017/12/19 09:00', 'requiredDate':'2017/12/19 09:00', 'shippedDate':'2017/12/28 08:50',
					'itemQty':'500','status':'Dispatched','remarks':'','customerNumber':'C-00001'},
					{'orderNumber':'O-00005', 'orderDate':'2017/12/27 12:00', 'requiredDate':'2018/01/19 09:00', 'shippedDate':'',
					'itemQty':'2400','status':'Pending','remarks':'','customerNumber':'C-00002'},];
		
		dbmean.collection('order').insert(docs, {w:1}, function(err, res) {});
		
	    db.close();
	});
});