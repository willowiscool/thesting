import Link from "next/link"
import { micromark } from "micromark"
import util from "../../util.module.css"
import { timeFormat } from "../../util.js"

export const revalidate = 60
export default async function Show({ params: { id } }) {
	const showData = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/shows/${id}?populate[0]=header`
	).then(res => res.json())
	const show = showData.data.attributes

	return (
		<main>
			{/* TODO fix image crap (using NEXTJS image stuffs) */}
			<h1>{show.name} - {show.dj}</h1>
			<p><i><Link href="/shows">back to shows</Link> <Link href="/">back home</Link></i></p>
			{
				show.header.data && 
					<div className={util.header}>
						<img src={process.env.NEXT_PUBLIC_MEDIA_URL + show.header.data.attributes.url}/>
					</div>
			}
			<p>{show.weekday}s, {timeFormat(show.start)} to {timeFormat(show.end)}</p>
			<div dangerouslySetInnerHTML={{ __html: micromark(show.description || "") }} className={util.markdown}/>
		</main>
	)
}
