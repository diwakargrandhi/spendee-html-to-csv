import React from "react"

import './App.css'

import HTMLForm from './HTMLForm.js'
import ResultTable from "./ResultTable.js"

import cheerio from "cheerio"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Jumbotron from "react-bootstrap/Jumbotron"
import Row from "react-bootstrap/Row"

import {escapeSpecialCharacters} from "./StringUtils.js"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
				htmlContent: "",
				expensesJSON: [],
				resultTableDisplay: "false", 
				formProcessing: "false" 
		}
		this.handleTextBoxChange = this.handleTextBoxChange.bind(this)
		this.handleClearButtonClick = this.handleClearButtonClick.bind(this) 
		this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this) 
		this.handleSubmit = this.handleSubmit.bind(this) 
	}
	handleTextBoxChange(event) {
		event.preventDefault()
		this.setState((prevState) => {
			return {
				htmlContent: event.target.value,
				expensesJSON: prevState.expensesJSON, 
				resultTableDisplay: prevState.resultTableDisplay, 
				formProcessing: prevState.formProcessing
			}
		})
	}
	handleClearButtonClick(event) {
		event.preventDefault()
		this.setState((prevState) => {
			return {
				htmlContent: "",
				expensesJSON: [],
				resultTableDisplay: "false",  
				formProcessing: "false" 
			}
		})
	}
	handleDownloadButtonClick(event) {
		event.preventDefault()
		let csvContent = "Date,Category,Comment,Label,Amount\n"  
		this.state.expensesJSON.forEach(function(item){
			csvContent = csvContent + escapeSpecialCharacters(item.date) + "," 
			csvContent = csvContent + escapeSpecialCharacters(item.category) + "," 
			csvContent = csvContent + escapeSpecialCharacters(item.comment) + "," 
			csvContent = csvContent + escapeSpecialCharacters(item.labelName) + "," 
			csvContent = csvContent + escapeSpecialCharacters(item.amount) + "," 
			csvContent = csvContent + "\n"
		})
		// alert("Download button clicked! and text is " + csvContent)
		let hiddenElement = document.createElement("a")
		hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
		hiddenElement.target = "_blank"
		hiddenElement.download = "Spendee_Expenses.csv" // Name of the downloaded CSV file
		hiddenElement.click()
	}
	handleSubmit(event) {
		event.preventDefault()

		const currentHTMLContent = this.state.htmlContent
		const $ = cheerio.load(currentHTMLContent)
		
		this.setState((prevState) => {
			return {
				htmlContent: prevState.htmlContent,
				expensesJSON: prevState.expensesJSON,
				resultTableDisplay: prevState.resultTableDisplay,  
				formProcessing: "true" 
			}
		})

		let expensesFromContentJSON = []
		let counter = 0  
		$('div._289Q').each(function() {
			const currentDate = $('span._1kYs', this).html()
			// alert("The date found is " + currentDate)
			$(this).nextUntil('div._87sV').each(function() {
				const category = $('span.KKUC', this).html() 
				const comment = $('span._1SwE', this).first().contents().filter(function() {
					return this.type === 'text';
				}).text()  // Needed to extract text from the immediate element and not all the adjacent spans
				const labelName = $('span._2SfA', this).html() 
				const amountListedAsExpense = $('div._3Tj5._210-', this).html() 
				const amountListedAsInput = $('div._3Tj5.oNz8', this).html() 
				
				let amount = amountListedAsExpense
				if(!amountListedAsExpense) {
					amount = amountListedAsInput
				}

				if(comment) {
					// alert("Text here is : " + category + comment + labelName + amount)
					counter = counter + 1 
					let eachExpense = {
							"id": counter,
							"date": currentDate,
							"category": category,
							"comment": comment,
							"labelName": labelName,
							"amount": amount
					}
					expensesFromContentJSON.push(eachExpense)
				}
			})
		})
		
		if(expensesFromContentJSON.length) {
			this.setState((prevState) => {
				return {
					htmlContent: prevState.htmlContent,
					expensesJSON: expensesFromContentJSON,
					resultTableDisplay: "true",  
					formProcessing: "false" 
				}
			})
		} else {
			this.setState((prevState) => {
				return {
					htmlContent: prevState.htmlContent,
					expensesJSON: [],
					resultTableDisplay: "false",  
					formProcessing: "false" 
				}
			})
		}
	}
	render() {
		return (
			<div className="App">
				<Jumbotron fluid>
					<Container>
						<Row>
							<Col>
								<h1>A HTML Parser for Spendee</h1>
							</Col>
						</Row>
						<Row>
							<Col>
								<p>
									This is a sample application which can help extract your expenses via the HTML content picked up from the Spendee website. 
								</p>
							</Col>
						</Row>
						<Row className="mb-5"></Row>
						<Row>
							<Col className="text-left">
								<h5>The Need: </h5>
								<p className="text-justify">I was using Spendee application for recording my expenses. I needed to export my expenses into an excel file inorder to perform some simple analytics.</p>
								<p>I realized that the application allows us to export only the expenses of the <b>last 365 days</b> for free account users. That's when I wrote this simple parser to get my older expenses.</p>
								<br/>
								<h5>Notes: </h5>
								<ul>
									<li>Since this is really dependent on the web application's css structure, if Spendee makes changes to their website, it is likely that this script will need some changes.</li>
									<li>This is a purely react application and it doesn't upload your data anywhere. The code necessary to extract the expenses and to format it into excel file is written in javascript and hence your data will not leave your system.</li>
								</ul>
							</Col>
							<Col className="text-left">
								<h5>Usage: </h5>
								<ul>
									<li>Navigate to <a href="https://app.spendee.com/auth/login" target="_blank" rel="noreferrer">Spendee's website</a></li>
									<li>Login into your account</li>
									<li>Select your wallet</li>
									<li>Select your period of expenses</li>
									<li>
										If you are using Google Chrome,
										<ul>
											<li>Right click on the page and open the developer console by clicking on the Inspect option</li>
											<li>Navigate to the Elements tab</li>
											<li>Right click on the "body" tag and select "Copy" followed by "Copy Element"</li>
										</ul>
									</li>
									<li>
										If you are using Firefox,
										<ul>
											<li>Right click on the page and open the developer console by clicking on the "Inspect Element" option</li>
											<li>Navigate to the Inspector tab</li>
											<li>Right click on the "body" tag and select "Copy" followed by "Inner HTML"</li>
										</ul>
									</li>
									<li>Take the cpoied text and paste it in the text box below.</li>
									<li>Upon clicking submit, the expenses are shown below. You will also see the option to download them in the form of a .csv (excel) file.</li>
								</ul>
							</Col>
						</Row>
					</Container>
				</Jumbotron>
				<Container>
					<Row>
						<Col sm={2}></Col>
						<Col sm={8}>
							<HTMLForm 
								handleTextBoxChange={this.handleTextBoxChange} 
								handleClearButtonClick={this.handleClearButtonClick} 
								handleSubmit={this.handleSubmit} 
								htmlContent={this.state.htmlContent} 
								formProcessing={this.state.formProcessing} 
								/>
						</Col>
						<Col sm={2}></Col>
					</Row>
				</Container>
				<div className="help-block"></div>
				{ this.state.resultTableDisplay === "true" && 
					<ResultTable items={this.state.expensesJSON} handleDownloadButtonClick={this.handleDownloadButtonClick}/>					
				}
			</div>
		);
	}
}

export default App;
