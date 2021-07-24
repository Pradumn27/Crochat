const app = require("express")();
const server = require("http").Server(app);
const cors=require("cors");
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

const users={};

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Entered");
})

io.on("connection",(socket)=>{
    socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callIncoming", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
    // if(!users[socket.id]){
    //     users[socket.id]=socket.id;
    // }
    // socket.emit("myID",socket.id);

    // socket.on("disconnect",()=>{
    //     delete users[socket.id];
    // })

    // socket.on("join-room",(roomId,userId)=>{
    //     socket.join(roomId);
    //     socket.to(roomId).broadcast.emit("user-connected",userId);
    // })

    // socket.on("call-user",({userToCall,signal,from,name})=>{
    //     io.to(userToCall).emit("callIncoming",{signal:signal,from:from,name:name})
    // })

    // socket.on("answer-call",data=>{
    //     io.to(data.to).emit("call-accepted",data.signal);
    // })
})

server.listen(5000)