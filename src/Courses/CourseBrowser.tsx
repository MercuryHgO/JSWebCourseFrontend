import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ChapterBrowser, {fetchChapter} from "./ChapterBrowser.tsx";
import UnitBrowser, {Unit} from "./UnitBrowser.tsx";
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

type Chapter = {
	chapterId: number,
	title: string,
	unitsNames: string[] // REDU
}[]

enum SelectedId {
	chapter,
	unit
}

type unitListProps = {
	unitsOfChapters: Pick<Unit, 'unitId' | 'title'>[][],
	c: any,
	setChapterOrUnitId: Dispatch<SetStateAction<{id: number,type: SelectedId}|undefined>>
}

const UnitList = (props: unitListProps) => {
	const [clazz, setClazz] = useState<string>('')

	return (
	<>
		<style jsx>{`
			h1 {
				font-size: 22px;
				font-weight: 400;
				margin: 10px 0 10px 0;
			}

			

			ul {
				display: flex;
				flex-direction: column;
				margin: 0 0 0 15px;
				padding: 0 0 0 0;
				visibility: hidden;
			}

			h2 {
				font-size: 18px;
				font-weight: normal;
				margin: 0 0 0 0;
				border-bottom: 1px solid #c4c4c4;
				padding-bottom: 3px;
			}

			.active {
				visibility: visible;
			}
		`}</style>
		<div>
			<button onClick={ () => setClazz( v => { return v === '' ? 'active' : '' } ) } >
				<h1>{props.c.title}</h1>
			</button>
			<ul className={clazz}>{
				props.unitsOfChapters[props.c.chapterId].map(
					u => <button onClick={() => {
						props.setChapterOrUnitId( () => {
							return {id: u.unitId, type: SelectedId.unit}
						})
					}}>
						<h2>{u.title}</h2>
					</button>
				)
			}</ul>
		</div>
	</>)
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
                                      .navigator {
										display: flex;
										flex-direction: column;
										padding: 0 10px 10px 10px;
										height: 100%;
										border-right: 1px solid #c4c4c4;
									}
									`}</style>
									<div className={'navigator'}>
										{
											chapters.map(
												(c) => <UnitList c={c} setChapterOrUnitId={setChapterOrUnitID} unitsOfChapters={unitsOfChapters} />
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
				{
					hljs.configure({languages: ['javascript'], })
	
					hljs.highlightAll()

					return (<>
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
					</>)
				}
					
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