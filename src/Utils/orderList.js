

export function orderList(recommendations, sliderValuesDict){
	//add fit to recommendations
	for (let i = 0; i < recommendations.length; i++){
		recommendations[i]['fit'] = calculateFit(recommendations[i], sliderValuesDict)
	}
	recommendations.sort(function (a, b) {
			return a.fit - b.fit
	})
	return recommendations
	
}

function calculateFit(song, sliderValuesDict){
	const diffDanceability = Math.abs(song['danceability'] - sliderValuesDict['danceability']) * 100;
	const diffEnergy = Math.abs(song['energy'] - sliderValuesDict['energy']) * 100;
	const diffHappiness = Math.abs(song['valence'] - sliderValuesDict['happiness']) * 100;
	const diffPopularity = Math.abs(song['popularity'] - sliderValuesDict['popularity']);
	const diff = diffDanceability + diffEnergy + diffHappiness + diffPopularity
	return diff
}

