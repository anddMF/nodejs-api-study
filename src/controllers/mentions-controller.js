const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

// listar 
exports.listMentions = async (req, res) => {
    try {
        const data = await Mentions.find({});
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao CARREGAR as menções.' })
    }
};

// criar 
exports.createMention = async (req, res) => {
    try {
        const mention = new Mentions({
            friend:req.body.friend,
            mention: req.body.mention
        });
        console.log(mention);

        await mention.save();

        res.status(201).send({message: 'Menção cadastrada com sucesso.'});
    } catch (e) {
        res.status(500).send({ message: 'Falha ao CADASTRAR as menções.' });
    }
}