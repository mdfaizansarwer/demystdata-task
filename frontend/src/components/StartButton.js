import Button from 'react-bootstrap/Button'
import axios from 'axios'

function StartButton({ setStart }) {
	
	const handleClick = async (e) => {
		e.target.disable = true
		try {
			await axios.get('/start-application')
			setStart(true)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<Button variant="primary" type="submit" onClick={handleClick}>
			Start Application
		</Button>
	)
}

export default StartButton