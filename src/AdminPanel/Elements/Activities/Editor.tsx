import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import Activity, {Headbar} from "./Activity.tsx";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

type Props = {
	onSubmit: (value: string) => void,
	onCloseActivity: Dispatch<SetStateAction<Activity>>,
	initialValue?: string,
	name?: string,
}

const Editor = (props: Props) => {
	const [value, setValue] = useState<string>(props.initialValue ?? '')
	
	
	return (
		<Activity>
			<style jsx>{`
				button {
				  background-color: #cccccc;
				  margin-right: 5px;
                  margin-left: 5px;
				}
			`}</style>
			<div>
				<button onClick={props.onCloseActivity}>X</button>
				<button onClick={() => props.onSubmit(value)}>Submit</button>
			</div>
			<ReactQuill theme={'snow'} value={value} onChange={setValue} />
		</Activity>
	);
};

export default Editor;