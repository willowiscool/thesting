"use client";

import styles from "./shows.module.css"
import { useState } from "react"
import Link from "next/link"
import { timeFormat } from "./util.js"

export default function Shows({shows}) {
	const [weekday, setWeekday] = useState("Monday")
	return (
		<div className={styles.shows}>
			<div className={styles.buttons}>
				<button onClick={() => setWeekday("Monday")} className={weekday == "Monday" && styles.selected}>MON</button><br/>
				<button onClick={() => setWeekday("Tuesday")} className={weekday == "Tuesday" && styles.selected}>TUE</button><br/>
				<button onClick={() => setWeekday("Wednesday")} className={weekday == "Wednesday" && styles.selected}>WED</button><br/>
				<button onClick={() => setWeekday("Thursday")} className={weekday == "Thursday" && styles.selected}>THU</button><br/>
				<button onClick={() => setWeekday("Friday")} className={weekday == "Friday" && styles.selected}>FRI</button><br/>
				<button onClick={() => setWeekday("Saturday")} className={weekday == "Saturday" && styles.selected}>SAT</button><br/>
				<button onClick={() => setWeekday("Sunday")} className={weekday == "Sunday" && styles.selected}>SUN</button>
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
