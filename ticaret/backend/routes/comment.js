const Comment = require("../models/Comment");
const router = require("express").Router();


//YORUM EKLEME
router.post("/", async (req,res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }catch(err){
        res.status(500).json(err)
    }
})

// YORUM SİLME
router.delete("/:id", async (req,res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Yorum Silindi")
    }catch(err){
        res.status(500).json(err)
    }
})

// YORUM GÜNCELLEME
router.put("/:id", async (req,res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            {new:true}
        )
        res.status(200).json(updatedComment)
    }catch(err){
        res.status(500).json(err)
    }
})

// YORUM ÇAĞIRMA
router.get("/", async (req,res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json(comments)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;