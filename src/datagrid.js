function initDatagrid() {
    console.log("load datagrid!");
	$('#dg').datagrid({
        url: "api/orders",
        method: "GET",
        width: '1000px',
        height: '300px',
        idField: "orderNumber",
        columns: [[
            {field:'ck', checkbox:'true'},
            {field:'orderNumber', width:70,title:'Order No',formatter:function(value,row,index){return row.orderNumber}},
            {field:'orderDate', width:130,title:'Order Date',formatter:function(value,row,index){return row.orderDate}},
            {field:'requiredDate' ,width:130,title:'Required Date',formatter:function(value,row,index){return row.requiredDate}},
            {field:'shippedDate' ,width:130,title:'Shipped Date',formatter:function(value,row,index){return row.shippedDate}},
            {field:'itemQty' ,width:70,title:'Item Qty',formatter:function(value,row,index){return row.itemQty}},
            {field:'status' ,width:80,title:'Status',formatter:function(value,row,index){return row.status}},
            {field:'remarks' ,width:140,title:'Remarks',formatter:function(value,row,index){return row.remarks}},
            {field:'customerNumber' ,width:110,title:'Customer No',formatter:function(value,row,index){return row.customerNumber}},
            {field:'customerName' ,width:120,title:'Customer Name',formatter:function(value,row,index){return row.customerDetail.customerName}},
            {field:'contactLastName' ,width:130,title:'Contact Last Name',formatter:function(value,row,index){return row.customerDetail.contactLastName}},
            {field:'ContactFirstName' ,width:130,title:'Contact First Name',formatter:function(value,row,index){return row.customerDetail.contactFirstName}},
            {field:'phone' ,width:100,title:'Phone',formatter:function(value,row,index){return row.customerDetail.phone}},
            {field:'addressLine1' ,width:120,title:'Address1',formatter:function(value,row,index){return row.addressLine1}},
            {field:'addressLine2' ,width:120,title:'Address2',formatter:function(value,row,index){return row.customerDetail.addressLine2}},
            {field:'city' ,width:80,title:'City',formatter:function(value,row,index){return row.customerDetail.city}},
            {field:'title' ,width:40,title:'Title',formatter:function(value,row,index){return row.customerDetail.title}},
            {field:'creditLimit' ,width:80,title:'Credit Limit',formatter:function(value,row,index){return row.customerDetail.creditLimit}},
            {field:'createDate' ,width:130,title:'Create Date',formatter:function(value,row,index){return row.customerDetail.createDate}},
            {field:'updateDate' ,width:130,title:'Update Date',formatter:function(value,row,index){return row.customerDetail.updateDate}}
		]]
    })
    
    $('#dg').datagrid('enableFilter', [
        {
            field:'status',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'All'},{value:'Assist',text:'Assist'},{value:'Completed',text:'Completed'}
                    ,{value:'Dispatched',text:'Dispatched'},{value:'Pending',text:'Pending'}],
                onChange:function(value){
                    if (value == ''){
                        $('#dg').datagrid('removeFilterRule', 'status');
                    } else {
                        $('#dg').datagrid('addFilterRule', {
                            field: 'status',
                            op: 'equal',
                            value: value
                        });
                    }
                    $('#dg').datagrid('doFilter');
                }
            }
        }
    ]);

}
	
$(function () {
	initDatagrid();
});