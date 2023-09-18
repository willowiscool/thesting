"use client";

import qs from "qs"

import { useState, useEffect } from "react"
import useSWR from "swr"

export default function NowPlaying() {
	const [date, setDate] = useState(new Date())
	useEffect(() => {
		// every 30 seconds
		// https://gist.github.com/mohanramphp/af4f0267f5b1c3c0e726e18019eb2a0b
		const id = setInterval(() => setDate(new Date()), 30000)
		return () => clearInterval(id)
	}, [])

	const queryString = qs.stringify({
		fields: ["name"],
		filters: {
			weekday: {
				$eq: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
			},
			start: {
				// strapi expects this specific time format
				$lte: `${date.getHours()}:${date.getMinutes()}:00.000`
			},
			end: {
				$gte: `${date.getHours()}:${date.getMinutes()}:00.000`
			}
		}
	})

	const {data, isLoading} = useSWR(
		`${process.env.NEXT_PUBLIC_STRAPI_API}/shows?${queryString}`,
		(...args) => fetch(...args).then(res => res.json())
	)
	if (isLoading) return (<span>THE STING</span>)
	if (data?.data?.length > 0) return (<span>{data.data[0].attributes.name}</span>)
	return (<span>THE STING</span>)
}
