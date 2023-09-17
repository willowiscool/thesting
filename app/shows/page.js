import qs from "qs"
import Link from "next/link"
// re-using styles from shows component on homepage
// and doing the same table thing
import styles from "../shows.module.css"
import moreStyles from "./page.module.css"
import { timeFormat } from "../util.js"

const showsQuery = qs.stringify({
	fields: ["start", "end", "weekday", "name", "dj"],
	// let's hope there will never be more than 100 shows
	pagination: {
		start: 0,
		limit: 100
	},
	filters: {
		onAir: {
			$eq: true
		}
	},
	sort: "start"
})

export const revalidate = 60
export default async function Shows() {
	const showsData = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/shows?${showsQuery}`).then(res => res.json())

	// filter by weekday
	const shows = {
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
		Saturday: [],
		Sunday: []
	}
	console.log(showsData)
	showsData.data.forEach(show => {
		shows[show.attributes.weekday].push(show)
	})
	
	return (
		<main>
			<h1>SHOW SCHEDULE</h1>
			<p><i><Link href="/">back home</Link></i></p>
			<div className={styles.table}>
				{Object.entries(shows).map(weekday => weekday[1].length > 0 && (
					<>
						<div className={styles.row}>
							<div className={styles.cell}>
								<h2 className={moreStyles.weekday}>{weekday[0]}</h2>
							</div>
						</div>
						{weekday[1].map(show =>
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
					</>
				))}
			</div>
		</main>
	)
}
