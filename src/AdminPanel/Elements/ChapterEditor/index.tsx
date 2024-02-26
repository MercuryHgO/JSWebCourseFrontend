import React, {Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import Activity from "../Activities/Activity.tsx";
import ChapterEditor from "./ChapterEditor.tsx";
import {Table, TableInformation} from "./chaptersTable.tsx";


type SetCurrentActivityProvider = {
	setCurrentActivity: Dispatch<SetStateAction<Activity>>
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

async function fetchChapters(): Promise<{id: string, title: string}[]> {
	const response = await fetch(`${SERVER_URL}/api/Course/get/titles`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	
	return await response.json()
}

const MainActivity = (props: SetCurrentActivityProvider) => {
	const {setCurrentActivity} = props
	
	const [chaptersElement,setChaptersElement] = useState<ReactNode>(<p>Loading...</p>)
	const [tableAction,selectedTableAction] = useState<TableInformation<{ id: string, title: string }> | null>(null)
	
	useEffect(() => {
		fetchChapters()
			.then( c => {
				setChaptersElement(() => (
					<Table chapters={c}  callbackAction={selectedTableAction}/>
				))
			})
	}, []);
	
	useEffect(() => {
		tableAction ? alert(tableAction) : null
	}, [tableAction]);
	
	function handleAddChapter() {
		setCurrentActivity(<ChapterEditor  onCloseActivity={() => setCurrentActivity(<MainActivity setCurrentActivity={setCurrentActivity}/>)} onSubmit={async (value) => { await addChapter(value) }} />)
	}
	
	return (
		<Activity>
			<button onClick={handleAddChapter}>Add chapter</button>
			{chaptersElement}
		</Activity>
	)
}

const Index = () => {
	
	
	const [currentActivity,setCurrentActivity] = useState<Activity>()
	
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