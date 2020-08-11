import React, {Component} from 'react'
import Recommendations from '../Components/Recommendations'
import 'fontsource-roboto';
import {addToDict} from '../Utils/addToDict';
import {removeFromArrayOfObjects} from '../Utils/removeFromArray';
import {addToArrayObjects} from '../Utils/addToArray';

import {search} from '../Utils/Spotify';

import Playlist from "../Components/Playlist";
import classnames from 'classnames'
import '../Styling/global.css'
import styles from '../Styling/Home.module.css';

import Sliders from "../Components/Sliders";
import axios from 'axios'
import SearchField from "../Components/SearchField"
import SearchResults from "../Components/SearchResults"



//import images
import danceability from '../Images/danceability.svg'
import energy from '../Images/energy.svg'
import happiness from '../Images/happiness.svg'
import popularity from '../Images/popularity.svg'


export default class Home extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			recommendations: [],
			playing: null,
			audioList: {},
			playlist: [],
			sources: [],
			sliderValueDict: {
				danceability: 0.50,
				energy: 0.50,
				happiness: 0.50,
				popularity: 0.50
			},
			search : false,
			searchResults: [],
		};
		this.updateRecommendations = this.updateRecommendations.bind(this);
		this.handlerPlaySong = this.handlerPlaySong.bind(this);
		this.handlerPauseSong = this.handlerPauseSong.bind(this);
		this.handlerAddToPlaylist = this.handlerAddToPlaylist.bind(this);
		this.handlerDeleteFromPlaylist = this.handlerDeleteFromPlaylist.bind(this);
		this.handlerAddSource = this.handlerAddSource.bind(this);
		this.handlerRemoveSource = this.handlerRemoveSource.bind(this);
		this.handlerSliderChange = this.handlerSliderChange.bind(this);
		this.handlerSearchClick = this.handlerSearchClick.bind(this);
		this.handlerSearch = this.handlerSearch.bind(this);
		this.handlerStopSearch = this.handlerStopSearch.bind(this);
		
	}
	
	componentDidMount(){
		this.getRecommendations()
	}
	
	handlerSliderChange(value, slider){
		const values = this.state.sliderValueDict;
		values[slider] = value / 100;
		this.setState({sliderValueDict: values})
		this.getRecommendations()
	}
	
	handlerAddSource(song){
		this.setState({
			sources: [...this.state.sources, song]
		});
		this.getRecommendations()
	}
	
	handlerRemoveSource(song){
		const sources = removeFromArrayOfObjects(this.state.sources, 'id', song);
		this.setState({
			sources: sources
		});
		this.getRecommendations()
	}
	
	updateRecommendations(recommendations) {
		this.setState({
			recommendations: recommendations
		});
	}
	
	handlerAddToPlaylist(song){
		const recommendations = removeFromArrayOfObjects(this.state.recommendations, 'id', song);
		//use utils function to check already in list
		const newPlaylist = addToArrayObjects(this.state.playlist, song);
		console.log(newPlaylist)
		this.setState({
			playlist: newPlaylist,
			recommendations: recommendations,
		})
		//stop playing if added to playlist
		if (this.state.playing === song.id){
			this.stopPlayingSong()
			this.setState({
				playing: null
			})
		}
		this.handlerAddSource(song)
	}
	
	handlerDeleteFromPlaylist(song){
		const playlist = removeFromArrayOfObjects(this.state.playlist, 'id', song);
		this.setState({
			playlist: playlist
		});
		//stop playing if removed
		if (this.state.playing === song.id){
			this.stopPlayingSong()
			this.setState({
				playing: null
			})
		}
	}
	
	handlerPlaySong(id, audio){
		this.stopPlayingSong();
		this.setState({
			playing: id
		});
		const newAudioList = addToDict(this.state.audioList, id, audio);
		this.setState({
			audioList: newAudioList
		})
	}
	
	stopPlayingSong(){
		if (this.state.playing !== null){
			const playingAudio = this.state.audioList[this.state.playing];
			playingAudio.pause()
		}
	}
	
	handlerPauseSong(id, preview){
		this.setState({
			playing: null
		});
	}
	
	handlerSearchClick(){
		this.setState({
			search: true
		})
	}
	
	async handlerSearch(query){
		const accessToken = this.props.tokenObject['access_token'];
		const searchResults = await search(query, accessToken);
		this.setState({
			searchResults : searchResults
		})
	}
	
	handlerStopSearch(){
		this.setState({
			search: false,
			searchResults: [],
		});
	}

	
	
	async getRecommendations() {
		//TODO only update recommendations creating rec dict?
		//TODO decide how to show all recommendations (tabs, list, ...)
		//TODO decide if recommendations of different songs are mixed or not
		function filterNoPreview(recommendations){
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
		
		//stop audio from playing when update
		this.stopPlayingSong()
		this.setState({
			playing: null
		});
		
		
		const seeds = this.state.sources;
		let recommendations = [];
		for (let i=0; i < seeds.length; i++){
			const recommendationsSeed = await this.getRecommendation(seeds[i]);
			recommendations.push(recommendationsSeed)
		}
		const recommendationsFlat = recommendations.flat(1)
		const recFiltered = filterNoPreview(recommendationsFlat);
		this.updateRecommendations(recFiltered)
	}
	
	async getRecommendation(seedSong){
		const accessToken = this.props.tokenObject['access_token'];
		const recommendationLink = [
			"https://api.spotify.com/v1/recommendations",
			`?authorization=${accessToken}`,
			`&seed_tracks=${seedSong.id}`,
			`&min_danceability=${this.state.sliderValueDict['danceability'] - 0.05}`,
			`&max_danceability=${this.state.sliderValueDict['danceability'] + 0.05}`,
			// `&min_energy=${this.state.sliderValueDict['energy'] - 0.05}`,
			// `&max_energy=${this.state.sliderValueDict['energy'] + 0.05}`,
			// `&min_valence=${this.state.sliderValueDict['happiness'] - 0.05}`,
			// `&max_valence=${this.state.sliderValueDict['happiness'] + 0.05}`,
			// `&min_popularity=${this.state.sliderValueDict['popularity'] - 0.05}`,
			// `&max_popularity=${this.state.sliderValueDict['popularity'] + 0.05}`,
		].join('');
		
		const AuthStr = 'Bearer ' + accessToken;
		const res = await axios.get(recommendationLink, { 'headers': { 'Authorization': AuthStr } })
		const resData = res.data;
		return resData['tracks'];
		
	}
	
	render() {
		const colorDict ={
			'danceability': '#9CE09F',
			'energy': '#E25151',
			'happiness': '#EDCD7C',
			'popularity': '#7CD2ED'
			
		};
		const iconDict ={
			'danceability': danceability,
			'energy': energy,
			'happiness': happiness,
			'popularity': popularity
			
		};
		const styleContainerHome = classnames('container-columns');
		const styleContainerCol2 = classnames('container-rows', styles.column2);
		return (
			<div className={styleContainerHome}>
			
				<Playlist
					handlerPlaySong = {this.handlerPlaySong}
					handlerPauseSong = {this.handlerPauseSong}
					playlist = {this.state.playlist}
					tokenObject = {this.props.tokenObject}
					playing = {this.state.playing}
					handlerDeleteFromPlaylist = {this.handlerDeleteFromPlaylist}
					handlerAddToPlaylist = {this.handlerAddToPlaylist}
					handlerAddSource = {this.handlerAddSource}
					handlerRemoveSource = {this.handlerRemoveSource}
					
				/>
				<div
					className = {styleContainerCol2}
				>
					<SearchField
						handlerSearchClick = {this.handlerSearchClick}
						active = {this.state.search}
						handlerSearch = {this.handlerSearch}
					/>
					{this.state.search ?
						<SearchResults
							handlerPlaySong = {this.handlerPlaySong}
							handlerPauseSong = {this.handlerPauseSong}
							playing = {this.state.playing}
							handlerAddToPlaylist = {this.handlerAddToPlaylist}
							results={this.state.searchResults}
							handlerStopSearch={this.handlerStopSearch}
						/>
						:
						<Sliders
							colorDict={colorDict}
							iconDict={iconDict}
							handlerSliderChange={this.handlerSliderChange}
						/>
					}
				</div>
				
				
				<Recommendations
					handlerPlaySong = {this.handlerPlaySong}
					handlerPauseSong = {this.handlerPauseSong}
					recommendations = {this.state.recommendations}
					tokenObject = {this.props.tokenObject}
					playing = {this.state.playing}
					handlerAddToPlaylist = {this.handlerAddToPlaylist}
					sliderValues = {this.state.sliderValueDict}
				/>
			</div>
		)
	}
	
	
}