import parse from "html-react-parser"
import {useEffect, useState} from "react";
import "prismjs/themes/prism.css"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

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
	

	const data: fetchUnitOutput = await response.json()

	data.htmlCode = data.htmlCode.replace(/<pre(.*?)>(.*?[^]+)<\/pre>/g,'<pre$1><code>$2</code></pre>')

	return data
}
type Props = {
	id: number
}

type UnitContentProps = {
	rawHtml: string
}

const UnitContent = (props: UnitContentProps) => {
	
	const parsedHtml = parse(props.rawHtml)

	return <>
		<style jsx>{`
		`}</style>
		<div>{parsedHtml}</div>
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
	
	useEffect( () => {
		hljs.configure({languages: ['javascript'], })
	
		hljs.highlightAll()
	}, [content])

	return content;
};

export default UnitBrowser;