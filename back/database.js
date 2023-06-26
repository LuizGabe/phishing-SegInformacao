import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';

const DATABASE_PATH = 'local_database.json';

// Configuração do Sequelize
const sequelize = new Sequelize('phishing', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

// Verifica se o banco de dados local existe
const isLocalDatabaseExist = () => {
  return fs.existsSync(DATABASE_PATH);
};

// Carrega os dados do banco de dados local
const loadLocalDatabase = () => {
  const data = fs.readFileSync(DATABASE_PATH, 'utf8');
  return JSON.parse(data);
};

// Salva os dados no banco de dados local
const saveLocalDatabase = (data) => {
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(data));
};

// Cria o arquivo do banco de dados local se não existir
const createLocalDatabaseFile = () => {
  const initialData = { users: [] };
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(initialData));
};

// Verifica se o arquivo do banco de dados local existe e cria se necessário
if (!isLocalDatabaseExist()) {
  createLocalDatabaseFile();
}

// Define o modelo da tabela
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincroniza o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabela criada ou atualizada no banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo:', error);
  });

// Função para criar um usuário
const createUser = async ({ email, password }) => {
  try {
    const user = await User.create({ email, password });
    return user;
  } catch (error) {
    if (isLocalDatabaseExist()) {
      const localDatabase = loadLocalDatabase();
      localDatabase.users.push({ email, password });
      saveLocalDatabase(localDatabase);
      console.log('Usuário salvo no banco de dados local');
    } else {
      throw error;
    }
  }
};

// Função para obter usuários
const getUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    if (isLocalDatabaseExist()) {
      const localDatabase = loadLocalDatabase();
      console.log('Dados obtidos do banco de dados local');
      return localDatabase.users;
    } else {
      throw error;
    }
  }
};

export { createUser, getUser };
