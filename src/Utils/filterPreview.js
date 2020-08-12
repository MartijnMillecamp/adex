export function filterNoPreview(recommendations){
	const newList = [];
	const length = recommendations.length;
	for (let i = 0; i < length; i++){
		let rec = recommendations[i]
		if (rec.preview_url !== null){
			newList.push(rec)
		}
	}
	return newList
}

export function filterPlaylist(recommendations, playlist){
	let toKeep = recommendations;
	for (let i=0; i< playlist.length; i++){
		let playlistSong = playlist[i]
		let temp = toKeep.filter(e => (e.id !== playlistSong.id ));
		toKeep = temp
	}
	return toKeep
}