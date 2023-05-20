import Link from "next/link"
import { micromark } from "micromark"
import util from "../../util.module.css"

export default async function Review({ params: { id } }) {
	const reviewData = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/reviews/${id}?populate=reviewer`
	).then(res => res.json())
	const review = reviewData.data.attributes

	return (
		<main>
			<h1>Review: {review.title} - {review.artist}</h1>
			<p><i><Link href="/reviews">back to reviews</Link> <Link href="/">back home</Link></i></p>
			<div dangerouslySetInnerHTML={{ __html: micromark(review.review) }} className={util.markdown}/>
			<ul>
				<li>Genre: {review.genre}</li>
				<li>Release date: {new Date(review.released).toDateString()}</li>
				<li>Recommended if you like: {review.riyl}</li>
				<li>Swears: {review.swears}</li>
				<li>Recommended tracks: {review.recommendedTracks}</li>
				<li>Label: {review.label}</li>
				<li>Reviewed by: {review.reviewer.data.attributes.name}</li>
				<li>Reviewed on: {new Date(review.reviewDate).toDateString()}</li>
			</ul>
		</main>
	)
}
