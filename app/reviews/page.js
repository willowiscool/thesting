"use client";

import qs from "qs"
import Link from "next/link"
import useSWR from "swr"
import { useState } from "react"
import util from "../util.module.css"
import styles from "./page.module.css"

export default function Reviews() {
	const [page, setPage] = useState(1)
	/* controlling input with state rather than having a ref to it to get the search
	 * because when input is not controlled, state change resets it (clears it) */
	const [inputTxt, setInputTxt] = useState("")
	const [search, setSearch] = useState("")
	const [sort, setSort] = useState("reviewDate:desc")
	const queryObj = { sort, pagination: { page } }
	if (search !== "") {
		queryObj.filters = {
			$or: [
				{ title: { $containsi: search } },
				{ artist: { $containsi: search } }
			]
		}
	}
	const queryString = qs.stringify(queryObj)

	/* sending a new request to the server for every search rather than filtering what we currently have because the request won't return every review (only 25) and we shouldn't filter the incomplete set.
	 * it would be cool if we did filter the incomplete set while waiting for the results to come in but the server isn't slow enough to need that */
	const {data, isLoading} = useSWR(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/reviews?${queryString}`,
		(...args) => fetch(...args).then(res => res.json())
	)
	if (isLoading) return <p>Loading...</p>
	return (
		<main>
			<h1>REVIEWS</h1>
			<p><i><Link href="/">back home</Link></i></p>
			<div className={styles.searchContainer}>
				<input
					type="text"
					placeholder="keywords"
					className={`${styles.search} ${util.text}`}
					value={inputTxt}
					onChange={e => setInputTxt(e.target.value)}/>
				<button
					className={`${styles.searchButton}`}
					onClick={() => setSearch(inputTxt)}>
					Search
				</button>
				{search !== "" && <button className={styles.searchButton} onClick={() => {setSearch(""); setInputTxt("")}}>Clear</button>}
			</div>
			<br/>
			<div>
				<div className={styles.spacer}></div>
				<label className={util.text}>
					Sort by:&nbsp;
					<select defaultValue="reviewDate:desc" value={sort} onChange={e => setSort(e.target.value)} className={styles.select}>
						<option value="reviewDate:desc">Review date (newest first)</option>
						<option value="reviewDate:asc">Review date (oldest first)</option>
						<option value="released:desc">Release date (newest first)</option>
						<option value="released:asc">Release date (oldest first)</option>
						<option value="artist">Artist name</option>
					</select>
				</label>
			</div>
			{data.meta.pagination.total === 0 && <p>No results found :(</p>}
			<ul>
				{data.data.map(review =>
					<li key={review.id}><Link href={"/reviews/" + review.id}>{review.attributes.title} - {review.attributes.artist}</Link></li>
				)}
			</ul>
			{/* possible TODO: pagination into its own component? */}
			<p className={util.horizontal}>
				{data.meta.pagination.page !== 1 &&
					<button onClick={() => setPage(page-1)} className={util.linkButton}>prev page</button>
				}
				{data.meta.pagination.pageCount > 1 && <span>page {data.meta.pagination.page} out of {data.meta.pagination.pageCount}</span>}
				{data.meta.pagination.pageCount > 0 && data.meta.pagination.page !== data.meta.pagination.pageCount &&
					<button onClick={() => setPage(page+1)} className={util.linkButton}>next page</button>
				}
			</p>
		</main>
	)
}
