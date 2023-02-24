const { User } = require('../db');
const { Op } = require("sequelize");
const { onlyLettersCheck, onlyDateCheck, onlyNumbersCheck, isEmailCheck, httpsLinkCheck, statusCheck, priviligeCheck } = require('../helpfuls/regex');
const loadUsers = require('../data/users.json');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


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
//!--------------

//! GET signIn user --------------

async function signIn(req, res) {
    try {
        let { email, user_password } = req.body;
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "User don't found" })
            } else {
                if (bcrypt.compareSync(user_password, user.user_password)) {
                    res.status(201).json({ msg: "TRUE" })
                } else {
                    res.status(401).json({ msg: "Invalid Password" })
                }
            }
        })
    } catch (err) {
        res.status(400).json({ error: error });
    }
}

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

        res.send(user);

    } catch (error) {

        console.log(error);

    };

};

//!--------------// get User

async function getUser(req, res) {


    const { email } = req.body;

    if (email) {
        const findUser = await User.findAll({
            where: { email: email }
        });

        if (findUser.length === 0) {
            return res.status(404).send("User not found")
        }

        res.json(findUser)
    }

};

module.exports = {
    getAllUsers,
    postNewUser,
    signIn,
    DisableUser,
    getUser
}