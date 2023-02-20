const {Partners}= require("../db");



//!POST partners
const postNewPartners = async (req, res) => {
    let { first_name, 
        last_name, 
        nationality, 
        type_doc, 
        identification_doc, 
        email, 
        genre, 
        date_birth, 
        mobile
    } = req.body;
try {
    let partner = {
        first_name, 
        last_name, 
        nationality, 
        type_doc, 
        identification_doc, 
        email, 
        genre, 
        date_birth, 
        mobile	}
    let createPartners =  await Partners.findOrCreate({where: partner})
    res.status(200).json('Your Partners was created successfully')
} catch (error) {
    res.status(404).json("Your Partners was not created sucessfully")
}
    
 }

//!GET partners
const getAllPartners = async (req, res) =>{
	try{
		const allPartners = await Partners.findAll({
		})
        res.status(200).send(allPartners)		 	
	}catch(e){
		res.status(404).json(e)
	}
}

 //!!!
 module.exports ={
	postNewPartners,
    getAllPartners
}