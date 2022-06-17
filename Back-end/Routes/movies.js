const router = require("express").Router();
const verify = require("../VerfiyToken") ;
const Movie = require("../Models/Movie");
var id=0;

//Adding a new movie
router.post("/AddMovie",verify, async (req, res)=>{
    if(req.user.isAdmin){

        const newMovie = new Movie({
            //id:++id,
        title: req.body.title,
         desc: req.body.desc,
        img:req.body.img,
        imgTitle:req.body.imgTitle,
        imgSm:req.body.imgSm,
        trailer:req.body.trailer,
        year:req.body.year,
        limit:req.body.limit,
        genre:req.body.genre,
        video: req.body.video,
    })
    
    try {
           const savedMovie= await newMovie.save();
            // const movie = newMovie;
            res.status(201).json(savedMovie);
            //console.log(newMovie.movieName, newMovie.describtion, newMovie.year);
        
    }
    catch (error) {
        res.status(500).json(error);
    }
}
else{
    res.status(403).json("You are not an admin");
} 
})


//Update A movie
router.put("/:id",verify, async (req, res)=>{
    if(req.user.isAdmin){
        
        // const movie =await Movie.findOne({id:req.params.id});
        // movie.movieName=req.body.movieName;
        // movie.describtion=req.body.describtion;
        // movie.duration=req.body.duration;
        // movie.year=req.body.year;
        // // movie.movieVid=req.body.movieVid||movie.movieVid;
        // const newMovie=await movie.save();
        // res.json(newMovie);
    
    try {
        const UpdateMovie = await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            // const movie = newMovie;
            res.status(200).json(UpdateMovie);
            //console.log(newMovie.movieName, newMovie.describtion, newMovie.year);
        
    }
    catch (error) {
        res.status(500).json(error);
    }
}
else{
    res.status(403).json("You are not an admin");
} 
})

//Delete A movie
router.delete("/:id",verify, async (req, res)=>{
    if(req.user.isAdmin){
    
    try {
         await Movie.findByIdAndDelete(req.params.id);
            // const movie = newMovie;
            res.status(200).json("Deleted Movie");
            //console.log(newMovie.movieName, newMovie.describtion, newMovie.year);
        
    }
    catch (error) {
        res.status(500).json(error);
    }
}
else{
    res.status(403).json("You are not an admin");
} 
})

//Get a movie by id
router.get("/find/:id",async(req,res)=>{
    try{

        const movie =await Movie.findById(req.params.id); 
            console.log(movie);
            res.status(200).json(movie);
    }catch(err){
        console.log(err);

    }
})

//Get a random movie 
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //GET ALL movies

router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

module.exports=router;