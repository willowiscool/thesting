import "./globals.css"
import styles from "./layout.module.css"

import { Bebas_Neue, Benne } from "next/font/google"
const bebasNeue = Bebas_Neue({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-bebasNeue"
})

const benne = Benne({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-benne"
})

import CD from "./cd"
import Player from "./player"

export const metadata = {
	title: "The Sting | WRUR",
	description: "WRUR's Web Radio Show",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${styles.body} ${bebasNeue.variable} ${benne.variable}`}>
				<div className={styles.left}>
					<CD/>
					<Player/>
				</div>
				<div className={styles.right}>
					{children}
				</div>
			</body>
		</html>
	)
}
