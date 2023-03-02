const { User, Reviews, Bills, Hotel } = require('../db');

const postReview = async (req, res) => {
  const { userId, hotelId, comment, rating } = req.body;

  // Verificar si el usuario tiene facturas aprobadas
  const approvedBills = await Bills.findAll({
    where: {
      userId,
      payment_status: 'approved'
    }
  });
  
  if (approvedBills.length === 0) {
    return res.status(403).json({ error: 'No se han aprobado facturas para este usuario.' });
  }
   // Verificar que el rating no sea mayor a 5
   if (rating > 5) {
    return res.status(400).json({ error: 'El rating debe ser igual o menor a 5.' });
  }

  // Crear la reseña
  const review = await Reviews.create({
    userId,
    hotelId,
    comment,
    rating: Math.min(rating, 5)
  });

  return res.json(review);
};


const getReviewsByHotelId = async (req, res) => {
  const hotelId = req.params.hotelId;

  try {
    const reviews = await Reviews.findAll({
      where: { hotelId },
      include: [
        { 
          model: User,
          attributes: ['first_name']
        },
        {
          model: Hotel,
          attributes: ['name']
        }
      ]
    });

    return res.json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las reseñas.' });
  }
};


const deleteReview = async (req, res) => {
  const { id } = req.params;

  // Verificar si la review existe
  const review = await Reviews.findByPk(id);
  if (!review) {
    return res.status(404).json({ error: 'No se encontró la review.' });
  }

  // Eliminar la review
  await review.destroy();

  res.status(204).send();
};



module.exports = {
     postReview ,
     getReviewsByHotelId,
     deleteReview
    };
