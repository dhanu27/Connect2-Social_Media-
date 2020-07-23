// : Work as Observer
module.exports.chatSocket=function(socketServer){
     let io=require('socket.io')(socketServer);
     io.sockets.on("connection",function(socket){
         console.log('new connection established',socket.id);
         socket.on("disconnect",function(){
            console.log('socket disconnected');
         });
         socket.on('join_room',function(data){
            console.log('user joining req recieved ',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_join',data);
        })
        

        socket.on('send_message',function(data){
              io.in(data.chatroom).emit('recieve_message',data);        
        })
     })

}