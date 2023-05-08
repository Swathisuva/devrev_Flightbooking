const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const { process_params } = require("express/lib/router")
const axios = require('axios');
const cors=require("cors")
let mail1;
const app=express()
app.use(cors());
 
const encoder=bodyparser.urlencoded({ extended: true });
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"devrev"
})

con.connect(function(error){
    if(error)
    throw error; 
    else{
        console.log("Database connected")
    }

})





app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get("/welcome",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
app.get("/disp",(req,res)=>{
    res.sendFile(__dirname+"/display.html")
})

app.get("/success",function(req,res){
    res.sendFile(__dirname+"/success.html");
})
app.get("/removeflight",function(req,res){
    res.sendFile(__dirname+"/removeflight.html");
})
app.get("/gets",function(req,res){ 
    res.sendFile(__dirname+"/search.html");
})
app.get("/admin",function(req,res){ 
    res.sendFile(__dirname+"/admin.html");
})
app.get("/status",function(req,res){
    res.sendFile(__dirname+"/status.html");
})
app.get("/addflight",function(req,res){
    res.sendFile(__dirname+"/addflight.html");
})
app.get("/adminlanding",function(req,res){
    res.sendFile(__dirname+"/adminlanding.html");
})
app.get("/removeflight",function(req,res){
    res.sendFile(__dirname+"/removeflight.html");
})
// app.get("/mybookings",function(req,res){
//     res.sendFile(__dirname+"/book.html");
// })
app.get("/booktickets",function(req,res){
    res.sendFile(__dirname+"/book.html");
})
// app.get("/viewflights",function(req,res){
//     res.sendFile(__dirname+"/admindisp.html");
// })
app.get("/userlanding",function(req,res){
    res.sendFile(__dirname+"/userlanding.html");
})
app.get("/userloggedin",function(req,res){
    res.sendFile(__dirname+"/userloggedin.html");
})
app.get("/admindisp",function(req,res){
    res.sendFile(__dirname+"/admindisp.html");
})
app.get("/mybookings",function(req,res){
    res.sendFile(__dirname+"/mybookings.html");
})



app.listen(4002,function(){
    console.log("server created") 
})

app.post("/adminlogin",(req,res)=>{ 
    console.log(req.body)
    var name  = req.body.e1;
    var pwd = req.body.e2;
    console.log(name)
    console.log(pwd)
    a=name;
    b=pwd;
    var sql="select * from admin where admin_name ="+con.escape(name)+"and admin_password ="+con.escape(pwd)+"";
    console.log(sql)
    con.query(sql,function(err,result){
        console.log(result); 
        if (err) throw err;
        console.log("object")
        if(result.length>0)
        {
            console.log("1")
            res.redirect("/adminlanding");
            // res.json(result)   
        }
        else{
            res.send("invalid");
        }
        res.end();
    })
})
app.post("/removeflight",encoder,(req,res)=>
{
    var fname=req.body.fid;
    var fairlines=req.body.fairlines;
    var sql="DELETE FROM flights WHERE name ="+con.escape(fname)+"and airlines="+con.escape(fairlines)+"";
    console.log(sql);
    con.query(sql, function (error, result) {
        if(error)
        throw error;
        console.log(result)
        res.send("sucessfully deleted");
   });
     })

app.post("/register",encoder,(req,res)=>{
    console.log("Hii")
    var apply=req.body.s10;
    var office=req.body.s1;
    var name= req.body.s2;
    var email= req.body.s3;
    var pwd=req.body.s4;
    var dob=req.body.s5;
    var phno = req.body.s6;
    var ques=req.body.s7;
    var ans=req.body.s8;
    var cap=req.body.s9;
   

    console.log("hi")
    var sql = "INSERT INTO details (p_type,p_office,name,email,password,dob,mbl_no,hint_ques,hint_ans,status) VALUES("+con.escape(apply)+","+con.escape(office)+","+con.escape(name)+","+con.escape(email)+","+con.escape(pwd)+","+con.escape(dob)+","+con.escape(phno)+","+con.escape(ques)+","+con.escape(ans)+","+con.escape(cap)+")"
    console.log("Registered Sucessfully")
    con.query(sql,function(error,result){ 
        if(error)
        throw error;
        console.log(result)
    })
    res.redirect("/welcome")
})

app.post("/welcome",encoder,(req,res)=>{
    console.log("Hii")
    var name = req.body.name;
    var email = req.body.email;
    var password=req.body.pwd;
    
    var sql = "INSERT INTO users (name,email,password) VALUES("+con.escape(name)+","+con.escape(email)+","+con.escape(password)+")"
    console.log("Registered Sucessfully")
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect('/userlanding')
    })
    //res.redirect("/welcome")
})
app.post("/login",(req,res)=>{ 
    var mail  = req.body.t1;
    var pwd = req.body.t2;
    console.log(mail)
    console.log(pwd)
    
    var sql="select * from users where email ="+con.escape(mail)+"and password ="+con.escape(pwd)+"";
    console.log(sql)
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            mail1=mail;
            console.log(mail1)
            // res.redirect("/success");
            res.redirect('/userloggedin')  
        }
        else{
            res.send("invalid");
        }
        res.end();
    })
})

