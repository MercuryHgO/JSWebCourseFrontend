import Activity, {Activity as ActivityType} from "../Activities/Activity.tsx";
import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import UnitEditor from "./UnitEditor.tsx";
import {Table, TableInformation} from "../Table/Table.tsx";

const SERVER_URL =`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`

type SetCurrentActivityProvider = {
	setCurrentActivity: Dispatch<SetStateAction<ActivityType>>
}

export type Unit = {
	"unitId": number,
	"title": string,
	"description": string,
	"htmlString": string,
	"htmlCode"?: string,
	"chapterId": number,
}

async function fetchUnits(): Promise<Unit[]> {
	const response = await fetch(`${SERVER_URL}/api/Unit/get/all`,{
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})

	return (await response.json()).map((e: Unit) => {
		const returnValue = {...e, htmlString: e.htmlCode}
		delete returnValue.htmlCode
		return returnValue
	})  //pizdec
}

async function deleteUnit(id: number) {
	if (!confirm('Are you want to delete id ' + id + '?').valueOf()) {
		return
	}
	
	return await fetch(`${SERVER_URL}/api/Unit/delete/${id}`,{
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		},
		credentials: "include"
	})
	
	
}

async function postUnit(value: Omit<Unit, "unitId">) {
	
	const request = await fetch(`${SERVER_URL}/api/Unit/add`,{
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: "include",
		body: JSON.stringify(value),
	})
	
	switch (request.status) {
		case 200:
			alert('Successfully created unit ' + value.title)
			break;
		default:
			alert('Error creating unit')
			break;
	}
}

async function updateUnit(unit: Unit) {
	const payload: Omit<typeof unit, "htmlString"> = {
		htmlCode: unit.htmlString,
		...unit
	}
	
	const response = await fetch(`${SERVER_URL}/api/Unit/update`,{
		method: 'PATCH',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(payload),
		credentials: "include"
	})
	
	switch (await response.json()) {
		case 200:
			alert('Successfully updated unit: ' + unit.title + ' with id ' + unit.chapterId)
			break
		default:
			alert('Error updating unit')
			break
	}
}

const MainActivity = (props: SetCurrentActivityProvider) => {
	const {setCurrentActivity} = props
	
	const [chaptersElement,setChaptersElement] = useState<ReactNode>(<p>Loading...</p>)
	const [tableAction,selectedTableAction] = useState<TableInformation<Unit>>()
	
	useEffect(() => {
		fetchUnits()
			.then( u => {
				setChaptersElement(() => (
					<Table objects={u} callbackAction={selectedTableAction} />
				))
			})
	}, []);
	
	useEffect(() => {
		console.log(tableAction)
		switch (tableAction?.action) {
			case 'EDIT':
				setCurrentActivity(() => <UnitEditor defaultValue={tableAction?.object} onSubmit={async (value) => { await updateUnit({unitId: tableAction?.object.unitId, ...value}) }} onCloseActivity={() => setCurrentActivity( () => <MainActivity setCurrentActivity={setCurrentActivity} /> )} />)

				break;
			case 'DELETE':
				deleteUnit(tableAction?.object.unitId)
					.then( r => {
						switch (r?.status) {
							case 200:
								alert('Successfully deleted unit id ' + tableAction.object.unitId)
								window.location.reload()
								break
							default:
								alert('Error deleting unit')
								break
						}
					})
				break;
		}
	}, [tableAction]);
	
	// function handleAddChapter() {
	// 	setCurrentActivity(() => <ChapterEditor  onCloseActivity={() => setCurrentActivity(() => <MainActivity setCurrentActivity={setCurrentActivity}/>)} onSubmit={async (value) => { await addChapter(value) }} />)
	// }
	
	function handleAddUnit() {
		setCurrentActivity(<UnitEditor onSubmit={async (value) => { await postUnit(value)}} onCloseActivity={() => setCurrentActivity(<MainActivity setCurrentActivity={setCurrentActivity} /> )} />)
	}
	
	return (
		<Activity>
			<button onClick={() => handleAddUnit()}>Добавить раздел</button>
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