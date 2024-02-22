import {useEffect, useState} from "react";

type fetchChapterOutput = {
	chapterId: number,
	title: string,
	description: string,
	units: { id: number, title: string }[]
}

export async function fetchChapter(id: number): Promise<fetchChapterOutput> {
	const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/Chapter/get/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	
	return await response.json()
}

type Props = {
	id: number
}

const ChapterBrowser = (props: Props) => {
	
	const [content, setContent] = useState<React.ReactNode|undefined>(<p>Loading...</p>)
	
	useEffect(() => {
		fetchChapter(props.id)
			.then(
				async (d) => {
					const newContent =
						<>
							<style jsx>{`
							  .chapterBrowser {
								width: 100%;
							  }
							`}</style>
							
							<div className={'chapterBrowser'}>
								<h1> {d.title} </h1>
								<p> {d.description} </p>
							</div>
						</>
					setContent(() => newContent)
				}
			)
	}, [props.id]);
	
	return content;
};

export default ChapterBrowser;
