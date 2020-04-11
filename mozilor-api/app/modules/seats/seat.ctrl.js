const HttpStatus = require('http-status-codes');
const seatService = require('./seat.service');

/**
 * Returns all the seats in the system
 */
const getAllSeats = async (req, res) => {
  try {
    const response = await seatService.getAllSeats();
    return res.status(HttpStatus.OK).send(response);
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 500, message: err.message });
  }
};

/**
 * To mark a seat as reserved
 */
const reserveSeat = async (req, res) => {
  try {
    const response = await seatService.reserveSeat(req);
    return res.status(HttpStatus.OK).send({ status: 200, data: response, message: 'Seat reserved successfully' });
  } catch (err) {
    return res.status(HttpStatus.BAD_REQUEST).send({ status: 400, message: err.message });
  }
};

/**
 * To mark a seat as available
 */
const cancelReservation = async (req, res) => {
  try {
    const response = await seatService.cancelReservation(req);
    return res.status(HttpStatus.OK).send({ status: 200, data: response, message: 'Reservation canceled successfully' });
  } catch (err) {
    return res.status(HttpStatus.BAD_REQUEST).send({ status: 400, message: err.message });
  }
};

module.exports = {
  getAllSeats,
  reserveSeat,
  cancelReservation
};
