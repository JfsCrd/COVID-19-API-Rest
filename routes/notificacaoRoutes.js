const router = require('express').Router()
const Notificacao = require('../models/Notificacao')

//inserção de notificação 
router.post('/', async (req, res)=>{
    //paga dados do body
    const { data, tipo_notificacao, situacao_vacinal, tipo_vinculo } = req.body
    //usa os dados o body numa varivel para inserção
    const notificacao = {
        data,
        tipo_notificacao,
        situacao_vacinal,
        tipo_vinculo
    }

     //valida que foram enviados dados no body
     if(!data && !tipo_notificacao && !situacao_vacinal && !tipo_vinculo)
        res.status(422).json({error: 'Todos os campos são obrigatórios!'})
    
    else{
        //cria dados no banco de dados
        try{
            await Notificacao.create(notificacao) //cria uma notificaçao com os dados do body
            res.status(201).json({message: 'Notificação Registrada!'})

        }catch(error){
            res.status(500).json({error: error})
        }
    }
})

//leitura de notificação 
router.get('/', async(req, res)=>{
    try{
        const notificacao = await Notificacao.find() //procura por todas as notificaçoes
        res.status(200).json(notificacao) //exibe as notificações

    }catch(error){
        res.status(500).json({error: error})
    }
})

//atualizar notificação
router.patch('/:id', async(req, res)=>{
    const id = req.params.id //atribui o valor da url à variavel id
    const {data, tipo_notificacao, situacao_vacinal, tipo_vinculo} = req.body //atribui as variáveis do body
    //usa os dados o body numa varivel para atualizaçao
    const notificacao = {
        data,
        tipo_notificacao,
        situacao_vacinal,
        tipo_vinculo
    }

    try{
        const notificao_atual = await Notificacao.updateOne({_id: id}, notificacao) //atualiza a notificação

        if(notificao_atual.matchedCount>=1){ //se houve uma ou mais atualização, exibe a menssagem
            res.status(200).json(notificacao)
        }
        else{
            res.status(422).json({message:'Notificação não encontrada!'})
        }
    }catch(error){
        res.status(500).json({error: error})
    }
})

//deletar notificação
router.delete('/:id', async(req, res)=>{

    const id = req.params.id
    const notificacao = await Notificacao.findOne({_id: id})

    if(!notificacao){
        res.status(422).json({message:'Notificação não encontrada!'})
        return
    }

    try {
        await Notificacao.deleteOne({_id: id})
        res.status(200).json({message:'Notificação removida!'})
    } catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router