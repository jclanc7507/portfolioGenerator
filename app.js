const fs = require('fs');
const generatePage = require('./src/page-template.js');
var inquirer = require('inquirer');

const promptUser = () => {
return inquirer.prompt([ 
{
type: 'input', 
name: 'name', 
message: 'What is your name?'
}, 
{
type: 'input', 
name: 'github', 
message: 'Enter your GitHub Username'
}, 
{
type: 'input', 
name: 'about', 
message: 'Provide some information about yourself:' 
}, ]) 
};

promptUser.then(answers => console.log(answers));

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check index.html for output.')
});
