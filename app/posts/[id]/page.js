import Link from "next/link"
import { micromark } from "micromark"
import util from "../../util.module.css"

export default async function Post({ params: { id } }) {
	const post = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/posts/${id}`)
		.then(res => res.json())
	return (
		<main>
			<h1>{post.data.attributes.title}</h1>
			<p><i><Link href="/posts">back to posts</Link> <Link href="/">back home</Link></i></p>
			<p>Posted by {post.data.attributes.author} on {new Date(post.data.attributes.createdAt).toDateString()}</p>
			<div dangerouslySetInnerHTML={{ __html: micromark(post.data.attributes.content) }} className={util.markdown}/>
		</main>
	)
}
