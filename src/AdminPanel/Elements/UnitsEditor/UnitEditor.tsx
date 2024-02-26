import {Dispatch, SetStateAction, useState} from 'react';
import Activity, {Activity as ActivityType} from "../Activities/Activity.tsx";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "highlight.js/styles/monokai-sublime.css"
import {Unit} from "./index.tsx";

type Props = {
	onSubmit: (value: Omit<Unit, "unitId">) => void,
	onCloseActivity: Dispatch<SetStateAction<ActivityType>>,
	defaultValue?: Omit<Unit, "unitId">
}

const UnitEditor = (props: Props) => {
	const [value, setValue] = useState<string>(props.defaultValue?.htmlString ?? '')
	const [title, setTitle] = useState(props.defaultValue?.title ?? '');
	const [description, setDescription] = useState(props.defaultValue?.description ?? '');
	const [chapterId, setChapterId] = useState(props.defaultValue?.chapterId ?? '');
	
	const modules = {
			toolbar: [
				[{'header': [1, 2, false]}],
				['bold', 'italic', 'underline', 'strike', 'code-block'],
				[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
				['link', 'image'],
				['clean']
			],
		}
	
	function handleClose() {
		// @ts-ignore
		props.onCloseActivity()
	}
	
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
				<button onClick={() => props.onSubmit({chapterId: chapterId as number,title: title, description: description, htmlString: value})}>Submit</button>
			</div>
			<form >
				<label>
					Chapter id:
				</label>
				<input type="number" value={chapterId} onChange={(event) => setChapterId(event.target.value)} />
				<label>
					Title:
				</label>
				<input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
				<label>
					Description:
				</label>
				<textarea value={description} onChange={(event) => setDescription(event.target.value)} />
			</form>
			<ReactQuill
				formats={[
					'header',
					'bold', 'italic', 'underline', 'strike', 'code-block',
					'list', 'bullet', 'indent',
					'link', 'image'
				]}
				modules={modules}
				theme={'snow'}
				value={value}
				onChange={setValue}
			/>
		</Activity>
	);
};

export default UnitEditor;