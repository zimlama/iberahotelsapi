const{User} = require('../db');
const { Op } = require("sequelize");
const { onlyLettersCheck, onlyDateCheck, onlyNumbersCheck, isEmailCheck, httpsLinkCheck, statusCheck, priviligeCheck } = require('../helpfuls/regex');
const loadUsers = require('../data/users.json');


//! GET show all users Users --------------
// tema de como debo enviar el res.status del error con el next
// terminar de arreglar linea 15
async function getAllUsers(req, res, next){
    try{
        const allUser = await User.findAll({ });
        return res.status(200).send(allUser) 
    } catch(err){
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
// terminar de arreglar linea 35
// user_password
// tema de como debo enviar el res.status del error con el next
// terminar de arreglar linea 43 next(err);
// revisando pull req

async function postNewUser(req, res, next){
    try{
        let { first_name, last_name, nationality, genre, date_birth, type_doc, identification_doc, email, mobile, image, status, privilige, user_password } = req.body;
        if ( !onlyLettersCheck(first_name) || !onlyLettersCheck(last_name) || !onlyLettersCheck(nationality) || !onlyLettersCheck(genre) || !onlyDateCheck(date_birth) || !onlyLettersCheck(type_doc) || !onlyNumbersCheck(identification_doc) || !isEmailCheck(email) || !onlyNumbersCheck(mobile) || !httpsLinkCheck(image) || !statusCheck(status) || !priviligeCheck(privilige) || !user_password ){
            return res.status(412).send({ message: "information required" });
        }
        let user = { first_name, last_name, nationality, genre, date_birth, type_doc, identification_doc, email, mobile, image, status, privilige, user_password };
        let ceateUser = await User.findOrCreate({where: user});
        console.log("esto es ceateUser: ", ceateUser);
        return res.status(201).send({ message: "User was created" });
    } catch(err){
        next(err);
    };
}
//!--------------

module.exports = {
    getAllUsers,
    postNewUser,
}