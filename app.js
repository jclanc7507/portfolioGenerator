const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([ 
        {
            type: 'input', 
            name: 'name', 
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name.');
                    return false;
                }
            }
        }, 
        {  
            type: 'input', 
            name: 'github', 
            message: 'What is your GitHub username?',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter a GitHub username.');
                    return false;
                }
            }
        }, 
        {
            type: 'confirm', 
            name: 'confirmAbout', 
            message: 'Would you like to enter some information about yourself for an "About" section?', 
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about youself:',
            when: ({ confirmAbout }) => confirmAbout
        } 
    ]);
};

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
`);

    //If there's no 'projects' array property, then create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if(projectName) {
                    return true;
                } else {
                    console.log('Please enter a project name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project.',
            validate: projectDescription => {
                if(projectDescription) {
                    return true;
                } else {
                    console.log('Please provide a description for your project.');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project.',
            validate: linkInput => {
                if(linkInput) {
                    return true;
                } else {
                    console.log('Please enter a GitHub link for your project.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmsAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
    const pageHTML = generatePage(portfolioData);
        
    fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);

        console.log('Portfolio complete! Check index.html for output.');
    });
});