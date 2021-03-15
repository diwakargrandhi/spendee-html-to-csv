import React from "react"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"

class ResultTable extends React.Component {
	render() {
		return(
			<Container>
				<Row>
					<Col>
						<h3 className="text-left">Your transactions</h3>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col>
						<Button className="float-left btn-success" onClick={this.props.handleDownloadButtonClick}>Download (.csv)</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table responsive="xl">
							<thead>
								<tr>
									<th>Date</th>
									<th>Category</th>
									<th>Comment</th>
									<th>Label</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
							{this.props.items.map(item => {
								return (
									<tr key={item.id}>
										<td>
											{item.date}
										</td>
										<td>
											{item.category}
										</td>
										<td>
											{item.comment}
										</td>
										<td>
											{item.labelName}
										</td>
										<td>
											{item.amount}
										</td>
									</tr>
								)
							})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		) 
	}
}

export default ResultTable