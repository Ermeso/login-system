const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const Register = require('../models/register');

// config bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('signup')
});

router.get('/signup', (req, res) => {
    res.redirect('/');
});

router.post('/signup', (req, res) => {

    let erros = []

    Register.findAll({
        where: {
            email: req.body.email
        }
    }).then((dados) => {
        if(dados.length >= 1) {
            erros.push({texto: 'Email já cadastrado!'})
            res.render('signup', {erros: erros})
        } else {
            Register.create({
                nome: req.body.username,
                email: req.body.email,
                senha: req.body.password
            }).then(() => {
                res.redirect('/signin');
            }).catch((erro) => {
                console.log('Erro ao executar a query');
                console.log(`Erro: ${erro}`);
                res.render('signup');
            });
        }
    }).catch((erro) => {
        console.log('Erro ao executar a query!');
        console.log(erro);
    });
});

router.get('/signin', (req,res) => {
    res.render('signin');
});

router.post('/signin', (req, res) => {
    let erros = [];

    Register.findAll({
        where: {
            nome: req.body.username,
            senha: req.body.password
        }
    }).then((dados) => {
        console.log(dados.length);
        if(dados.length == 0) {
            erros.push({texto: 'Nome ou senha invalidos!'});
            console.log('Não foi possivel autenticar')
            res.render('signin', {erros: erros});
        } else {
            console.log('Autenticação efetuada com sucesso!');
            req.session.login = req.body.username;
            res.redirect('/panel')
        }
    }).catch((erro) => {
        console.log(erro);
    });
});

router.get('/panel', (req, res) => {
    if(req.session.login) {
        res.render('panel', {nome: req.session.login});
    } else {
        res.redirect('/signin')
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/signin')
});

module.exports = router;