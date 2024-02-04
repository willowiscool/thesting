import Link from "next/link"
import qs from "qs"
import { micromark } from "micromark"

import styles from "./page.module.css"
import util from "./util.module.css"

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

const postsQuery = qs.stringify({
	fields: ["title"],
	pagination: {
		start: 0,
		limit: 5
	},
	sort: "createdAt:desc"
})

export const revalidate = 60 // revalidate chache every 60 seconds
export default async function Home() {
	const about = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/about?fields[0]=description`
	).then(res => res.json())
	const reviews = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/reviews?${reviewsQuery}`
	).then(res => res.json())

	// Shows is a client component but we fetch the shows in this server component and pass them rather than fetching them from the client
	// Could use SWR with the fallback but that's not necessary
	const shows = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/shows?${showsQuery}`
	).then(res => res.json())

	const posts = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/posts?${postsQuery}`
	).then(res => res.json())
	return (
		<main>
			<h1>ABOUT THE STING</h1>
			<div dangerouslySetInnerHTML={{ __html: micromark(about.data.attributes.description || "") }} className={util.markdown}/>
			<div className={util.horizontal}>
				<Link href="/about" className={util.link}>Learn More</Link>
				<a href="https://www.youtube.com/user/URTVOnline" className={util.link}>URTV</a>
				<a href="https://ccc.rochester.edu/wrur/club_signup" className={util.link}>Join on CCC</a>
			</div>
			<h1><Link href="/shows">SCHEDULE</Link></h1>
			<Shows shows={shows}/>
			<p><i><Link href="/shows">see all shows</Link></i></p>
			<h1><Link href="/posts">POSTS</Link></h1>
			<ul>
				{posts.data.map(post => 
					<li key={post.id}><Link href={"/posts/" + post.id}>{post.attributes.title}</Link></li>
				)}
				<li><Link href="/posts" className={styles.italic}>read more...</Link></li>
			</ul>
			<h1><Link href="/reviews">REVIEWS</Link></h1>
			<ul>
				{reviews.data.map(review =>
					<li key={review.id}><Link href={"/reviews/" + review.id}>{review.attributes.title} - {review.attributes.artist}</Link></li>
				)}
				<li><Link href="/reviews" className={styles.italic}>read more...</Link></li>
			</ul>
		</main>
	)
}
