const express = require('express');
const router = express.Router();

const seatController = require('./seat.ctrl');

router.get('/seats', seatController.getAllSeats);
router.put('/seat/reserve/:seatNumber', seatController.reserveSeat);
router.put('/seat/cancel/:seatNumber', seatController.cancelReservation);

module.exports = router;
