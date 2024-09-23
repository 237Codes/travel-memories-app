import express from 'express';

const app = express();

//create  a memories route to listen for the GET method
app.get('/memories', (req, res) => {
    res.send('Server is ready');
});


app.listen(3000, () => { 
    console.log("Server started on  http://localhost:3000");
});


//