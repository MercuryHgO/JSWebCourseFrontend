import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import ChapterEditor from "./ChapterEditor.tsx";
import {Table, TableInformation} from "../Table/Table.tsx";
import Activity, {Activity as ActivityType} from "../Activities/Activity.tsx";

type SetCurrentActivityProvider = {
	setCurrentActivity: Dispatch<SetStateAction<ActivityType>>
}

const SERVER_URL =`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`

async function addChapter(value: {title: string, description: string}) {
	const response = await fetch(`${SERVER_URL}/api/Chapter/add`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(value)
	})
	
	switch (response.status) {
		case 200:
			alert('Success')
			break
		default:
			alert(JSON.stringify(await response.json()))
	}
}

async function deleteChapter(id: number) {
	if (!confirm('Are you want to delete id ' + id + '?').valueOf()) {
		return
	}
	
	return await fetch(`${SERVER_URL}/api/Chapter/delete/${id}`,{
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		},
		credentials: "include"
	})
	
	
}

async function fetchChapters(): Promise<{chapterId: number, title: string}[]> {
	const response = await fetch(`${SERVER_URL}/api/Course/get/titles`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	
	return await response.json()
}

async function unsafeFetchChapterById(id: number): Promise<{chapterId: number, title: string, description: string, units: any[]}> {
	const response = await fetch(`${SERVER_URL}/api/Chapter/get/${id}`,{
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	
	return await response.json()
}

async function updateChapter(chapter: { chapterId: number, title: string, description: string }) {
	const response = await fetch(`${SERVER_URL}/api/Chapter/update`,{
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(chapter),
		credentials: "include"
	})
	
	switch (await response.json()) {
		case 200:
			alert('Successfully updated chapter: ' + chapter.title + ' with id ' + chapter.chapterId)
			break
		default:
			alert('Error updating chapter')
			break
	}
}

const MainActivity = (props: SetCurrentActivityProvider) => {
	const {setCurrentActivity} = props
	
	const [chaptersElement,setChaptersElement] = useState<ReactNode>(<p>Loading...</p>)
	const [tableAction,selectedTableAction] = useState<TableInformation<{ chapterId: number, title: string }>>()
	
	useEffect(() => {
		fetchChapters()
			.then( c => {
				setChaptersElement(() => (
					<Table objects={c} callbackAction={selectedTableAction} />
				))
			})
	}, []);
	
	useEffect(() => {
		console.log(tableAction)
		switch (tableAction?.action) {
			case 'EDIT':
				unsafeFetchChapterById(tableAction.object.chapterId)
					.then(c => {
						setCurrentActivity(() => <ChapterEditor defaultValue={c} onSubmit={async (value) => { await updateChapter({chapterId: c.chapterId, ...value}) }} onCloseActivity={() => setCurrentActivity( () => <MainActivity setCurrentActivity={setCurrentActivity} /> )} />)
					})
				
				break;
			case 'DELETE':
				deleteChapter(tableAction?.object.chapterId)
					.then( r => {
						switch (r?.status) {
							case 200:
								alert('Successfully deleted chapter id ' + tableAction.object.chapterId)
								window.location.reload()
								break
							default:
								alert('Error deleting chapter')
								break
						}
					})
				break;
		}
	}, [tableAction]);
	
	function handleAddChapter() {
		setCurrentActivity(() => <ChapterEditor  onCloseActivity={() => setCurrentActivity(() => <MainActivity setCurrentActivity={setCurrentActivity}/>)} onSubmit={async (value) => { await addChapter(value) }} />)
	}
	
	return (
		<Activity>
			<button onClick={handleAddChapter}>Add chapter</button>
			{chaptersElement}
		</Activity>
	)
}

const Index = () => {
	
	
	const [currentActivity,setCurrentActivity] = useState<ActivityType>()
	
	useEffect(() => {
		setCurrentActivity(() => <MainActivity setCurrentActivity={setCurrentActivity} /> )
	}, []);
	
	return (
			<>
				<style jsx>{`
                  .editor-container {
                    height: fit-content;
                    width: 100%;
                    border-radius: inherit;
                  }
				`}</style>
				<div className={'editor-container'}>
					{currentActivity}
				</div>
			</>
	);
};

export default Index;