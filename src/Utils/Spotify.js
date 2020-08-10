
import axios from 'axios'


export async function search(query, accessToken){
	const recommendationLink = [
		"https://api.spotify.com/v1/search",
		`?authorization=${accessToken}`,
		`&q=${query}`,
		`&type=track`,
		`&offset=0`,
	].join('');
	
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.get(recommendationLink, { 'headers': { 'Authorization': AuthStr } });
	const resData = res.data;
	return resData['tracks']['items'];
}