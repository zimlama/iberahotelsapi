const { User, Reviews, Bills, Hotel } = require('../db');

const postReview = async (req, res) => {
  const { idUser, hotelId, comment, rating } = req.body;

  // Verificar si el usuario tiene facturas aprobadas
  const approvedBills = await Bills.findAll({
    where: {
        idUser,
      payment_status: 'approved'
    }
  });
  
  if (approvedBills.length === 0) {
    return res.status(403).json({ error: 'No se han aprobado facturas para este usuario.' });
  }

  // Crear la reseña
  const review = await Reviews.create({
    idUser,
    hotelId,
    comment,
    rating
  },
  {
    include: [
      {
        model: User,
        attributes: ['id', 'name'] // Atributos del usuario que quieres mostrar
      },
      {
        model: Hotel,
        attributes: ['idHotels', 'name'] // Atributos del hotel que quieres mostrar
      }
    ]
  });

  return res.json(review);
};

module.exports = {
     postReview };
