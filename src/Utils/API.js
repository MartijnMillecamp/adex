import axios from 'axios'

export async function addUser(userId, openness, gender, age, attention){
	const data = {
		userId: userId,
		openness: openness,
		gender: gender,
		age: age,
		attention: attention,
	};
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3028/api/user",
	].join('');
	// const request = [
	// 	"http://localhost:5000/api/user",
	// ].join('');
	const res = await axios.post(request, data);
	return res
}

export async function addInteraction(userId, openness, versionUI, element, action, value){
	const time = new Date().getTime();
	const data = {
		userId: userId,
		openness: openness,
		versionUI: versionUI,
		element: element,
		action: action,
		value: value,
		time: time
	};
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3028/api/interaction",
	].join('');
	// const request = [
	// 	"http://localhost:5000/api/interaction",
	// ].join('');
	const res = await axios.post(request, data);
	return true
}

export async function addPostTask(userId, openness, versionUI, responses) {
	const data = {
		userId: userId,
		openness: openness,
		versionUI: versionUI,
		useAgain: responses['question0'],
		confidence: responses['question1'],
		friends: responses['question2'],
		convinced: responses['question3'],
		satisfied: responses['question4'],
		information: responses['question5'],
		feature: responses['question6'],
		attention: responses['question7']
	};
	// const request = [
	// 	"http://localhost:5000/api/posttask",
	// ].join('');
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3028/api/posttask",
	].join('');
	axios.post(request, data);
	return true
}

export async function addFinal(userId, openness, responses) {
	console.log(responses['question2'])
	const data = {
		userId: userId,
		openness: openness,
		preferUI: responses['question1'],
		preferExplanation: responses['question2'],
		why: responses['question3'],
		technical: responses['question4'],
		other: responses['question5'],
	};
	// const request = [
	// 	"http://localhost:5000/api/final",
	// ].join('');
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3028/api/final",
	].join('');
	axios.post(request, data);
	return true
}

