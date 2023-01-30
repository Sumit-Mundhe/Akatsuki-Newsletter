const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    const first = req.body.first
    const last = req.body.last
    const email = req.body.email

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:first,
                    LNAME:last
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const apikeyid="e6a91c64e9e44828cbf5a74b5477f84b-us12";
    const usX="12"; // in above line we have the appid hosted on us server 12;
    const appid="100e4b1dff";
    const url="https://us"+usX+".api.mailchimp.com/3.0/lists/"+appid;

    const options = {
        method: "POST",
        auth: "sumit2:e6a91c64e9e44828cbf5a74b5477f84b-us12"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req,res){
    res.redirect("/")       
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is Running on Port : 3000")
})


                                                                                                                                                                            