const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

const getTime = (req, res, next) => {
    const https = require('https'); 
    var mode = req.params.mode;
    var data = {}
    //console.log('The mode: ' + mode);

    const options = { 
        hostname: 'timeapi.io', 
        path: '/api/Time/current/zone', 
        method: 'GET', 
      }; 
    switch(mode) {
        case 'ph':
            options.path+='?timeZone=Asia/Manila'
            break;
        case 'wst':
            options.path+='?timeZone=Asia/Manila'
            //Asia/Manila
            break;
        case 'est':
            //EST
            options.path+='?timeZone=EST'
            break;
        case 'pst':
            //US/Pacific
            options.path+='?timeZone=US/Pacific'
            break;
        case 'gmt':
            // code block
            //"GMT"
            options.path+='?timeZone=GMT'
            //Pacific Time, Eastern Time, Western Time, and GMT,
            break;
        default:
            data = null;
            return res.status(200).json(
                data
            );
            // code block
    }
    const request = https.request(options, (response) => {
        let time = ''  
        response.on('data', (chunk) => { 
            time += chunk; 
        }); 
       
       response.on('end', () => { 
          // Process the data received in the response 
          //console.log(time);
          res.status(200).json(
            JSON.parse(time)
          );
        }); 
      }); 

    request.on('error', (error) => { 
        console.error(error); 
    }); 
    
    request.end(); 
    //https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam
    //res.status(200).json(
    //    data
    //);
};

module.exports.saySomething = saySomething;
module.exports.getTime = getTime;