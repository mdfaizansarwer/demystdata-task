import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import BusinessForm from './components/BusinessForm'
import StartButton from './components/StartButton'

function App() {
	const [start, setStart] = useState(false)
	const [topAlert, setTopAlert] = useState('')

	return (
		<div className="App">
			{topAlert && <Alert variant="danger" onClose={() => setTopAlert('')} dismissible>
				{topAlert}
			</Alert>}
			{
				start ? <BusinessForm setTopAlert={setTopAlert} /> : <StartButton setStart={setStart} />
			}
		</div >
	);
}

export default App;