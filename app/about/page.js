import Link from "next/link"
import { micromark } from "micromark"
import util from "../util.module.css"

// defined these in strapi when making the type
// names come from constitution
const eboardRoles = [
	["External General Manager", "externalgm"],
	["Internal General Manager", "internalgm"],
	["Business Manager", "businessmanager"],
	["Chief Engineer", "engineer"],
	["FM Programming Director", "fm"],
	["Sting Programming Director", "sting"],
	["Music Director", "music"],
	["Productions Director", "productions"],
	["Creative Director", "creative"],
	["TV Director", "tv"],
	["Alumni Coordinator", "alumni"],
	["Event Coordinator", "events"],
	["IT Director", "it"],
	["Podcasting Director", "podcasting"]
]

export const revalidate = 60
export default async function About() {
	const aboutData = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/about`
	).then(res => res.json())
	const about = aboutData.data.attributes

	return (
		<main>
			<h1>ABOUT WRUR</h1>
			<p><i><Link href="/">back home</Link></i></p>
			<div dangerouslySetInnerHTML={{ __html: micromark(about.description_long || "") }} className={util.markdown}/>
			<h1>Meet the E-Board</h1>
			{
				eboardRoles.map((role, i) =>
					<p key={i}>
						{role[0]}: {about[role[1]]}
						<br/>
						<i>{about[role[1] + "_desc"]}</i>
					</p>
				)
			}
		</main>
	)
}
