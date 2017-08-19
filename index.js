'use strict'
//importacao dos modules
import express from 'express';
import  bodyParser from 'body-parser';
import userRoute from './routes/users';
import datasource from './config/datasources';
import config from './config/config';
import authorization from './auth';
import authRoute from './routes/auth.js';


//Instancia do express
const app = express();
app.use(express.static('public'));
//Injeta config  e datasource no app
app.config = config;
app.datasource = datasource(app);
//Seta bodyParser para trabalhar com json nas requisições
app.use(bodyParser.json());
//Inicializa auth
const auth = authorization(app);
app.use(auth.initialize());
//Injeta o auth no app para ser usado nas rotas
app.auth = auth;
//Rota raiz da aplicação index.html
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
//Rota de login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
})

//Rota para area administrativa
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});
//Rota para editar contato
app.get('/admin/editar', (req, res) => {
  res.sendFile(__dirname + '/public/editarContato.html');
});
//Rota para adicionar contato
app.get('/admin/add', (req, res) => {
  res.sendFile(__dirname + '/public/addContato.html');
});
app.get('/admin/passwd', (req, res) => {
  res.sendFile(__dirname + '/public/alterPass.html');
});

//Importacao das rotas da api
authRoute(app);
userRoute(app);


//Inicia servidor web na porta 8000
app.listen(8000, () => {
  console.log("Aplicação rodando na porta 8000");
});
