import {useEffect, useState} from "react";

export type Unit = {
	unitId: number,
	title: string,
	description: string,
	htmlCode: string,
	chapterId: number,
}
type fetchUnitOutput = Unit

async function fetchUnit(id: number): Promise<fetchUnitOutput> {
	const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/Unit/get/${id}`, {
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

type UnitContentProps = {
	rawHtml: string
}

const UnitContent = (props: UnitContentProps) => {
	
	return <>
		<style jsx>{`
		`}</style>
		<div dangerouslySetInnerHTML={{__html: props.rawHtml}}/>
	</>
}

const UnitBrowser = (props: Props) => {
	
	const [content, setContent] = useState<React.ReactNode|undefined>(<p>Loading...</p>)
	
	useEffect(() => {
		fetchUnit(props.id)
			.then(
				async (d) => {
					const newContent =
						<>
							<style jsx>{`
                              .unitBrowser {
                                width: 100%;
                                color: black;
                              }
							`}</style>
							
							<div className={'unitBrowser'}>
								<h1>{d.title}</h1>
								<p>{d.description}</p>
								<UnitContent rawHtml={d.htmlCode} />
							</div>
						</>
					setContent(() => newContent)
				}
			)
	}, [props.id]);
	
	return content;
};

export default UnitBrowser;