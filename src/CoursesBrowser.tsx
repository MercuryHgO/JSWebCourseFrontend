import {useEffect, useState} from "react";

type Chapter = {
	chapterId: number,
	title: string,
	unitsNames: string[]
}[]

export function CoursesBrowser() {
	
	const [content, setContent] = useState(<p>Loading...</p>)
	
	const [chapter, setChapter] = useState<React.ReactNode|undefined>()
	const [chapterId, setChapterId] = useState<number|undefined>()
	
	
	useEffect(() => {
		
		fetch('http://localhost:6000/api/Course/get/titles', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.catch(
				e => {
					setContent(() => <p>Error: {e}</p>)
				}
			)
			.then(
				d => {
					d?.json().then(
						(chapters: Chapter) => {
							setContent(() =>
								<>
									<style jsx>{`
										h1 {
											font-size: 4vh;
											color: black;
										}
										
										h2 {
											font-size: 3vh;
											color: black;
											padding-left: 5vh;
											margin: 0 0 0 5vh;
											border-left: 0.5vh black solid;
										}
									`}</style>
									<div>
										{
											chapters.map(
												c => <div>
													<button onClick={() => {
														setChapterId(() => c.chapterId)
													}}>
														<h1>{c.title}</h1>
													</button>
													{
														c.unitsNames.map(
															u => <h2>{u}</h2>
														)
													}
												</div>
											)
										}
									</div>
								</>
							)
						}
					)
				}
			)
		
	}, [])
	
	useEffect(() => {
		if(!chapterId) return
		fetch(`http://localhost:6000/api/Chapter/get/${chapterId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(
				r => {
					r.json()
						.then(
							d => {
								setChapter( () =>
									<>
										<style jsx>{`
											section {
											  border-left: 0.5vh gray solid;
											}
										`}</style>
										<section>
											<p>{JSON.stringify(d)}</p>
										</section>
									</>
								)
							}
						)
				}
		)
	}, [chapterId]);
	
	return <>
		{
			content
		}
		{
			chapter
		}
		</>;
}