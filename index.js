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
const server = require('./src/app.js');
const { loadAllModelsInDB } = require('./src/controllers/loadData.js')
const { conn, Hotel } = require('./src/db.js');


require("dotenv").config();
const { PORT } = process.env;
//Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
 server.listen(PORT, async () => {
  loadAllModelsInDB(); // eslint-disable-line no-console
  console.log(`istening at ${PORT}`);    
 });
});
