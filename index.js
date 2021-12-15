require('dotenv').config();

const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./index.html', {
        root: './',
    });
});

app.get('/search', async (req, res) => {
    // Forçando 2 <= n <= 10
    if(isNaN(req.query.n)) req.query.n = 2;
    else if(req.query.n < 2) req.query.n = 2;
    else if(req.query.n > 10) req.query.n = 10;

    let err = { code: 200, message: '' };

    // Chamando o método .list() do Custom Search Engine
    const response = await customSearch.cse.list({
        auth: process.env.API_TOKEN,
        cx: process.env.SEARCH_ENGINE_ID,
        q: req.query.q, // Item a ser buscado
        num: req.query.n, // Quantidade de links a serem retornados
        lr: req.query.lr, // Idioma da busca
        hl: req.query.lr.split('_')[1], // Idioma da interface
        gl: req.query.lr.split('_')[1] // Geolocalização da busca
    }).catch(function (reason) {
        err = {
            code: reason.response.status,
            message: reason.response.statusText
        };
    }).finally();

    if(err.code != 200) {
        res.status(err.code).json(err);
    } else {
        // Pegando e formatando a data e hora atual
        const date = new Date(); 
        const now = `${date.toLocaleDateString('pt-BR').split('/').reverse().join('-')} ${date.toLocaleTimeString('pt-BR')}`;
    
        let results = {
            query: req.query.q,
            language: req.query.lr,
            date: now,
            items: [], // Array para guardas os links e títulos
        };
    
        for(let result  of response.data.items) {
            results.items.push({
                title: result.title,
                link: result.link
            });
        }

        res.json(results);
    }
});

app.post('/search', (req, res) => {
    const results = req.body;

    try {
        // Tenta salvar os resultados
        fs.writeFileSync('./public/search_results/results.json', JSON.stringify(results, null, '\t'));

        res.json({
            message: 'Resultados salvos com sucesso!'
        });
    } catch(e) {
        res.status(500).json({
            message: 'Algo deu errado ao salvar os resultados. Tente novamente mais tarde!',
            error: e.message,
        });
    }
});

app.get('/results', (req, res) => {
    try {
        // Verifica se o arquivo existe e tenta lê-lo
        const results = fs.readFileSync('./public/search_results/results.json', {
            encoding: 'utf8',
            flag: 'r'
        });

        // Se a requisição for feita por navegadores este header existirá
        if(req.headers['sec-ch-ua']) {
            res.download('./public/search_results/results.json', `search_results.json`);
        } else {
            res.json(JSON.parse(results));
        }
    } catch (e) {        
        res.status(404).json({
            exists: false,
            message: 'O arquivo não se encontra mais disponível na aplicação. Realize outra consulta para realizar o download'
        });
    }
});

// Iniciando o servidor na porta requisitada e exibindo essa resposta ao fim da inicialização
app.listen(80, () => {
    console.log('Servidor ON');
});
