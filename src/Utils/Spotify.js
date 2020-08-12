
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

export async function getRecommendation(seedSong, sliderValueDict, accessToken){
	console.log(sliderValueDict)
	const range = 0.1;
	const recommendationLink = [
		"https://api.spotify.com/v1/recommendations",
		`?authorization=${accessToken}`,
		`&seed_tracks=${seedSong.id}`,
		// `&min_danceability=${sliderValueDict['danceability'] - range}`,
		// `&max_danceability=${sliderValueDict['danceability'] + range}`,
		// `&min_energy=${sliderValueDict['energy'] - range}`,
		// `&max_energy=${sliderValueDict['energy'] + range}`,
		// `&min_valence=${sliderValueDict['happiness'] - range}`,
		// `&max_valence=${sliderValueDict['happiness'] + range}`,
		// `&min_popularity=${sliderValueDict['popularity'] - (2*range*10)}`,
		// `&max_popularity=${sliderValueDict['popularity'] + (2*range*10)}`,
		`&target_danceability=${sliderValueDict['danceability']}`,
		`&target_energy=${sliderValueDict['energy']}`,
		`&target_valence=${sliderValueDict['happiness']}`,
		`&target_popularity=${sliderValueDict['popularity']}`,
	
	].join('');
	
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.get(recommendationLink, { 'headers': { 'Authorization': AuthStr } })
	const resData = res.data;
	return resData['tracks'];
	
}