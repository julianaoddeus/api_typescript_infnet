import "dotenv/config";
import app from "./app.js";

const port: number = 3000;

app.listen(port, () => {
  console.log(`Serviço executando na porta ${port}`);
});
