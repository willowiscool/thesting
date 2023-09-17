export function timeFormat(time) {
	let [hours, minutes] = time.split(":").map(Number)
	let ampm = "AM"
	if (hours >= 12) ampm = "PM"
	if (hours > 12) hours -= 12
	if (hours === 0) hours = 12
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`
}
