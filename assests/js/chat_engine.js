class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
            console.log('connetion established using socket.io');
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'connect2'
            })

            self.socket.on('user_join',function(data){
                console.log('User joined the chat room',data);
            })
        })
        // On clicking  the send button
        $('#send-message').click(function(){
            let msg=$('#send-message-input').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'connect2'
                })
            }
        });
       
        // Recieve message eventlistener
        self.socket.on('recieve_message',function(data){
            console.log("Message",data.message);
           let newMessage=$('<li>');
            let messageType="incoming-message"
           if(self.userEmail==data.user_email){
            messageType="outgoing-message"
           }
           newMessage.append($('<span>',{
            'html':data.user_email,
            'class':'name'
            }))
           newMessage.append($('<span>',{
               'html':data.message
             })
           )
          newMessage.addClass(messageType);
          $('#message-container').append(newMessage); 
        })  
       
    }

}