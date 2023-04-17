const User = require('../models/User');
const CryptoJS = require('crypto-js')
const router = require('express').Router();

//KULLANICI OLUŞTURMA
router.post("/", async (req,res)=>{
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }

})


//KULLANICI GÜNCELLEME
router.put("/:id", async(req,res) => {
    if(req.params.id){
        req.body.password= CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            {new:true}
        );
        res.status(200).json(updatedUser)
    }catch(err){res.status(500).json(err)}
})



//KULLANICI SİLME
router.delete("/:id",async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Kullanici Silindi")
    }catch(err){
        res.status(500).json(err)
    }
})


//KULLANICI BULMA
router.get("/:id",async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

//BÜTÜN KULLANICILAR
router.get("/",async (req,res) => {

    const query = req.query.new;
    try{
        const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;