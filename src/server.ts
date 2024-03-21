import express from "express";
import { router } from "./routes";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router)

 const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on("SIGINT", ()=>{
  server.close()
  console.log("Servidor finalizado")
})
