import React, {Dispatch, SetStateAction} from "react";

export type TableInformation<T extends Record<string, unknown>> = {
	action: 'DELETE' | 'EDIT',
	object: T,
}

type Props = {
	chapters: T[],
	callbackAction: Dispatch<SetStateAction<TableInformation>>
}

export function Table<T extends Record<string, unknown>>(props: Props ) {
	
	return <>
		<style jsx>{`
          .table-container {
            background-color: #9b9b9b;
          }
          
          .table-element {
            background-color: #cccccc;
            margin-top: 2px;
            margin-bottom: 2px;
          }
          
          .table-element-header {
            display: flex;
          }

          .table-element-header span {
            flex: 1;
          }
          
          
		`}</style>
		<div className={'table-container'}>
			{props.chapters.map(e => (<>
				<div className={'table-element'}>
					<div className={'table-element-header'}>
						{Object.entries(e).map( ([key,value]) => (
							<span key={key}>{key}: {value}</span>
						))}
					</div>
					<div className={'table-element-menu '}>
						<button onClick={props.callbackAction(() => ({action: 'EDIT', object: e}))}>Edit</button>
						<button>Delete</button>
					</div>
				</div>
			</>))}
		</div>
	</>
}