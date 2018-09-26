
var express = require('express');
var app = express();

var sql = require("mysql");
var services=
    [
        {
            "ID": "1",
            "Location":"XY",
            "price": "765765765",
            "Readmore": "ReadMore"
        },
        {
            "ID": "2",
            "Location":"XY",
            "price": "765765765",
            "Readmore": "ReadMore"
        },
        {
            "ID": "3",
            "Location":"XY",
            "price": "765765765",
            "Readmore": "ReadMore"
        }
    ]

/*var services=
[
    {
        "ID": "1",
         "Location":"XY",
        "price": "765765765",
        "Readmore": "ReadMore"
    },
    {
        "ID": "2",
        "Location":"XY",
        "price": "765765765",
        "Readmore": "ReadMore"
    },
    {
        "ID": "3",
        "Location":"XY",
        "price": "765765765",
        "Readmore": "ReadMore"
    }
]


var con = sql.createConnection({
    host: "130.85.47.48",
    user: "komal",
    password: "password",
    database: "rental"

});*/

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});*/





//



function createquery(data)
{
    var Country=JSON.parse(g).Country;
    var State=JSON.parse(g).State;
    var Zip=JSON.parse(g).zip;
    var min_price=JSON.parse(g).min_price;
    var max_price=JSON.parse(g).max_price;
    var bedroom=JSON.parse(g).bedroom;
    var bathroom=JSON.parse(g).bathroom;


}

function createbookquery(data)
{


return ""

}


function createdeletequery(data)
{



return ""
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/",function(req, res)
{
    var g=Object.keys(req.body)[0];
    console.log(g);
    if(JSON.parse(g).type == "SEARCH")
    {
        //call search store proc
        console.log("im in search");


        var Country=JSON.parse(g).Country;
        var State=JSON.parse(g).State;
        var Zip=JSON.parse(g).zip;
        var min_price=JSON.parse(g).min_price;
        var max_price=JSON.parse(g).max_price;
        var bedroom=JSON.parse(g).bedroom;
        var bathroom=JSON.parse(g).bathroom;


        var msql = 'CALL testwithparam("baltimore", "21218")';

        /*data={

        };

        con.query(msql, true, function(results, fields){

            console.log(fields[0].length);
            for(var i=0;i<fields[0].length;i++)
            {


            }*/

            var jsonfile = require('jsonfile')
            var file = 'services.json';
            jsonfile.writeFile(file, services, function (err) {
                console.error(err)
            })

        /*});*/



    }

    if(JSON.parse(g).type == "BOOKING")
    {


        var ID=JSON.parse(g).ID;
        var location=JSON.parse(g).Location;
        var price=JSON.parse(g).Price;
        var readmore=JSON.parse(g).Readmore;
        //call  booking proc
        console.log("booking");
        console.log(g);





    }

    if(JSON.parse(g).type == "CANCEL")
    {
        var IDfordelete=JSON.parse(g).ID;
        var locationfordelete=JSON.parse(g).Location;
        var pricefordelete=JSON.parse(g).Price;
        var readmorefordelete=JSON.parse(g).Readmore;
        //call  cancel proc
        console.log("fordelete");
        console.log(IDfordelete);
    }


});



var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});