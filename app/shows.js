"use client";

import styles from "./shows.module.css"
import { useState } from "react"
import Link from "next/link"

// maybe move to it's own file in a utils folder?
function timeFormat(time) {
	let [hours, minutes] = time.split(":").map(Number)
	let ampm = "AM"
	if (hours >= 12) ampm = "PM"
	if (hours > 12) hours -= 12
	if (hours === 0) hours = 12
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`
}

export default function Shows({shows}) {
	const [weekday, setWeekday] = useState("Monday")
	return (
		<div className={styles.shows}>
			<div>
				<button onClick={() => setWeekday("Monday")}>Monday</button><br/>
				<button onClick={() => setWeekday("Tuesday")}>Tuesday</button><br/>
				<button onClick={() => setWeekday("Wednesday")}>Wednesday</button><br/>
				<button onClick={() => setWeekday("Thursday")}>Thursday</button><br/>
				<button onClick={() => setWeekday("Friday")}>Friday</button><br/>
				<button onClick={() => setWeekday("Saturday")}>Saturday</button><br/>
				<button onClick={() => setWeekday("Sunday")}>Sunday</button>
			</div>
			<div className={styles.table}>
				{shows.data.filter(show => show.attributes.weekday === weekday).map(show =>
					<div className={styles.row} key={show.id}>
						<div className={styles.cell}>
							{timeFormat(show.attributes.start)} to {timeFormat(show.attributes.end)}
						</div>
						<div className={styles.cell}>
							<Link href={`/shows/${show.id}`}>{show.attributes.name}</Link>
						</div>
						<div className={styles.cell}>
							{show.attributes.dj}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
