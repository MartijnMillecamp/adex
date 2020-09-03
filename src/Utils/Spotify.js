
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

export async function getRecommendation(seedSong, sliderValueDict, accessToken, numberPerSeed){
	// const range = 0.1;
	const recommendationLink = [
		"https://api.spotify.com/v1/recommendations",
		`?authorization=${accessToken}`,
		`&seed_tracks=${seedSong.id}`,
		`&limit=${numberPerSeed}`,
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
	let tracks =  resData['tracks'];
	let recommendations = [];
	for (let i = 0; i < tracks.length; i++){
		let audioFeatures = await getAudioFeatures(tracks[i], accessToken)
		let seedInfo = {
			seedId: seedSong.id,
			seedTitle: seedSong.title,
			seedArtist:seedSong.artist,
			seedAlbum:seedSong.album,
			seedPreview_url: seedSong.preview_url
		};
		let recommendation = Object.assign(tracks[i], audioFeatures, seedInfo)
		recommendations = [...recommendations, recommendation]
	}
	return recommendations
}

export async function getAudioFeatures(song, accessToken){
	const idSong = song['id'];
	const request = [
		"https://api.spotify.com/v1/audio-features/",
		`${idSong}`,
	].join('');
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.get(request, { 'headers': { 'Authorization': AuthStr } });
	const resData = res.data;
	return resData
}

export async function getTopSong(accessToken) {
	console.log(accessToken)
	//todo test with 'empty' account
	const topLink = [
		"https://api.spotify.com/v1/me/top/tracks"
	].join('');
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.get(topLink, { 'headers': { 'Authorization': AuthStr } });
	const resData = res.data;
	const topSongs = resData.items;
	let added = 0;
	let index = 0;
	let topSong = null;
	while (added < 1 || index === 20){
		if (topSongs[index]['preview_url'] !== null){
			let audioFeatures = await getAudioFeatures(topSongs[index], accessToken)
			topSong = Object.assign(topSongs[index], audioFeatures)
			added += 1
		}
		index += 1;
	}
	return topSong
}

export async function getSpotifyId(accessToken) {
	const topLink = [
		"https://api.spotify.com/v1/me"
	].join('');
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.get(topLink, { 'headers': { 'Authorization': AuthStr } })
	return res.data.id
}

export async function addPlaylist(name, spotifyId, accessToken) {
	const data = {
		name: name,
		public: false
	};
	const request = [
		"https://api.spotify.com/v1/users/",
		`${spotifyId}`,
		`/playlists`,
	].join('');
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.post(request, data, { 'headers': { 'Authorization': AuthStr } });
	return res.data.id
	
}

export async function addSongsToPlaylist(playlistId, tracks, accessToken) {
	const data = {
		uris: tracks,
	};
	const request = [
		"https://api.spotify.com/v1/playlists/",
		`${playlistId}`,
		`/tracks`,
	].join('');
	const AuthStr = 'Bearer ' + accessToken;
	const res = await axios.post(request, data, { 'headers': { 'Authorization': AuthStr } });
	return res
}