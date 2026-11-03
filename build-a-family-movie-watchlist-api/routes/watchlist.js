
import express from "express";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

// GET user's watchlist
router.get("/:userId", authenticate, (req, res) => {
  const watchlist = getWatchlist(Number(req.params.userId));

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(watchlist);
});

// POST add movie
router.post(
  "/:userId/movies",
  authenticate,
  authorizeModification,
  (req, res) => {
    const movie = addMovie(Number(req.params.userId), req.body);

    if (movie === null) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json(movie);
  },
);

// PUT update movie
router.put(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const movie = updateMovie(
      Number(req.params.userId),
      Number(req.params.movieId),
      req.body,
    );

    if (movie === null) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  },
);

// DELETE movie
router.delete(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const deleted = deleteMovie(
      Number(req.params.userId),
      Number(req.params.movieId),
    );

    if (deleted === null) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  },
);

export default router;
