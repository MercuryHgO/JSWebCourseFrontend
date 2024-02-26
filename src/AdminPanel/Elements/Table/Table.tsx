import {Dispatch, ReactNode, SetStateAction} from "react";

export type TableInformation<T extends Record<string, unknown>> = {
	action: 'DELETE' | 'EDIT',
	object: T,
}

type Props<T extends Record<string, unknown>> = {
	objects: T[],
	callbackAction: Dispatch<SetStateAction<TableInformation<T> | undefined>>
}

export function Table<T extends Record<string, unknown>>(props: Props<T> ) {
	
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
            padding-top: 5px;
            padding-bottom: 5px;
          }

          .table-element-header span {
            flex: 1;
          }

          .table-element-menu {
            display: flex;
          }

          .table-element-menu button {
            flex: 1;
            text-align: center;
          }

          .table-button-edit {
            background-color: #ccb086;
            font-weight: 500;
          }

          .table-button-delete {
            background-color: #cc8181;
            font-weight: 500;
          }
		`}</style>
		<div className={'table-container'}>
			{props.objects.map(e => (<>
				<div className={'table-element'}>
					<div className={'table-element-header'}>
						{Object.entries(e).map( ([key,value]) => (
							<span key={key}>{key}: {value as ReactNode}</span>
						))}
					</div>
					<div className={'table-element-menu '}>
						<button className={'table-button-edit'} onClick={() => props?.callbackAction!(() => ({action: 'EDIT', object: e}))}>Редактировать</button>
						<button className={'table-button-delete'} onClick={() => props?.callbackAction!(() => ({action: 'DELETE', object: e}))}>Удалить</button>
					</div>
				</div>
			</>))}
		</div>
	</>
}