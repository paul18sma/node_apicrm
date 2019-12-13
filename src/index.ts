import express from "express";
import indexRoutes from "./routes/users";


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(indexRoutes);

app.listen(3000, () => {
    console.log('Server on port', 3000);
})