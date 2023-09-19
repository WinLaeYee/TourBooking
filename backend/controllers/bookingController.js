import Booking from "../models/Booking.js";

//create new booking
export const createBooking = async (req, res) => {
  //const newBooking = new Booking(req.body);
  console.log("reqbody", req.body);
  const newBooking = await Booking.create({
    userId: req.body.userId,
    userEmail: req.body.userEmail,
    tourName: req.body.tourName,
    fullName: req.body.fullName,
    guestSize: req.body.guestSize,
    phone: req.body.phone,
    bookAt: req.body.bookAt,
  });

  try {
    //const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({ success: true, message: "Successful", data: book });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//get all booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();

    res.status(200).json({ success: true, message: "Successful", data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBookingsByTourName = async (req, res) => {
  const tourName = req.params.tourName;

  try {
    const bookings = await Booking.find({ tourName });
    res
      .status(200)
      .json({ success: true, message: "Successful", data: bookings });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getBookingsByUser = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId value", userId);
  try {
    const userBookings = await Booking.find({ userId });

    console.log("user booking", userBookings);

    res
      .status(200)
      .json({ success: true, message: "Successful", data: userBookings });
  } catch (err) {
    console.log("Error fetching user bookings:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/*  export const getBookingsByUser = async (req, res) => {
    const userId = req.params.userId;
    console.log('userId value', userId);
  
    // Create the Mongoose query object
    const query = Booking.find({ userId });
  
    // Log the Mongoose query object (the query has not been executed yet)
    console.log('Database Query:', query);
  
    try {
      const userBookings = await query.exec(); // Execute the query
      console.log('user booking', userBookings);
  
      res.status(200).json({ success: true, message: 'Successful', data: userBookings });
    } catch (err) {
      console.error('Error fetching user bookings:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
   */

  export const cancelBooking = async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
  
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);
  
      if (!deletedBooking) {
        
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

    res.json({ success: true, message: 'Booking canceled successfully' });
  } catch (error) {
    console.log('Error canceling booking:', error);
    res.status(500).json({ success: false, message: 'Unable to cancel booking' });
  }
};
  