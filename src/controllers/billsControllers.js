const {Bills}= require("../db");

//!POST partners
const postNewBills = async (req, res) => {
    let { item,
        quantity,
        date,
        price
        } = req.body;
        
try {
        let bill = {
        item,
        quantity,
        date,
        price
        }
        let findOrCreateBill = await Bills.findOrCreate({where: bill})
        
    res.status(200).json('Your Bill was created successfully')
} catch (error) {
    res.status(404).json("Your Bill was not created sucessfully")
}
    
 }


//!GET partners
const getAllBills = async (req, res) =>{
	try{
		const allBills = await Bills.findAll({
		})
        res.status(200).send(allBills)		 	
	}catch(e){
		res.status(404).json(e)
	}
}

  //!!!
  module.exports ={
	postNewBills,
    getAllBills
    
}
