
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
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
            // {
            //     type: "input",
            //     message: "Table of Contents",
            //     name: "content"
            // },
            {
                type: "input",
                message: "Installation",
                name: "installation"
            },
            {
                type: "checkbox",
                message: "Technology Used",
                choices: ["Node.Js", " Express", " JavaScript", " jQuery", " React.js", " React", " GIT", " GitHub", " MongoDB", " MySQL", " Firebase", " Handlebars", " HTML", " CSS", " Bootstrap", " Media Queries", " APIs", " Microsoft Suite", " Heroku", " Command- Line"],
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
<img src="${res.data.avatar_url}" style= "width: 200px; height: 200px">

# ${response.project}
    
## <h2 id="#description">Description</h2>
${response.description}

## Table of Contents   
<li><a href="#description">Description</a></li>  
<li><a href="#installation">Installation</a></li> 
<li><a href="#tech">Technology Stack</a></li> 
<li><a href="#usage">Usage</a></li>
<li><a href="#contributors">Contributors</a></li> 
<li><a href="#contact">Contact</a></li> 
<li><a href="#license">License</a></li> 
<li><a href="#tests">Tests</a></li> 

## <h2 id="installation">Installation</h2>
${response.installation}
    
## <h2 id="tech">Technology Stack</h2>
${response.technology}

## <h2 id="usage">Usage</h2>
${response.usage}
    
## <h2 id="contributors">Contributors</h2>
${response.contributors}
    
## <h2 id="contact">Contact</h2>
* #### Name: ${res.data.name}
* #### Github ${res.data.html_url}
* #### Portfolio: ${response.portfolio}
* #### Email: ${res.data.email}
* #### LinkedIn: ${response.linkedin}
    
## <h2 id="license">License</h2>
${response.license}

## <h2 id="tests">Tests</h2>
${response.tests}
`
    fs.writeFile("README.md", usersInfo, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });
}
