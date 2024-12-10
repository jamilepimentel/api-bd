

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'Jp842644!', 
  database: 'produtos_db'
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use(express.json());

app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar produtos' });
    }
    res.status(200).json(results);
  });
});

app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar produto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(results[0]);
  });
});

app.post('/produtos', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  if (!nome || quantidade == null || preco == null) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query('INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)', [nome, quantidade, preco], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir produto' });
    }
    res.status(201).json({ id: results.insertId, nome, quantidade, preco });
  });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;

  if (!nome || quantidade == null || preco == null) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query('UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?', [nome, quantidade, preco, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao alterar produto' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ id, nome, quantidade, preco });
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});