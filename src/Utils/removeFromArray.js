export function removeFromArrayOfObjects(array, key, object){
	const newArray = array.filter(function (element) {
		return element[key] !== object[key]
	});
	return newArray
}