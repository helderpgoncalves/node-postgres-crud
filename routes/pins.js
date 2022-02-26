// Categories Routes with Error Handling
const db = require("../db/connection");

// GET /api/pins
// Returns all Pins
// Attention: This function is bit buggy and expensive in terms of performance
const getPins = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM public.pins");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const getSinglePin = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM public.pins WHERE pin = $1", [
      req.body.pin,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json("Pin not found");
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    next(err);
  }
};

// Put "used" to true in the database
const usePin = async (req, res, next) => {
  // Check if pin is used
  try {
    const result = await db.query("SELECT * FROM public.pins WHERE pin = $1", [
      req.body.pin,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json("Pin not found");
    } else {
      // Check if pin is already used
      if (result.rows[0].used === true) {
        res.status(400).json("Pin already used");
      } else {
        // Update pin to used
        await db.query("UPDATE public.pins SET used = $1 WHERE pin = $2", [
          true,
          req.body.pin,
        ]);
        res.json("Pin used");
        // Delete pin from database
        // await db.query("DELETE FROM public.pins WHERE pin = $1", [req.body.pin]);
      }
    }
  } catch (err) {
    next(err);
  }
};

const deletePin = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM public.pins WHERE pin = $1", [
      req.body.pin,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json("Pin not found");
    } else {
      await db.query("DELETE FROM public.pins WHERE pin = $1", [req.body.pin]);
      res.json("Pin deleted");
    }
  } catch (err) {
    next(err);
  }
};

// Export Routes
module.exports = {
  getPins,
  getSinglePin,
  usePin,
  deletePin,
};
