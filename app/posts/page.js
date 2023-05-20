"use client";

import qs from "qs"
import Link from "next/link"
import useSWR from "swr"
import { useState } from "react"
import styles from "./page.module.css"
import util from "../util.module.css"

export default function Posts() {
	const [page, setPage] = useState(1)
	const queryString = qs.stringify({
		sort: "createdAt:desc",
		pagination: {
			//pageSize: 5, //used to test pagination
			page: page
		}
	})
	const {data, isLoading} = useSWR(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/posts?${queryString}`,
		(...args) => fetch(...args).then(res => res.json())
	)
	if (isLoading) return <p>Loading...</p>
	return (
		<main>
			<h1>POSTS</h1>
			<p><i><Link href="/">back home</Link></i></p>
			<ul>
				{data.data.map(post =>
					<li key={post.id}><Link href={"/posts/" + post.id}>{post.attributes.title}</Link></li>
				)}
			</ul>
			{/* possible TODO: pagination into its own component? */}
			<p className={util.horizontal}>
				{data.meta.pagination.page !== 1 &&
						<button onClick={() => setPage(page-1)} className={util.linkButton}>prev page</button>
					}
					{data.meta.pagination.pageCount > 1 && <span>page {data.meta.pagination.page} out of {data.meta.pagination.pageCount}</span>}
					{data.meta.pagination.page !== data.meta.pagination.pageCount &&
						<button onClick={() => setPage(page+1)} className={util.linkButton}>next page</button>
				}
			</p>
		</main>
	)
}
