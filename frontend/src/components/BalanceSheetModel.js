import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

function BalanceSheetModel({ show, setShow, data }) {
	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Preview</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ maxHeight: '300px', overflowY: 'scroll' }}>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Year</th>
							<th>Month</th>
							<th>Assets Value</th>
							<th>Profit/Loss</th>
						</tr>
					</thead>
					<tbody>
						{
							data && data.map(({ year, month, assetsValue, profitOrLoss }, idx) => {
								return <tr key={idx}>
									<td>{year}</td>
									<td>{month}</td>
									<td>{assetsValue}</td>
									<td>{profitOrLoss}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	)
}

export default BalanceSheetModel