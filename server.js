const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { syncAndSeed, Event } = db;

app.use('/public', express.static('assets'));
app.use('/dist', express.static('dist'));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));


app.get('/events', async(req, res, next) => {
    try{
        const events = await Event.findAll();
        res.send(events);
    }
    catch(ex){
        next(ex);
    }
});

app.delete('/events/:id', async(req, res, next) => {
    try{
        const event = await Event.findByPk(req.params.id);
        await event.destroy();
        res.sendStatus(204);
    }
    catch(ex){
        next(ex);
    }
});

app.post('/events', async(req,res,next) => {
    try{
        res.status(201).send( await Event.create(req.body));
    }
    catch(ex){
        next(ex);
    }
});

const init = async() => {
    try{
        await syncAndSeed();
    }
    catch(ex){
        console.log(ex);
    }
};

init();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port: ${port}`));