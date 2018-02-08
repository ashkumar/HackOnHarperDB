var proxy = require('express-http-proxy');
var app = require('express')();

app.use('/proxy', proxy('localhost:9925', {
  proxyReqBodyDecorator: function(bodyContent,  srcReq) {
    var strBodyContent = new Buffer(bodyContent).toString('utf8');
    var objBodyContent = JSON.parse(strBodyContent);

    console.log(objBodyContent);

    var bodytoSend={};
    bodytoSend['operation'] = 'insert';
    bodytoSend['schema'] = 'sensor';
    bodytoSend['table'] = objBodyContent.measure;
    delete objBodyContent['measure'];

    objBodyContent['time'] = new Date().getTime();
    bodytoSend['records'] = [objBodyContent];


    return bodytoSend;
  }
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


