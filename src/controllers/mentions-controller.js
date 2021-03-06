const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');
const repository = require('../repositories/mentions-repository');
const { validationResult } = require('express-validator');

// listar 
exports.listMentions = async (req, res) => {
    try {

        const data = await repository.listMentions();
        res.status(200).send(data);

    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Falha ao CARREGAR as menções.' })
    }
};

// criar 
exports.createMention = async (req, res) => {
    
    //verificação dos parametros estabelecidos no 'check' do mentions-route
    const {errors} = validationResult(req);
    if(errors.length > 0){
        return res.status(400).send({message: errors});
    }

    try {

        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        })

        res.status(201).send({message: 'Menção cadastrada com sucesso.'});

    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Falha ao CADASTRAR as menções.' });
    }
};

// editar
exports.updateMention = async (req, res) => {

    const {errors} = validationResult(req);
    if(errors.length > 0){
        return res.status(400).send({message: errors})
    }

    try{
        await repository.updateMention(req.params.id, req.body);
        res.status(200).send({message: 'Editado com sucesso.'})
    } catch(e){
        console.log(e);
        res.status(500).send({message: 'Erro ao editar.'})
    }
}

// deletar
exports.deleteMention = async (req, res) => {

    try{
        console.log(req);
        console.log(res);
        await repository.deleteMention(req.params.id);
        
        res.status(200).send({message: 'Passamos o mention, chefe.'});


    } catch (e){
        console.log(e);
        res.status(500).send({message: 'Erro ao deletar.'});
    }
}