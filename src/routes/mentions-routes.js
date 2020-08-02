const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const mentionsController = require('../controllers/mentions-controller')

router.get('/', mentionsController.listMentions);
router.post('/', [
    check('friend').isLength({ min: 6 }).withMessage("Meu querido, o nome precisa ter, no mínimo, 6 caracteres"),
    check('mention').isLength({ min: 20, max: 280 }).withMessage("Essa frase precisa estar entre 20 e 280 caracteres")
], mentionsController.createMention);

module.exports = router;