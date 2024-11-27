const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

server.get('/do_a_random', (req, res) => {
    res.send(`Your magical number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Mad Lib route handler with styled response
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { magicalCreature, enchantedObject, heroAction, mysteriousAdverb, legendaryLocation } = req.body;

    if (!magicalCreature || !enchantedObject || !heroAction || !mysteriousAdverb || !legendaryLocation) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Quest Incomplete</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .error { color: red; font-size: 20px; }
                    a { display: inline-block; margin-top: 20px; text-decoration: none; }
                </style>
            </head>
            <body>
                <p class="error">All fields are required! Please complete the form.</p>
                <a href="/ITC505/lab-7/index.html">Go Back</a>
            </body>
            </html>
        `);
        return;
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Your Quest</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .story { font-size: 20px; }
                a { display: inline-block; margin-top: 20px; text-decoration: none; }
            </style>
        </head>
        <body>
            <p class="story">
                In the legendary land of ${legendaryLocation}, a group of ${magicalCreature} set out with a ${enchantedObject} to ${heroAction} ${mysteriousAdverb}.
            </p>
            <a href="/ITC505/lab-7/index.html">Create Another Story</a>
        </body>
        </html>
    `);
});

const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

const port = process.argv[2] === 'local' ? 8080 : 80;

server.listen(port, () => console.log(`Server running on port ${port}`));
