const HttpStatus = require('http-status-codes');
const Seats = require('../../models').Seats;

/**
 * Get all seats from the DB
 */
const getAllSeats = async () => {
  return Seats.findAll({
    attributes: ['id', 'isReserved'],
    order: [
      ['id', 'ASC'],
    ],
  });
};

/**
 * Mark the seat as reserved in DB
 */
const reserveSeat = async (req, res) => {
  try {
    const result = await updateSeatStatus(req.params.seatNumber, true);  
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * Mark the seat as open for reservation in DB
 */
const cancelReservation = async (req, res) => {
  try {
    const result = await updateSeatStatus(req.params.seatNumber, false);  
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * Method to update the status of the seat in DB
 */
const updateSeatStatus = async (seatNumber, status) => new Promise((resolve, reject) => {
  return Seats.findOne({
    where: {
      id: seatNumber,
    }
  }).then((seat) => {
      if (!seat) {
        throw new Error('Seat not found');
      }
      seat.update({
        isReserved: status
      }).then((response)=> {
        resolve(response)
      })
  }).catch((err => {
    reject(err);
  }));
});

module.exports = {
  getAllSeats,
  reserveSeat,
  cancelReservation
};
