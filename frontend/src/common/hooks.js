import { useState } from 'react'
import { toLower } from 'lodash'


export const useFormInput = (data = {}) => {
	const [values, setState] = useState(data)

	const setInput = ({ name, value, type }) => {
		let updatedValues = {[name]: value}
		if (toLower(type) === 'number') updatedValues = {[name]: parseInt(value, 10)}
		setState(prevState => ({...prevState, ...updatedValues}))
	}

	// NOTE: To clear the form after submission
	const resetValues = defaults => setState(defaults)

	return [values, setInput, resetValues]
}
