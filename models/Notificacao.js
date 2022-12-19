const mongoose = require('mongoose')

//define as ""colunas"
const Notificacao = mongoose.model('Notificacao',{
    data: String,
    tipo_notificacao: String,
    situacao_vacinal: String,
    tipo_vinculo: String
})

module.exports = Notificacao

