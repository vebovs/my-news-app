require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus congue laoreet eros, nec dignissim augue aliquam sit amet. Quisque non massa in dolor ultricies pharetra.' + 
                'Ut laoreet cursus urna, sed convallis ante imperdiet a. Vivamus eu aliquam justo, eu varius elit. Aenean cursus, ex vel egestas pulvinar, elit eros condimentum orci, sed porta erat nisi ac urna.' +
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed bibendum vehicula turpis in tristique. Etiam sit amet pulvinar mi.' +
                'Suspendisse semper consectetur est, et hendrerit arcu condimentum quis. Quisque accumsan felis vel sodales aliquam. Quisque fringilla rutrum arcu, in dictum ligula commodo vitae.' + 
                'Nulla tristique ultrices massa vel mollis. Ut eu sagittis lectus.'
    },
    {
        id: 2,
        title: 'Morbi congue mollis nulla in commodo',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus congue laoreet eros, nec dignissim augue aliquam sit amet. Quisque non massa in dolor ultricies pharetra.' + 
                'Ut laoreet cursus urna, sed convallis ante imperdiet a. Vivamus eu aliquam justo, eu varius elit. Aenean cursus, ex vel egestas pulvinar, elit eros condimentum orci, sed porta erat nisi ac urna.' +
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed bibendum vehicula turpis in tristique. Etiam sit amet pulvinar mi.' +
                'Suspendisse semper consectetur est, et hendrerit arcu condimentum quis. Quisque accumsan felis vel sodales aliquam. Quisque fringilla rutrum arcu, in dictum ligula commodo vitae.' + 
                'Nulla tristique ultrices massa vel mollis. Ut eu sagittis lectus.'
    },
    {
        id: 3,
        title: 'Fusce sit amet risus posuere',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus congue laoreet eros, nec dignissim augue aliquam sit amet. Quisque non massa in dolor ultricies pharetra.' + 
                'Ut laoreet cursus urna, sed convallis ante imperdiet a. Vivamus eu aliquam justo, eu varius elit. Aenean cursus, ex vel egestas pulvinar, elit eros condimentum orci, sed porta erat nisi ac urna.' +
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed bibendum vehicula turpis in tristique. Etiam sit amet pulvinar mi.' +
                'Suspendisse semper consectetur est, et hendrerit arcu condimentum quis. Quisque accumsan felis vel sodales aliquam. Quisque fringilla rutrum arcu, in dictum ligula commodo vitae.' + 
                'Nulla tristique ultrices massa vel mollis. Ut eu sagittis lectus.'
    }
];

app.get('/', (req, res) => {
    try {
        res.json(posts);
        res.status(200);
    } catch (error) {
        res.json('An internal server error has occurred');
        res.status(500);
    }
});

app.post('/post', (req, res) => {
    try {

        let id = 0;
        for(let i = 0; i < posts.length; i++) {
            if(posts[i].id > id) {
                id = posts[i].id + 1;
            }
        }

        const post = {
            id: id,
            title: req.body.title,
            text: req.body.text
        };

        posts.push(post);

        res.json(post);
        res.status(200);
    } catch (error) {
        res.json('An internal server error has occurred');
        res.status(500);
    }
});

app.patch('/update', (req, res) => {
    try {
        posts.map((e) => {
            if(e.id === req.body.id) {
                e.title = req.body.title;
                e.text = req.body.text;
            }
            return e;
            });
        res.json('success');
        res.status(200);
    } catch(error) {
        res.json('An internal server error has occurred');
        res.status(500);
    }
});

app.delete('/delete/:id', (req, res) => {
    try {
        posts = posts.filter(e => e.id !== parseInt(req.params.id));
        res.json('success');
        res.status(200);
    } catch(error) {
        res.json('An internal server error has occurred');
        res.status(500);
    }
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
    });
} 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started at port ' + port));
