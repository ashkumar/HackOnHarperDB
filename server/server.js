'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var fs = require('fs');


const { HarperDBConnect } = require('harperdb-connect')
const db = new HarperDBConnect('root', 'ash111')
db.setDefaultOptions({
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    json: true
})

var chokidarInstance;

io.on('connection', (socket) => {
  console.log('USER CONNECTED');

  socket.on('disconnect', function () {
    console.log('USER DISCONNECTED');
  });

  if (!chokidarInstance) {
    console.log("Creating chokidar instance");
    chokidarInstance = require('chokidar')
      .watch(['/home/ashwini/tools/HarperDb109/HarperDB/hdb/schema/sensor/bp/userid',
        '/home/ashwini/tools/HarperDb109/HarperDB/hdb/schema/sensor/sugar/userid',
        '/home/ashwini/tools/HarperDb109/HarperDB/hdb/schema/sensor/weight/userid'
      ], {
        ignoreInitial: true,
        ignored: /^\./,
        persistent: false,
        interval: 1000,
        atomic: false
      })
      .on('add', path => {
        console.log(`Directory ${path} has been added`);
        fs.readFile(path, 'utf8', function (err, userid) {
          if (err) throw err;
          console.log(userid);
          //Make a several queries to read bp, sugar and weight from  the database to retrieve results.
          var latestReadings = {};
          db.connect('http://localhost:9925')
            .then(() => {
              db.request({
                "operation": "sql",
                "sql": "select * from sensor.bp where userid = " + userid + " order by time desc limit 1 "
              })
                .then(res => {
                  latestReadings['bp'] = res[0].reading;
                  db.request({
                    "operation": "sql",
                    "sql": "select * from sensor.sugar where userid = " + userid + " order by time desc limit 1 "
                  })
                    .then(res => {
                      latestReadings['sugar'] = res[0].reading;
                      db.request({
                        "operation": "sql",
                        "sql": "select * from sensor.weight where userid = " + userid + " order by time desc limit 1 "
                      })
                        .then(res => {
                          latestReadings['weight'] = res[0].reading;
                          console.log(latestReadings);
                          //Alert by pushing to client if criteria is met
                          if (latestReadings.weight > 150 || latestReadings.bp >150 || latestReadings.sugar > 150){ 
                            ///  Push to clients using websocket
                            let toPush = userid + " : " + JSON.stringify(latestReadings);
                            io.emit('message', { type: 'new-message', text: toPush });
                          ////
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          console.log(err.body.error);
                        });
                    })
                    .catch(err => {
                      console.log(err);
                      console.log(err.body.error);
                    });
                })
                .catch(err => {
                  console.log(err);
                  console.log(err.body.error);
                });
            });
          ///////

        });
      });
  }

  socket.on('add-message', (message) => {
    io.emit('message', { type: 'new-message', text: message });
  });
});

http.listen(8088, () => {
  console.log('started on port 8088');
});
