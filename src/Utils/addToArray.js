export function addToArray(array, element) {
	if (array.indexOf(element) === -1){
		const newArray = array.push(element)
		return array
		
	}
	else{
		return array
	}

}