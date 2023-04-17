const Product = require("../models/Product");
const router = require("express").Router();

//OLUŞTURMA

router.post("/",  async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GÜNCELLEME
router.put("/:id",  async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SİLME
router.delete("/:id",  async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Ürün Silindi");
  } catch (err) {
    res.status(500).json(err);
  }
});

//ÜRÜNE GİTME
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


// NODEJS Sorgu
// router.get("/search", async (req, res) => {
//   try {
//     const { q }= req.query;
//     const product_data = await Product.find({"title":{$regex: ".*"+q+".*"}});
//     if (product_data.length > 0) {
//       res.status(200).json(product_data)
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//BÜTÜN ÜRÜNLER
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;