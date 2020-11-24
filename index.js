const dgram = require('dgram');
const udp = require('dgram');
const client = dgram.createSocket('udp4');
const server = udp.createSocket('udp4'); 

//const msg = '455849540d' // EXIT //
const msg = Buffer.from('EXIT');


server.send(msg, 0, msg.length, 10501, '192.168.2.15', async (err, bytes) => {
    if(err){
        console.log(err);                            
        client.close();                        
    };
    console.log(`\nSent ${bytes} bytes to ECOM`);        
});                

server.on('message', (msg, info) => {
    console.log(`ECOM response: ${msg.toString()}`);                       
                   
    //server.close();                      
});