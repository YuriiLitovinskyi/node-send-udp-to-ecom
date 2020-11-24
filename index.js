const udp = require('dgram');
const server = udp.createSocket('udp4'); 

// ECOM connection settings
const port = 10501;
const ip = '213.186.202.161';

// text message to ECOM
const textMessage = 'CONFIG?';  // 'CONFIG2?' 'EXIT'  'IP?'

// convert string to hex
const stringToHex = (stringMessage) => {
    let result = '';
    for (let i = 0; i < stringMessage.length; i++) {
        result += stringMessage.charCodeAt(i).toString(16);
    };
    return result;
};

const msg = Buffer.from(stringToHex(textMessage) + '0d', 'hex');

server.send(msg, 0, msg.length, port, ip, async (err, bytes) => {
    if(err){
        console.log(err);                            
        server.close();                        
    };
    console.log(`\nSent message "${textMessage}" to ECOM. Package size: ${bytes} bytes.\n`);        
});     

server.on('message', (msg, info) => {
    console.log(`ECOM response:\n ${msg.toString()}`);                                        
    server.close();                      
});