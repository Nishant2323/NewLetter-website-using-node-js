//jshint eversion-6;
const express=require("express");
const bodyparser= require("body-parser");
const request= require("request");
const https=require("https");
const { json } = require("body-parser");
const { endianness } = require("os");
const app= express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName = req.body.fname;
     const lastName = req.body.lname;
     const Email = req.body.email;
     
     const data ={
        members: [
            {
            email_address: Email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]
     };
  const js=JSON.stringify(data);
  const url=" https://us8.api.mailchimp.com/3.0/lists/8ca0f441d3"
  const option={
    method:"POST",
    auth:"nishant:7faef7429301ed00078014c6fef6038b-us8"
  }
 const request =https.request(url,option,function(respond)
  {
    if(respond.statusCode===200)
    {
      res.sendFile( __dirname +"/succes.html");
    }
    else
    {
      res.sendFile(__dirname+"/failier.html");
    }
    respond.on("data",function(data){
      console.log(JSON.parse(data));
    })
           
  });
 request.write(js);
  
  request.end();
});
app.post("/failier.html",function(req,res){
  res.redirect("/");
})
{

}
//process.env.PORT is used to get the dynamic port by heroku
app.listen(process.env.PORT,function(){
  console.log("server has started");
});
//api key
//b41cf80ab8cf22ef4ea8efed2cb417d1-us8
//list id
// 8ca0f441d3.