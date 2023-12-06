'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
	const [data, setData] = useState(null)

	const onClick = () => {
		fetch('/api/common')
			.then(res => res.json())
			.then(setData)
	}

	return (
		<main className={styles.main}>
			<button onClick={onClick}>Fetch ENV</button>
			<div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</main>
	)
}
