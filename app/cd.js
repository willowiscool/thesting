import styles from "./cd.module.css"
import Image from "next/image"

// TODO: take a custom image
export default function CD() {
	return (
		<div className={styles.CD}>
			<div className={styles.back}>
				<Image src="/images/case_back.png" fill/>
			</div>
			<div className={styles.image}>
				<Image src="/images/wrur.png" fill/>
			</div>
			<div className={styles.front}>
				<Image src="/images/case_front.png" fill/>
			</div>
			<span className={styles.wrur}>WRUR</span>
			<span className={styles.thesting}>THE STING</span>
		</div>
	);
}
