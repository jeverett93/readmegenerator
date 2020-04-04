
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const datafire = require('datafire');
require('dotenv').config();
// let userName = ""

function inquireQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "GitHub username",
                name: "username"
            },
            // {
            //     type: "password",
            //     message: "GitHub password",
            //     name: "password"
            // },
            {
                type: "Input",
                message: "Project Name",
                name: "project"
            },
            {
                type: "input",
                message: "Description",
                name: "description"
            },
            {
                type: "input",
                message: "Table of Contents",
                name: "content"
            },
            {
                type: "input",
                message: "Installation",
                name: "installation"
            },
            {
                type: "checkbox",
                message: "Technology Used",
                choices: ["Node.Js", "Express", "JavaScript", "jQuery", "React.js", "React", "GIT", "GitHub", "MongoDB", "MySQL", "Firebase", "Handlebars", "HTML", "CSS", "Bootstrap", "Media Queries", "APIs", "Microsoft Suite", "Heroku", "Command- Line"],
                name: "technology"
            },
            {
                type: "input",
                message: "Usage",
                name: "usage"
            },
            {
                type: "list",
                message: "License",
                choices: ["MIT", "BSD", "ISC", "Apache", "GPL"],
                name: "license"
            },
            {
                type: "input",
                message: "Contributors",
                name: "contributors"
            },
            {
                type: "input",
                message: "What is your LinkedIn URL?",
                name: "linkedin"
            },
            {
                type: "input",
                message: "What is your portfolio URL?",
                name: "portfolio"
            },
            {
                type: "input",
                message: "Tests?",
                name: "tests"
            },
        ])
        .then(function (response) {
            let userName = response.username;

            githubAPICall(userName, response);
        });

}

inquireQuestions();

function githubAPICall(userName, response) {
    console.log(userName);
    const queryUrl = `https://api.github.com/users/` + userName;

    axios
        .get(queryUrl,
            {
                headers: { "Authorization": `token ${process.env.GH_TOKEN}` }
            })
        .then(function (res) {
            console.log(res.data);


            generateMD(res, response);
        }).catch(function (err) {

            console.log(err);

        });

    //end function
}

function generateMD(res, response) {
    const usersInfo = `
    <img src="${res.data.avatar_url}">
    
          # ${response.project}
    
          ## Description
          ${response.description}

          ## Table of Contents
          ${response.content}

          ## Installation
          ${response.installation}
    
          ## Technology Stack
          ${response.technology}

          ## Usage
          ${response.usage}
    
          ## Contributors
          ${response.contributors}
    
          ## Contact
          * #### Name: ${res.data.name}
          * #### Github [${response.username}](${res.data.html_url})
          * #### Portfolio: [link to portfolio](${response.portfolio})
          * #### Email: []()
          * #### LinkedIn: www.linkedin.com/in/${response.linkedin}
    
          ## License
          ${response.license}

          ## Tests
          ${response.tests}
        `
    fs.writeFile("README.md", usersInfo, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });
}
