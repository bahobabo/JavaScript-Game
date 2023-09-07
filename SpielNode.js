const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
//app.use(cors());

 var con = mysql.createConnection({
    host: 'localhost',
    //database: 'optional',
    user: 'root',
    password: '12345678',
    database: 'mydb'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('/Users/bahadirhacisalihoglu/eclipse-workspace/WBA-Sommer23/src/main/webapp'));



app.listen(3000,function(){console.log("listening on port 3000")});


app.get('/',function(req,res){
	res.sendFile('/Users/bahadirhacisalihoglu/eclipse-workspace/WBA-Sommer23/src/main/webapp/Spiel.html')
	
	
	
});

app.post('/',function(req,res){
    let name=req.body.name;
	let punkte=req.body.punkte;
	//JSON.stringify
	
	   
	   
	   


    // functionality after connecting
    //to database=>
    

let sql = "INSERT INTO Game (Name, Score) VALUES (?)";
let values=[name, punkte];
                   
     con.query(sql,[values],function (err, result) {
    if (err) throw err;
   console.log(result)
  });
  
  let sql2 = "SELECT Name, Score FROM Game ORDER BY Score DESC LIMIT 10";
    con.query(sql2, function(err, result) {
      if (err) throw err;

     // console.log("Top 10 Ergebnisse: ", result);
     // res.set('content-Type','application/json')
      res.send((result))
    });
  
  
  
  
    

	
      
    
	
});