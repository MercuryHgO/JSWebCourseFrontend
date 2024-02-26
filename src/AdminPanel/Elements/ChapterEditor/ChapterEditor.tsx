import {Dispatch, SetStateAction, useState} from "react";
import Activity from "../Activities/Activity.tsx";

type Props = {
	onSubmit: (value: {title: string, description: string}) => void,
	onCloseActivity: Dispatch<SetStateAction<typeof Activity>>,
	defaultValue?: {title: string, description: string}
}

const ChapterEditor = (props: Props) => {
	
	const [title, setTitle] = useState(props.defaultValue?.title ?? '');
	const [description, setDescription] = useState(props.defaultValue?.description ?? '');
	
	function handleClose(): void {
		// @ts-ignore
		props.onCloseActivity()
    }

	// @ts-ignore
	return (
		<Activity>
			<style jsx>{`
				button {
				  background-color: #cccccc;
				  margin-right: 5px;
                  margin-left: 5px;
				}
				
				form {
				  display: flex;
				  flex-direction: column;
				}
				
				textarea {
				  background-color: #00000000;
				  color: black;
				}
				
                input {
                  background-color: #00000000;
                  color: black;
                }
			`}</style>
			<div>
				<button onClick={handleClose}>X</button>
				<button onClick={() => props.onSubmit({title: title, description: description})}>Submit</button>
			</div>
			<form >
				<label>
					Title:
				</label>
				<input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
				<label>
					Description:
				</label>
				<textarea value={description} onChange={(event) => setDescription(event.target.value)} />
			</form>
		</Activity>
	);
};

export default ChapterEditor;