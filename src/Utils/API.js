import axios from 'axios'


export async function addUser(userId, nfc, gender, age){
	const data = {
		userId: userId,
		nfc: nfc,
		gender: gender,
		age: age,
	};
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3008/api/user",
	].join('');
	          axios.post(request, data);
	return true
}

export async function addUserLocal(userId, nfc, gender, age){
	const data = {
		userId: userId,
		nfc: nfc,
		gender: gender,
		age: age,
	};
	const request = [
		"http://localhost:5000/api/user",
	].join('');
	const res = await axios.post(request, data);
	return res
}

export async function addInteractionLocal(userId, nfc, versionUI, element, action, value){
	const data = {
		userId: userId,
		nfc: nfc,
		versionUI: versionUI,
		element: element,
		action: action,
		value: value
	};
	const request = [
		"http://localhost:5000/api/interaction",
	].join('');
	axios.post(request, data);
	return true
}

