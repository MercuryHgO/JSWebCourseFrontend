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
		
		fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/Course/get/titles`, {
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
                                        font-size: 20px;
                                        font-weight: normal;
                                        margin: 10px 0 10px 0;
                                      }

                                      .navigator {
                                        display: flex;
                                        flex-direction: column;
                                        background-color: #cccccc;
                                        height: fit-content;
                                        padding: 0 10px 10px 10px;
                                        box-shadow: black 5px 5px 0px 0;
                                        border-radius: 15px;
                                      }

                                      
                                      ul {
                                        display: flex;
                                        flex-direction: column;
                                        margin: 0 0 0 15px;
                                        padding: 0 0 0 0;
                                      }

                                      h2 {
                                        font-size: 18px;
                                        padding-left: 5vh;
                                        font-weight: normal;
                                        margin: 0 0 0 0;
                                        border-left: 2px var(--text-color) solid;
                                      }
									`}</style>
									<div className={'navigator'}>
										{
											chapters.map(
												(c) => {
													return (<div>
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
													</div>)
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
				setContent( () =>
					<>
						<style jsx>{`
							section {
							  min-width: 70%;
							  margin: 0 0 0 10px;
							  padding: 0 0 0 10px;
							}
						`}</style>
						<section>
							<ChapterBrowser id={chapterOrUnitID.id} />
						</section>
					</>
				)

				break;
			case SelectedId.unit:
				setContent( () =>
					<>
						<style jsx>{`
							section {
							  margin: 0 0 0 10px;
                              padding: 0 0 0 10px;
                              min-width: 70%;
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