const { User } = require('../db');
const { Op } = require("sequelize");
const { onlyLettersCheck, onlyDateCheck, onlyNumbersCheck, isEmailCheck, httpsLinkCheck, statusCheck, priviligeCheck } = require('../helpfuls/regex');
const loadUsers = require('../data/users.json');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;


//! GET show all users Users --------------
// tema de como debo enviar el res.status del error con el next
// terminar de arreglar linea 15 next(err);
async function getAllUsers(req, res, next) {
    try {
        const allUser = await User.findAll({});
        return res.status(200).send(allUser)
    } catch (err) {
        next(err);
    };
};
//!--------------

//! POST de create user --------------
// date_birth = yyyy-mm-dd
// privilige = [ true, false ]
// status = [ 'active', 'disabled' ]
// mobile se creo en modelo como type: DataTypes.STRING, ya que genera error con numeros de mayores a 9 digitos

// Falta validar !!! 2023-02-10 
// terminar de arreglar linea 36 if ( !onlyLettersCheck(first_name) || !onlyLettersCheck(last_name) || !onlyLettersCheck(nationality) || !onlyLettersCheck(genre) || !onlyDateCheck(date_birth) || !onlyLettersCheck(type_doc) || !onlyNumbersCheck(identification_doc) || !isEmailCheck(email) || !onlyNumbersCheck(mobile) || !httpsLinkCheck(image) || !statusCheck(status) || !priviligeCheck(privilige) || !user_password ){
// user_password
// tema de como debo enviar el res.status del error con el next
// terminar de arreglar linea 44 next(err);
// revisando pull req

// async function postNewUser(req, res){
//     try{
//         let { first_name, last_name, nationality, genre, date_birth, type_doc, identification_doc, email, mobile, image, status, privilige } = req.body;
//         let user_password = await bcrypt.hashSync(req.body.user_password, 10);
//         if ( !onlyLettersCheck(first_name) || !onlyLettersCheck(last_name) || !onlyLettersCheck(nationality) || !onlyLettersCheck(genre) || !onlyDateCheck(date_birth) || !onlyLettersCheck(type_doc) || !onlyNumbersCheck(identification_doc) || !isEmailCheck(email) || !onlyNumbersCheck(mobile) || !httpsLinkCheck(image) || !statusCheck(status) || !priviligeCheck(privilige) || !user_password ){
//             return res.status(412).send({ message: "information required" });
//         }
//         let user = { first_name, last_name, nationality, genre, date_birth, type_doc, identification_doc, email, mobile, image, status, privilige, user_password };
//         let ceateUser = await User.findOrCreate({where: user});
//         return res.status(201).send({ message: "User was created" });
//     } catch(err){
//         res.status(500).json({ error: err});
//     };
// }
// //!--------------
//! Init Cambios @Felipe y @Leo --------------

async function postNewUser(req, res) {
    try {
        /*let { first_name, last_name, nationality, genre, date_birth, type_doc, identification_doc, email, mobile, image, status, privilige } = req.body;
        let user_password = await bcrypt.hashSync(req.body.user_password, 10);
        if (!onlyLettersCheck(first_name) || !onlyLettersCheck(last_name) || !onlyLettersCheck(nationality) || !onlyLettersCheck(genre) || !onlyDateCheck(date_birth) || !onlyLettersCheck(type_doc) || !onlyNumbersCheck(identification_doc) || !isEmailCheck(email) || !onlyNumbersCheck(mobile) || !httpsLinkCheck(image) || !statusCheck(status) || !priviligeCheck(privilige) || !user_password) {
            return res.status(412).send({ message: "information required" });*/

        let { email } = req.body;
        if (!isEmailCheck(email)) {
            return res.status(412).send({ message: "information required" });
        }
        let user = { email };
        let ceateUser = await User.findOrCreate({ where: user });
        return res.status(201).send({ message: "User was created" });
    } catch (err) {
        res.status(500).json({ err: err });
    };
}
//! End Cambios @Felipe y @Leo --------------

// //! GET signIn user --------------
// async function signIn(req, res){
//     try{
//         let { email, user_password } = req.body;
//         User.findOne({
//             where: {
//                 email: email
//             }
//         }).then(user => {
//             if(!user) {
//                 res.status(404).json({msg: "User don't found"})
//             } else {
//                 if(bcrypt.compareSync(user_password, user.user_password)){
//                     res.status(201).json({ msg: "TRUE"}) 
//                 } else {
//                     res.status(401).json({ msg: "Invalid Password"})
//                 }
//             }
//         })
//     } catch(err){
//         res.status(400).json({ error: err});
//     }
// }
//! body json
// { 
// 	"email" : "zimlama@gmail.com",
// 	"user_password" : "leoWasHere"
// }
// //!--------------

//! Init Cambios @Felipe y @Leo --------------
//!-------------- disable    ------ enable  
async function DisableUser(req, res) {
    try {
        let { email } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (user.status === "active") {
            user.update({ status: "disabled" });
        } else if (user.status === "disabled") {
            user.update({ status: "active" });
        }
        res.status(201).json(user);
        //res.send(user);
    } catch (err) {
        res.status(401).json({ message: err });
    };
};
//!-------------- Modifi user -------------------------------  
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 async function ModifyUser(req, res) {
    try {
       let { email } = req.params;
       let { first_name, last_name, nationality, date_birth, mobile } = req.body;
 
       const user = await User.findOne({
          where: {
             email: email
          }
       });
 
       if (!user) {
          return res.status(404).json({msg: "user not found"});
       }
 
       let imageUrl;
 
       if (req.file) {
          // Si se proporcionó un archivo, subirlo a Cloudinary y obtener la URL de la imagen
          const result = await cloudinary.uploader.upload(req.file.path,{
            public_id: user.email
          });
          imageUrl = result.secure_url;
       } else if (req.body.image) {
          // Si se proporcionó una URL de imagen, subirla a Cloudinary y obtener la URL de la imagen
          const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: user.email
          });
          imageUrl = result.secure_url;
       }
 
       // Actualizar la información del usuario y la URL de la imagen, si corresponde
       user.update({
          first_name: first_name,
          last_name: last_name,
          nationality: nationality,
          date_birth: date_birth,
          mobile: mobile,
          image: imageUrl,
       });
 
       // Responder con el usuario actualizado
       res.status(201).json(user);
    } catch (err) {
       res.status(401).json({ message: err });
    };
 }
 

/*async function ModifyUser(req, res) {
    try {
        let { email } = req.params;
        let { first_name, last_name, nationality, date_birth, mobile } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            user.update({
                first_name: first_name,
                last_name: last_name,
                nationality: nationality,
                date_birth: date_birth,
                mobile: mobile
            });
            res.status(201).json(user);
            //res.send(user);

        } else {
            res.status(404).json({msg: "user not found"});
            //res.send("user not found");
        }
    } catch (err) {
        res.status(401).json({ message: err });
    };
}*/
//!--------------
//! End Cambios @Felipe y @Leo --------------


module.exports = {
    getAllUsers,
    postNewUser,
    DisableUser,
    ModifyUser
};