const{User} = require('../db');
const { Op } = require("sequelize");



//!GET de Users
const getAllUsers = async (req, res) =>{

}





//! POST de Users

const postNewUser = async (req, res) => {
	let{
		first_name,
        last_name,
        nationality,
        type_doc,
        identification_doc,
        email,
        mobile,
        image,
        status,
        privilige
	} = req.body

	let user = {first_name, last_name,nationality,type_doc,identification_doc,email,mobile,image,status,privilige	}
	let createUser =  await User.create(user)
	res.send(createUser)

 }


//!!

module.exports = {
    getAllUsers,
    postNewUser,
}