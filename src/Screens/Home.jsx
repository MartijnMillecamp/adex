import React, {Component} from 'react'
import Recommendations from '../Components/Recommendations'
import 'fontsource-roboto';
import {addToDict} from '../Utils/addToDict';
import {removeFromArrayOfObjects} from '../Utils/removeFromArray';
import {addToArrayObjects} from '../Utils/addToArray';

import {search} from '../Utils/Spotify';
import {getRecommendation} from '../Utils/Spotify';
import {orderList} from "../Utils/orderList";
import {filterNoPreview} from "../Utils/filterPreview";
import {filterPlaylist} from "../Utils/filterPreview";

import Playlist from "../Components/Playlist";
import classnames from 'classnames'
import '../Styling/global.css'
import styles from '../Styling/Home.module.css';

import Sliders from "../Components/Sliders";
import SearchField from "../Components/SearchField"
import SearchResults from "../Components/SearchResults"
import Export from '../Screens/Export'
import Scatterplot from "../Components/Scatterplot";



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
				popularity: 50
			},
			search : false,
			searchResults: [],
			status: 'empty',
			export: false
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
		this.handlerInitSliderValues = this.handlerInitSliderValues.bind(this);
		this.handlerExport = this.handlerExport.bind(this);
		
	}
	
	
	
	componentDidMount(){
		this.getRecommendations()
	}
	
	handlerSliderChange(value, slider){
		const values = this.state.sliderValueDict;
		if (slider !== 'popularity'){
			values[slider] = value / 100;
		}
		else{
			values[slider] = value;
		}
		this.setState({sliderValueDict: values})
		this.getRecommendations()
	}
	
	handlerAddSource(song){
		this.setState({
			sources: [...this.state.sources, song]
		}, () => this.getRecommendations());
	}
	
	handlerRemoveSource(song){
		const sources = removeFromArrayOfObjects(this.state.sources, 'id', song);
		this.setState({
			sources: sources
		}, () => this.getRecommendations());
	}
	
	updateRecommenderStatus(status){
		this.setState({
			status: status
		})
	}
	
	updateRecommendations(recommendations) {
		this.setState({
			recommendations: recommendations
		});
	}
	
	handlerAddToPlaylist(song){
		const recommendations = removeFromArrayOfObjects(this.state.recommendations, 'id', song);
		//update rendering recommendations
		if (recommendations.length === 0){
			this.updateRecommenderStatus('empty')
		}
		//use utils function to check already in list
		const newPlaylist = addToArrayObjects(this.state.playlist, song);
		this.setState({
			playlist: newPlaylist,
			// recommendations: recommendations,
		});
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
		this.handlerRemoveSource(song)
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
	
	stopAllSongs(){
		this.stopPlayingSong()
		this.setState({
			playing: null
		});
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
		let searchResults = [];
		if (query !== ""){
			const accessToken = this.props.location.state.tokenObject['access_token'];
			searchResults = await search(query, accessToken);
			this.setState({
				searchResults : searchResults
			})
		}
		else{
			this.setState({
				searchResults : searchResults
			})
		}
	}
	
	handlerStopSearch(){
		this.setState({
			search: false,
			searchResults: [],
		});
		this.stopAllSongs();
	}
	
	handlerInitSliderValues(sliderValueDict){
		this.setState({
			sliderValueDict: sliderValueDict
		})
	}
	
	handlerExport(){
		this.setState({
			export: true
		})
	}

	
	
	async getRecommendations() {
		//TODO decide how to show all recommendations (tabs, list, ...)
		//TODO error when too long updating?
		this.updateRecommenderStatus('updating');
		this.updateRecommendations([]);
		
		
		//stop audio from playing when update
		this.stopAllSongs()
		
		
		let recommendations = [];
		let finishedSeeds = 0;
		const accessToken = this.props.location.state.tokenObject['access_token'];
		const seeds = this.state.sources;
		//limit the number or requests to 40 songs
		let totalNumber = 40;
		let numberPerSeed = 5;
		if (seeds.length !== 0){
			numberPerSeed = Math.round(totalNumber / seeds.length)
		}
		//request recommendations
		for (let i=0; i < seeds.length; i++){
			const recommendationsSeed = await getRecommendation(seeds[i], this.state.sliderValueDict, accessToken, numberPerSeed);
			for (let j = 0; j < recommendationsSeed.length; j++){
				recommendations = addToArrayObjects(recommendations, recommendationsSeed[j])
			}
			finishedSeeds += 1
		}
		//if all recommendations are in
		if (finishedSeeds === seeds.length){
			const recommendationsFlat = recommendations.flat(1);
			const recFilteredPreview = filterNoPreview(recommendationsFlat);
			const recFilteredPlaylist = filterPlaylist(recFilteredPreview, this.state.playlist)
			const recOrdered = orderList(recFilteredPlaylist, this.state.sliderValueDict);
			if (recOrdered.length === 0){
				this.updateRecommenderStatus('empty')
			}
			else{
				this.updateRecommenderStatus('finished')
			}
			this.updateRecommendations(recOrdered)
		}
		
	}
	
	renderExport(){
		return(
			<Export
				playlist={this.state.playlist}
				tokenObject={this.props.location.state.tokenObject}
			/>
		)
	}
	
	renderHome(){
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
		const styleContainerHome = classnames('container-columns', styles.container);
		const styleContainerCol2 = classnames('container-rows', styles.column2);
		
		return (
			<div className={styleContainerHome}>
				<Playlist
					handlerPlaySong = {this.handlerPlaySong}
					handlerPauseSong = {this.handlerPauseSong}
					playlist = {this.state.playlist}
					tokenObject = {this.props.location.state.tokenObject}
					playing = {this.state.playing}
					handlerDeleteFromPlaylist = {this.handlerDeleteFromPlaylist}
					handlerAddToPlaylist = {this.handlerAddToPlaylist}
					handlerAddSource = {this.handlerAddSource}
					handlerRemoveSource = {this.handlerRemoveSource}
					handlerInitSliderValues = {this.handlerInitSliderValues}
					handlerExport = {this.handlerExport}
				/>
				<div
					className = {styleContainerCol2}
				>
					<SearchField
						handlerSearchClick = {this.handlerSearchClick}
						active = {this.state.search}
						handlerSearch = {this.handlerSearch}
						handlerStopSearch = {this.handlerStopSearch}
						results = {this.state.searchResults}
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
							sliderValueDict={this.state.sliderValueDict}
						/>
					}
					<Scatterplot
						data={this.state.recommendations}
						sliderValueDict={this.state.sliderValueDict}
						colorDict={colorDict}
					/>
				
				</div>
				
				
				<Recommendations
					handlerPlaySong = {this.handlerPlaySong}
					handlerPauseSong = {this.handlerPauseSong}
					recommendations = {this.state.recommendations}
					tokenObject = {this.props.location.state.tokenObject}
					playing = {this.state.playing}
					handlerAddToPlaylist = {this.handlerAddToPlaylist}
					status = {this.state.status}
					sliderValueDict={this.state.sliderValueDict}
					colorDict={colorDict}
				/>
			</div>
		)
	}
	
	
	
	render() {
		return(
			this.state.export ? this.renderExport() : this.renderHome()
		)
		
		
	}
	
	
}