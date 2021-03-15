import React from "react"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"

class HTMLForm extends React.Component {
	render() {
		let submitButtonDisabled = false;
		if(this.props.formProcessing === "true") {
			submitButtonDisabled = true;
		}
		return (
			<div>
				<Form onSubmit={this.props.handleSubmit}>
					<Form.Group as={Row}>
						<Col>
							<Form.Control as="textarea" rows={10} placeholder="Please put your spendee HTML content here." value={this.props.htmlContent} onChange={this.props.handleTextBoxChange} /> 
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col>
							<Button className="float-right" type="submit" disabled={submitButtonDisabled}>Submit</Button>
						</Col>
						<Col>
							<Button className="float-left" variant="secondary" onClick={this.props.handleClearButtonClick}>Clear</Button>
						</Col>
					</Form.Group>
					{this.props.formProcessing === "true" && 
						<Form.Group as={Row}>
							<Col>
								<Spinner animation="grow" />
							</Col>
						</Form.Group>
					}
				</Form>
			</div>
		)
	}
}

export default HTMLForm