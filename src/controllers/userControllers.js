const{User} = require('../db');
const { Op } = require("sequelize");

const loadUsers = require('../data/users.json');

//!GET de Users

const getAllUsers = async (req, res) =>{
    console.log(loadUsers , "RACATA")
        try{
            const allUser = await User.findAll({
            });
            console.log(allUser.length ,"allUser")
                    return res.status(200).send(allUser)
                 
        }catch(e){
            console.log(e)
        }
};



//! POST de Users

const postNewUser = async (req, res) => {
	let{
		first_name,
        last_name,
        nationality,
        type_doc,
        identification_doc,
        email,
        genre,
        date_birth,
        mobile,
        image,
        status,
        privilige
	} = req.body

	let user = {first_name, last_name,nationality,genre,date_birth,type_doc,identification_doc,email,mobile,image,status,privilige	}
	let createUser =  await User.create(user)
	res.send(createUser)

 }


//!!

module.exports = {
    getAllUsers,
    postNewUser,
}