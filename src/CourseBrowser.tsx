import {useEffect, useState} from "react";
import ChapterBrowser, {fetchChapter} from "./ChapterBrowser.tsx";
import UnitBrowser, {Unit} from "./UnitBrowser.tsx";

type Chapter = {
	chapterId: number,
	title: string,
	unitsNames: string[] // REDU
}[]

enum SelectedId {
	chapter,
	unit
}

export function CourseBrowser() {
	
	
	const [contentList, setContentList] = useState(<p>Loading...</p>)
	
	const [content, setContent] = useState<React.ReactNode|undefined>()
	const [chapterOrUnitID, setChapterOrUnitID] = useState<{id: number,type: SelectedId}|undefined>()
	
	
	useEffect(() => {
		
		fetch('http://localhost:6000/api/Course/get/titles', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.catch(
				e => {
					setContentList(() => <p>Error: {e}</p>)
				}
			)
			.then(
				d => {
					d?.json().then(
						async (chapters: Chapter) => {
							const unitsOfChapters: Pick<Unit, 'unitId' | 'title'>[][] = []
							
							for (const c of chapters) {
								const { units } = (await fetchChapter(c.chapterId))
								
								unitsOfChapters[c.chapterId] = units.map( u => { return {unitId: u.id, ...u}})
							}
							
							
							const newContent =
								<>
									<style jsx>{`
                                          h1 {
                                            font-size: 4vh;
                                            color: black;
                                          }
                                          
                                          menu {
                                            display: flex;
                                            flex-direction: column;
                                          }
                                          
                                          ul {
                                            display: flex;
                                            flex-direction: column;
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
												(c) => {
													return (<menu>
														<button onClick={() => {
															setChapterOrUnitID(() => {
																return {
																	id: c.chapterId,
																	type: SelectedId.chapter
																}
															})
														}}>
															<h1>{c.title}</h1>
														</button>
														<ul>{
															unitsOfChapters[c.chapterId].map(
																u => <button onClick={() => {
																	setChapterOrUnitID( () => {
																		return {id: u.unitId, type: SelectedId.unit}
																	})
																}}>
																	<h2>{u.title}</h2>
																</button>
															)
														}</ul>
													</menu>)
												}
											)
										}
									</div>
								</>
							
								setContentList(() => newContent)
						}
					)
				}
			)
		
	}, [])
	
	useEffect(() => {
		
		if(!chapterOrUnitID) return
		
		switch (chapterOrUnitID.type) {
			case SelectedId.chapter:
				console.log('da')
						setContent( () =>
							<>
								<style jsx>{`
											section {
											  border-left: 0.5vh gray solid;
											}
										`}</style>
								<section>
									<ChapterBrowser id={chapterOrUnitID.id} />
								</section>
							</>
						)

				break;
			case SelectedId.unit:
				console.log('da')
				setContent( () =>
					<>
						<style jsx>{`
							section {
							  border-left: 0.5vh gray solid;
							}
						`}</style>
						<section>
							<UnitBrowser id={chapterOrUnitID.id} />
						</section>
					</>
				)
				break;
			
		}
		
}, [chapterOrUnitID]);
	
	return <>
		{
			contentList
		}
		{
			content
		}
		</>;
}