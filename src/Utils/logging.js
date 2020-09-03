

export async function postInteraction(element, action){
	const time = Date.now();
	const interaction = {
		element: element,
		action: action,
		time: time
	};
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3012/api/interaction"
	].join('');
	const res = await axios.post(request, interaction);
	console.log(res)
	
	
}