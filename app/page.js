import Link from "next/link"
import qs from "qs"

import styles from "./page.module.css"

import Shows from "./shows"

const reviewsQuery = qs.stringify({
	fields: ["title", "artist"],
	pagination: {
		start: 0,
		limit: 5
	},
	sort: "reviewDate:desc"
})

const showsQuery = qs.stringify({
	fields: ["start", "end", "weekday", "name", "dj"],
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

export default async function Home() {
	const reviews = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/reviews?${reviewsQuery}`)
		.then(res => res.json())

	const shows = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/shows?${showsQuery}`)
		.then(res => res.json())
	return (
		<main>
			<h1>ABOUT THE STING</h1>
			<p>Launched in the fall of 2009, The Sting is WRUR’s internet-only counterpart. Tune in for music selected by students, news about campus events and activities, live broadcasts of UofR sporting events, and much much more.</p>
			<div className={styles.horizontal}>
				<Link href="/about">Learn More</Link>
				<a href="#">UR TV</a>
				<a href="https://ccc.rochester.edu/wrur/club_signup">Join on CCC</a>
			</div>
			<h1>SCHEDULE</h1>
			<Shows shows={shows}/>
			<h1><Link href="#">POSTS</Link></h1>
			<ul>
				<li><Link href="#">The WRUR Newsletter – 2022 Fall Edition</Link></li>
				<li><Link href="#">Must Read: The Early Fall 2022 Newsletter</Link></li>
				<li><Link href="#">The WRUR Newsletter – 2022 Spring Edition</Link></li>
				<li><Link href="#">Must Read: The WRUR Newsletter – 2021 Fall Edition</Link></li>
				<li><Link href="#">Must Read: The WRUR Newsletter – 2021 Late Summer Edition</Link></li>
				<li><Link href="#" className={styles.italic}>read more...</Link></li>
			</ul>
			<h1><Link href="/reviews">REVIEWS</Link></h1>
			<ul>
				{reviews.data.map(review =>
					<li><Link href={"/reviews/" + review.id}>{review.attributes.title} - {review.attributes.artist}</Link></li>
				)}
				<li><Link href="/reviews" className={styles.italic}>read more...</Link></li>
			</ul>
		</main>
	)
}
