# Spendee HTML to CSV
This is a sample application which can help extract your expenses via the HTML content picked up from the Spendee website.

## The Need 
I was using Spendee application for recording my expenses. I needed to export my expenses into an excel file inorder to perform some simple analytics.

I realized that the application allows us to export only the expenses of the last 365 days for free account users. That's when I wrote this simple parser to get my older expenses.

### Notes: 
1. Since this is really dependent on the web application's css structure, if Spendee makes changes to their website, it is likely that this script will need some changes.
2. This is a purely react application and it doesn't upload your data anywhere. The code necessary to extract the expenses and to format it into excel file is written in javascript and hence your data will not leave your system.

## Dependencies
1. React Bootstrap 
    1. To get the UI CSS libraries
    2. Command to install - `npm install react-bootstrap bootstrap`
    3. Tutorial - https://react-bootstrap.netlify.app/getting-started/introduction/
2. Cheerio 
    1. To parse HTML content 
    2. Command to install - `npm i cheerio` 
    3. Package - https://www.npmjs.com/package/cheerio
    4. Tutorial - https://stackoverflow.com/questions/54136046/how-to-read-and-parse-html-in-nodejs

## Useful links
* To create a downloadable csv file using javascript - https://www.javatpoint.com/javascript-create-and-download-csv-file 

## Using this application
1. Clone this repository in your machine.
2. Download and install Node, which also includes NPM (Node Package Manager) - https://nodejs.org/en/ 
3. Open your command prompt, navigate to this repository.
4. Run the command `npm start`
5. We can now access the web application in your browser by navigating to http://localhost:3000

## Disclaimer
This is purely an academic exercise. A small side project to help me understand react and a few other concepts with a working example. 

## License
Code released under the [MIT license](https://github.com/diwakargrandhi/spendee-html-to-csv/blob/main/LICENSE)
