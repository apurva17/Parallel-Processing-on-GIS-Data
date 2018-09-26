
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


var con = sql.createConnection({
    host: "130.85.47.58",
    user: "komal",
    password: "password",
    database: "rental"

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


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



        var Country=JSON.parse(g).Country===undefined?null:JSON.parse(g).Country;



        var State=JSON.parse(g).State===undefined?null:JSON.parse(g).State;

        var Zip=JSON.parse(g).zip===undefined?null:JSON.parse(g).zip;
        var min_price=JSON.parse(g).min_price===undefined?null:JSON.parse(g).min_price;

        var max_price=JSON.parse(g).max_price===undefined?null:JSON.parse(g).max_price;


        var bedroom=JSON.parse(g).bedroom===undefined?null:JSON.parse(g).bedroom;

        var bathroom=JSON.parse(g).bathroom===undefined?null:JSON.parse(g).bathroom;



        var msql = 'CALL testwithparam(?,?,?,?,?,?,?)';

        data={

        };

        con.query(msql,[Country,State,Zip,min_price,max_price,bedroom,bathroom],  function(results, fields){

            console.log("im here");
            console.log(fields);
            console.log(results);
            console.log(JSON.parse(g));

            var jsonfile = require('jsonfile')
            var file = 'services.json';
            jsonfile.writeFile(file, fields, function (err) {
                console.error(err)
            })

        });



    }

    if(JSON.parse(g).type == "BOOKING")
    {

        var ID=JSON.parse(g).ID;

        var studID=JSON.parse(g).studID;
        var completelybooked=JSON.parse(g).completelybooked;
        console.log("im in booking");
        console.log(parseInt( ID));
        console.log(studID);
        console.log(parseInt(completelybooked));

        var s = 'CALL bookhouse(?,?,?)';
        con.query(s,[parseInt(ID),parseInt(studID),parseInt(completelybooked)],  function(results, fields){

          console.log(parseInt( ID));
          console.log(studID);
          console.log(parseInt(completelybooked));

        });

    }

    if(JSON.parse(g).type == "Recommendation")
    {

     var studID=JSON.parse(g).studID;
        console.log("jhh");

        var sr = 'CALL Recommendation(?)';
        con.query(sr,[studID],  function(results, fields){
            console.log("jhh");

            var jsonfile = require('jsonfile')
            var file = 'recommended.json';
            jsonfile.writeFile(file, fields, function (err) {
                console.error(err)
            })

        });



    }


    if(JSON.parse(g).type == "Registeration")
    {



        var firstname=JSON.parse(g).firstname;
        var lastname=JSON.parse(g).lastname;
        var username=JSON.parse(g).username;
        var password=JSON.parse(g).password;
        var Ethnicity=JSON.parse(g).Ethnicity;
        var locations=JSON.parse(g).location;
        var gender=JSON.parse(g).gender;
        //call  cancel proc
        console.log(JSON.parse(g));




        var msql = 'CALL insertstudent(?,?,?,?,?,?,?)';

        data={

        };

        con.query(msql,[firstname,lastname,username,locations,Ethnicity,gender,password],  function(results, fields){



        });




    }


    if(JSON.parse(g).type == "authentication")
    {



        var username1=JSON.parse(g).username;
        var pass=JSON.parse(g).password;

        console.log(JSON.parse(g));




        var msql1 = 'CALL login(?,?)';

        data={

        };

        con.query(msql1,[username1,pass],  function(results, fields){

              console.log(fields);

        });




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