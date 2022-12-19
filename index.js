require('dotenv').config()
const express = require('express') //importa o express
const mongoose = require('mongoose')
const app = express() //executa o express como uma funçao

//lendo JSON -> middlewares
app.use( //cria o middleware para envio
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json()) //outro middleware usando json para leitura

// ------ endpoints ----------- 
const notificacaoRoutes = require('./routes/notificacaoRoutes')
app.use('/notificacao', notificacaoRoutes)


//rota inicial para acessar dados no Postman
app.get('/', (req, res)=>{ //express pode le dados recebidos na requisição e possibilita a resposta
    //mostrar requisição

    res.json({message: 'Oi. E stou funcionando!'})
})

//configurações de acesso
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

mongoose.set('strictQuery', true) //oculta warning de método deprecado

mongoose //conecta ao banco
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.wqqhusz.mongodb.net/apibanco?retryWrites=true&w=majority`
    )
    .then(()=>{
        console.log('Conectado ao MongoBD!')
        app.listen(process.env.PORT)
    })
    .catch((err) => console.log(err)) //se erro de conexão
