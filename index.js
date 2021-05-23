// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project? (Required)',
      validate: titleInput => {
        return (titleInput ? true : console.log('Please enter your project title!'));
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        return (descriptionInput ? true : console.log('Please enter a project description!'));
      }
    },
    {
      type: 'confirm',
      name: 'confirmTable',
      message: 'Would you like to add a Table of Contents?',
      default: true
    },
    {
      type: 'checkbox',
      name: 'table',
      message: 'Which table of contents would you like to add? (Check all that apply)',
      choices: ['[Installation](#installation)', '[Usage](#usage)', '[Credits](#credits)', '[License](#license)'],
      when: ({ confirmTable }) => confirmTable
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What are the steps required to install your project? (Required)',
      validate: installationInput => {
        return (installationInput ? true : console.log('Please enter a project installation!'));
      }
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples for use? (Required)',
      validate: usageInput => {
        return (usageInput ? true : console.log('Please enter a project usage!'));
      }
    },
    {
      type: 'input',
      name: 'credits',
      message: 'List any collaborators (Required)',
      validate: creditInput => {
        return (creditInput ? true : console.log('Please enter collaborators!'));
      }
    },
    {
      type: 'input',
      name: 'license',
      message: 'List licenses (Required)',
      validate: licenseInput => {
        return (licenseInput ? true : console.log('Please enter any licenses!'));
      }
    },
    {
      type: 'confirm',
      name: 'confirmBadges',
      message: 'Would you like to add badges?',
      default: true
    },
    {
      type: 'input',
      name: 'badges',
      message: 'add badges',
      when: ({ confirmBadges }) => confirmBadges
    },
    {
      type: 'confirm',
      name: 'confirmFeatures',
      message: 'Would you like to add features?',
      default: true
    },
    {
      type: 'input',
      name: 'features',
      message: 'add features',
      when: ({ confirmFeatures }) => confirmFeatures
    },
    {
      type: 'confirm',
      name: 'confirmContributes',
      message: 'Would you like to add other contributers?',
      default: true
    },
    {
      type: 'input',
      name: 'contributes',
      message: 'other developers than contribute',
      when: ({ confirmContributes }) => confirmContributes
    },
    {
      type: 'confirm',
      name: 'confirmTests',
      message: 'Would you like to write tests?',
      default: true
    },
    {
      type: 'input',
      name: 'tests',
      message: 'write tests for your application',
      when: ({ confirmTests }) => confirmTests
    },
  ]);
};

// TODO: Create a function to write README file
function writeToFile(readmeMD) {
  fs.writeFile('./README.md', readmeMD, err => {
    if (err) throw new Error(err);

    console.log('Page created! Check out README.md in this directory to see it!');
  });
};

// TODO: Create a function to initialize app
function init() {
  questions()
  .then (answers => {
    return generateMarkdown(answers)
  })
  .then(readmeMD => {
    return writeToFile(readmeMD)
  })
}

// Function call to initialize app
init();
