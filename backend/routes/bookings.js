import express from 'express';
import {createBooking, getAllBooking, getBooking, getBookingsByTourName, getBookingsByUser, cancelBooking} from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();



router.post('/', createBooking);

router.get('/:id', getBooking);

router.get('/', getAllBooking);

router.get('/by-tour/:tourName',verifyAdmin, getBookingsByTourName);

router.get('/by-user/:userId', getBookingsByUser);

router.delete('/:bookingId', cancelBooking);

export default router