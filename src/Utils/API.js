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
	const time = new Date().getTime();
	const data = {
		userId: userId,
		nfc: nfc,
		versionUI: versionUI,
		element: element,
		action: action,
		value: value,
		time: time
	};
	const request = [
		"http://localhost:5000/api/interaction",
	].join('');
	axios.post(request, data);
	
	return true
}

export async function addPostTaskLocal(userId, nfc, versionUI, responses) {
	const data = {
		userId: userId,
		nfc: nfc,
		versionUI: versionUI,
		useAgain: responses['question0'],
		confidence: responses['question1'],
		friends: responses['question2'],
		convinced: responses['question3'],
		satisfied: responses['question4'],
		information: responses['question5'],
		feature: responses['question6']
	};
	const request = [
		"http://localhost:5000/api/posttask",
	].join('');
	axios.post(request, data);
	return true
}

export async function addFinalLocal(userId, nfc,  responses) {
	let comment = "NA";
	if (responses['question1'] === "other"){
		comment = responses['question1-Comment']
	}
	console.log(responses)
	const data = {
		userId: userId,
		nfc: nfc,
		prefer: responses['question1'],
		preferComment: comment,
		why: responses['question2'],
		improve: responses['question3'],
	};
	const request = [
		"http://localhost:5000/api/final",
	].join('');
	axios.post(request, data);
	return true
}

