import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUser, getUser } from './database.js';

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const admin = {
  email: `luizgabrielgrupe@gmail.com`,
  password: `luizteste123`
}

const cache = {}; // Objeto para armazenar os emails e senhas em cache

// Endpoint para receber email e senha e salvar na variável
app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };

  if (email === admin.email && password === admin.password) {
    // Verifica se o usuário já está em cache
    if (cache[email]) {
      res.json({
        ...user, isAdm: true, dataAdm: await getUser()
      });
      return;
    }
    
    const dataAdm = await getUser();
    cache[email] = dataAdm; // Armazena as informações do usuário em cache

    res.json({
      ...user, isAdm: true, dataAdm
    });
    return;
  }
  
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'Usuário já existe' });
      return;
    }

    // Cria um novo usuário no banco de dados
    createUser(user);

    res.status(201).json(user);
  } catch {
    res.sendStatus(400);
  }
});

// Função para obter usuário pelo email
const getUserByEmail = async (email) => {
  const users = await getUser();
  return users.find(user => user.email === email);
};

// Endpoint para retornar todos os emails e senhas
// app.get('/users', async (req, res) => {
//   const users = await getUser();
//   res.status(200).json(users);
// });

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
