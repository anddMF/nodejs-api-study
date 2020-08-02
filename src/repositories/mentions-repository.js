const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

exports.listMentions = async () => {
    const res = await Mentions.find({}, 'friend mention -_id');
    return res;
}

exports.createMention = async data =>{
    const model = new  Mentions(data);
    await model.save();
}