app.post("/addflight",encoder,(req,res)=>{
    console.log("Hii")
    var name = req.body.fname;
    var airlines = req.body.fairlines;
    var source=req.body.fsource;
    var destination=req.body.fdestination;
    var departure=req.body.fdtime;
    var arrival=req.body.fatime;
    
    var sql = "INSERT INTO flights (name,airlines,source,destination,departure_time,arrival_time) VALUES("+con.escape(name)+","+con.escape(airlines)+","+con.escape(source)+","+con.escape(destination)+","+con.escape(departure)+","+con.escape(arrival)+")"
    console.log("Added Sucessfully")
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect('/adminlanding')
    })
    //res.redirect("/welcome")
})

app.post("/booktickets",encoder,(req,res)=>{
    console.log("Hii")
    var username=req.body.username;
    var mail=req.body.mail1;
    var name = req.body.fname;
    var airlines = req.body.fairlines;
    var source=req.body.fsource;
    var destination=req.body.fdestination;
    var departure=req.body.fdtime;
    var arrival=req.body.fatime;
    
    var sql = "INSERT INTO booking (username,mail,name,airlines,source,destnation,departure_time,arrival_time) VALUES("+con.escape(username)+","+con.escape(mail1)+","+con.escape(name)+","+con.escape(airlines)+","+con.escape(source)+","+con.escape(destination)+","+con.escape(departure)+","+con.escape(arrival)+")"
    console.log("Added Sucessfully")
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect('/adminlanding')
    })
    //res.redirect("/welcome")
})









app.get('/allDetails',(req,res)=>{
    var sql = "Select * from details";
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            console.log("Records are displayed"); 
            res.send(result)  
       }
        else{
            res.send("cant insert due to server issue");
        }
        res.end();
    })
})





app.post("/search",(req,res)=>
{
    var email=req.body.t1;
    var sql="SELECT * FROM flights WHERE event="+con.escape(email)+"";
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
            
                console.log("1 record  inserted");   
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })
    app.get("/viewflights",(req,res)=>{
        var sql="select * from flights";
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
                res.json(result);
                console.log("all records displayed");   
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })
    app.get("/viewtickets",(req,res)=>{
        var sql="select name,airlines,source,destnation,departure_time,arrival_time from booking";
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
                res.json(result);
                console.log("all records displayed");   
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })
    app.get('/display',(req,res)=>{
        var sql = "Select * from details where email='"+mail1+"'";
        console.log(mail1);
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
                console.log("Records are displayed"); 
                console.log(mail1);  
                res.json(result)
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })



  


    app.get("*",(req,res)=>{
        res.send("Not found")
    })
