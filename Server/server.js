const app = require("express")();
const server = require("http").Server(app);
const cors=require("cors");
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Entered");
})

io.on("connection",(socket)=>{
    socket.emit("me", socket.id);

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callIncoming", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

	socket.on('rejected', (data)=>{
        io.to(data.to).emit('rejected');
    })
	socket.on("hangUp",(data)=>{
		io.to(data.to).emit("hangedUp");
		socket.emit("hangedUp");
	});
})

server.listen(5000)