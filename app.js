const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.json());
app.use(express.static("public"));

// Rota para buscar empresas
app.get("/api/empresas", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Erro ao carregar o banco de dados.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Rota para atualizar empresas
app.post("/api/empresas", (req, res) => {
  const { empresas } = req.body;

  fs.writeFile("database.json", JSON.stringify(empresas, null, 2), (err) => {
    if (err) {
      res.status(500).send("Erro ao salvar os dados.");
    } else {
      res.send("Dados atualizados com sucesso.");
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
