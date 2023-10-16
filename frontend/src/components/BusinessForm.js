import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import BalanceSheetModel from './BalanceSheetModel.js'


function BusinessForm({ setTopAlert }) {
	const [submitStatus, setSubmitStatus] = useState('')
	const [show, setShow] = useState(false);
	const [fetched, setFetched] = useState(false)
	const [providerNames, setProviderNames] = useState([])
	const [name, setName] = useState('')
	const [year, setYear] = useState('')
	const [amount, setAmount] = useState('')
	const [provider, setProvider] = useState('')
	const [data, setData] = useState([])

	useEffect(() => {
		(async () => {
			try {
				let resp = await axios.get('/accounting-providers');
				setProviderNames(resp.data)
			} catch (e) {
				console.log(e)
			}
		})()
	}, [])

	const handleFetch = async (e) => {
		e.preventDefault()
		try {
			let resp = await axios.post('/balance-sheet', { name, year, amount, provider })
			setData(resp.data.data)
			setShow(true)
			setFetched(true)
		} catch (e) {
			setTopAlert(e.response.data.msg)
			console.log(e)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			let resp = await axios.post('/submit-application', { name, year, amount, provider })
			setTopAlert('')
			setSubmitStatus(resp.data.msg)
		} catch (e) {
			setTopAlert(e.response.data.msg)
			console.log(e.response.data)
		}
	}
	return (!submitStatus.length) ? (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formName">
					<Form.Label>Business Name</Form.Label>
					<Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formNameYear">
					<Form.Label>Year established</Form.Label>
					<Form.Control type="text" placeholder="Enter Year" value={year} onChange={(e) => setYear(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicAmount">
					<Form.Label>Loan Amount</Form.Label>
					<Form.Control type="number" placeholder="Enter Amount" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicProvider">
					<Form.Label>Accounting Provider</Form.Label>
					<Form.Select aria-label="Default select example" onChange={(e) => setProvider(e.target.value)}>
						<option></option>
						{
							providerNames.map((providerName, idx) => {
								return <option value={`${providerName}`} key={idx}>{providerName}</option>
							})
						}
					</Form.Select>
				</Form.Group>

				{fetched ?
					<Button variant="success" type="submit" onClick={handleSubmit}>
						Submit Application
					</Button>
					:
					<Button variant="primary" type="submit" onClick={handleFetch}>
						Fetch Balance sheet
					</Button>
				}
			</Form>
			<BalanceSheetModel show={show} setShow={setShow} data={data} />
		</>
	) : <Alert variant="success" >{submitStatus}</Alert>
}

export default BusinessForm