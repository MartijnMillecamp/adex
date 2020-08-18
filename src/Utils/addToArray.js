export function addToArray(array, element) {
	if (array.indexOf(element) === -1){
		const newArray = array.push(element)
		return newArray
		
	}
	else{
		return array
	}

}

export function addToArrayObjects(array, object) {
	let add = true;
	const idNew = object['id'];
	for (let i=0; i < array.length ; i++){
		let id = array[i]['id']
		if (id === idNew){
			add = false
		}
	}
	if (add){
		const newArray = [...array, object];
		return newArray
	}
	else{
		return array
	}
}