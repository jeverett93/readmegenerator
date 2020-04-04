
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const datafire = require('datafire');
let userName = ""

function inquireQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "GitHub username",
                name: "username"
            },
            {
                type: "password",
                message: "GitHub password",
                name: "password"
            },
            {
                type: "Input",
                message: "Project Name",
                name: "project"
            },
            {
                type: "input",
                message: "Contributors",
                name: "contributors"
            },
            {
                type: "input",
                message: "Description",
                name: "description"
            },
            {
                type: "checkbox",
                message: "Technology Used",
                choices: ["Node.Js", "Express", "JavaScript", "jQuery", "React.js", "React", "GIT", "GitHub", "MongoDB", "MySQL", "Firebase", "Handlebars", "HTML", "CSS", "Bootstrap", "Media Queries", "APIs", "Microsoft Suite", "Heroku", "Command- Line"],
                name: "technology"
            },
            {
                type: "list",
                message: "License",
                choices: ["MIT", "BSD", "ISC", "Apache", "GPL"],
                name: "license"
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
        ])
        .then(function (response) {
            userName = response.username;
            const usersInfo = `
          # ${response.project}
    
          ## Description
          ${response.description}
    
          ## Technology Stack
          ${response.technology}
    
          ## Contributors
          ${response.contributors}
    
          ## Contact
          * #### Name: ${response.name}(@${response.username})
          * #### Portfolio: ${response.portfolio}
          * #### Email: []()
          * #### LinkedIn: www.linkedin.com/in/${response.linkedin}
    
          ## License
          ${response.license}
        `
            fs.writeFile("README.md", usersInfo, function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Success!");

            });
            githubAPICall();
        });
    
}

inquireQuestions();

function githubAPICall() {
    console.log(userName);
    const queryUrl = `https://api.github.com/users/` + userName;

    axios
        .get(queryUrl)
        .then(function (res) {
            console.log(res.data);



        }).catch(function (err) {

            console.log(err);

        });

    //end function
}
