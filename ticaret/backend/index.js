const commentRoute = require("./routes/comment");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

//MONGO DB BAĞLANTISI
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Bağlantısı Başarılı"))
  .catch((err) => {
    console.log(err);
});


//ROUTERLARI ,ARA YAZILIMLARI ÇAĞIRMA
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/products", productRoute);


//PORTU BAŞLATMA
app.listen(process.env.PORT || 5000, () => {
  console.log("Server Tarafı Çalışıyor");
});