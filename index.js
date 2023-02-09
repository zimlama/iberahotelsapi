//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { load } = require('dotenv');
const server = require('./src/app.js');
const { loadAllModelsInDB } = require('./src/controllers/loadData.js')
const { conn, Hotel } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
 server.listen(3001,async () => {
 console.log('%s listening at 3001');
    // modo railway app no se va usar esto
     const hotels = await Hotel.findAll()
     hotels.length > 0 ? null : loadAllModelsInDB(); // eslint-disable-line no-console




//require("dotenv").config();
//const { PORT } = process.env;
// Syncing all the models at once.
//conn.sync({ force: true }).then(async () => {
 // server.listen(PORT, async () => {
 //   console.log(`istening at ${PORT}`);
//  });
//});



//const server = require('./src/app.js');

//const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
// server.listen(3001, () => {
//   console.log('%s listening at 3001'); // eslint-disable-line no-console
});
 });
