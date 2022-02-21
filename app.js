const profileDataArgs = process.argv.slice(2, process.argv.length);
const [name, github] = profileDataArgs; 

const fs = require('fs');

const generatePage = (userName, github) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${name}</h1>
        <h2><a href="https://github.com/${github}">Github Page</a></h2>
    </body>
    </html>
    `;
};

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check index.html for output.')
});