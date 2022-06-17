const router = require("express").Router();
const Movie = require("../models/Movie");

router.post("/AddMovie", async (req, res) => {
  console.log("req = " + req.body.title);
  try {
    const newMovie = new Movie({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      imgTitle: req.body.imgTitle,
      imgSm: req.body.imgSm,
      trailer: req.body.trailer,
      year: req.body.year,
      limit: req.body.limit,
      genre: req.body.genre,
      video: req.body.video,
    });

    const addedMovie = await newMovie.save();
    if (addedMovie) {
      res.status(201).json(newMovie);
      console.log("data Saved");
    } else {
      res.status(500).json("Invalid Adding");
      console.log("error in Adding");
    }
  } catch (error) {
    res.status(500).json("Invalid Adding !! Movie is already existed...");
    console.log(error);
  }
});

router.get("/Movies", async (req, res) => {
  try {
    const AllMovies = await Movie.find();
    if (AllMovies) {
      res.json(AllMovies);
    } else {
      res.json("No Movies existed");
    }
  } catch (error) {
    res.status(500).json("No Movies existed...");
    console.log(error);
  }
});

router.put("/movie/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (updatedMovie) {
      res.json(updatedMovie);
    } else {
      res.json("invlid Update !! Movie not existed");
    }
  } catch (error) {
    res.status(500).json("invlid Update !! Movie not existed...");
    console.log("Movie Update Error " + error);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const existMovie = await Movie.findById(req.params.id);
    if (existMovie) {
      console.log(existMovie);
      res.status(200).json(existMovie);
    } else {
      res.json("invlid Get !! Movie not existed");
    }
  } catch (err) {
    res.status(500).json("invlid Get !! Movie not existed...");
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (deletedMovie) {
      res.status(200).json(deletedMovie);
    } else {
      res.json("invlid Delete !! Movie not existed");
    }
  } catch (err) {
    res.status(500).json("invlid Delete !! Movie not existed...");
    console.log(err);
  }
});

module.exports = router;
