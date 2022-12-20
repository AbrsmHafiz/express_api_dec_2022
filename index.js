//import express library
let express = require("express")
let mongoose = require("mongoose")
let song = require('./song')
let cors = require("cors")

//create express app
let app = express()
//make express app use cors()
app.use(cors())

//enable API to receive request body/payload in JSON format
app.use(express.json())

let PORT = 8000

//connect to mongodb database
//1. setup connection string

let connectionString = "mongodb+srv://mongoUser:mongoPassword@clustersam.34bo4ck.mongodb.net/youtube"

//2. connect to mongodb server usign connection string
mongoose.connect(connectionString)
let db = mongoose.connection

//3. check if mongodb server->database is connected
db.once("open", ()=>{
    console.log("Connected to mongodb database in cloud!")
})


//setup api for root endpoint
//http://localhost:PORTNUMBER
//http://localhost:8000/

//define the code for accepting and processing the request
//and send back the response. The request is of type GET and coming from
//root endpoint.
//app.get("endpoint",(request, response)=>{})   
app.get("/", (request, response)=>{
    console.log("Request received for / endpoint for GET request");
    response.json({ 
        "message":"Hello from root -> /",
        "request_type":"GET"

    })

})

app.get("/welcome", (request, response)=>{
    console.log("Request received for / endpoint for GET request");
    response.json({ 
        "message":"Hello from root -> /welcome",
        "request_type":"GET"
        
    })

})



app.get("/get/song/all", (request, response)=>{
    //connect to mongodb database and get the 
    //list of all documents from youtube db->song collection
    console.log("connecting to mongodb database")
    song.find({},(error, data)=>{
        if(error){
            response.json(error)
        }else{
            //console.log(data);
            response.json(data) 
        }


    })

})

//API => http://localhost:8000/add/song
app.post("/add/song",(request,response)=>{

    //console.log(request)
    console.log(request.body);
    //extract request body/payload from the incoming request
    let receivedVideoid = request.body.videoid
    let receivedLikes = request.body.likes
    let receivedDislikes = request.body.dislikes
    let receivedViews = request.body.views
    //create a new song
    let newSong = new song()
    //Update newSong with values received in body/payload
    newSong.videoid = receivedVideoid
    newSong.likes = receivedLikes
    newSong.dislikes = receivedDislikes
    newSong.views = receivedViews

    //save the newSong using model inmongodb database
    newSong.save((error, data)=>{
        if(error){
            response.json(error)
        }else{
            console.log(data);
            response.json(data)
        }


    })



    //connect to mongodb database using model(song.js)





})





app.listen(PORT, () => {
    console.log("Listening on port:" + PORT);


})