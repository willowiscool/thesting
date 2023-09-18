"use client";

import useSWR from "swr"

import styles from "./player.module.css"
import { useRef, useState } from "react"

import { MdPlayArrow, MdPause, MdVolumeUp } from "react-icons/md"

import NowPlaying from "./nowPlaying"

export default function Player() {
	const audioRef = useRef(null)
	const [playing, setPlaying] = useState(false)
	const [volume, setVolume] = useState(1)

	const handlePlay = () => {
		if (!playing) audioRef.current.play()
		else audioRef.current.pause()
		setPlaying(!playing)
	}
	const handleVolume = e => {
		audioRef.current.volume = e.target.value
		setVolume(e.target.value)
	}

	return (
		<div className={styles.player}>
			<span className={styles.nowPlaying}>NOW PLAYING: <NowPlaying/></span>
			<div className={styles.playerLine}>
				<button onClick={handlePlay} className={styles.button}>
					{playing ? <MdPause/> : <MdPlayArrow/>}
				</button>
				<div className={styles.rangeContainer}>
					<MdVolumeUp/>
					<input
						className={styles.range}
						type="range"
						value={volume}
						onChange={handleVolume}
						min="0"
						max="1"
						step="any"
					/>
				</div>
				<audio
					ref={audioRef}
					src="/testmp3.mp3"/>
					{/* src="http://wrur.ur.rochester.edu:8000/thestinghi"/> */}
			</div>
		</div>
	)
}
