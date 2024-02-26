import Activity from "../Activities/Activity.tsx";
import React, {useState} from "react";
import Editor from "../Activities/Editor.tsx";

const UnitsEditor = () => {
	const MainActivity = () =>
		<Activity>
			<button onClick={handleAddUnit}>Add unit</button>
		</Activity>
	
	const [currentActivity,setCurrentActivity] = useState<Activity>(MainActivity)
	
	function handleAddUnit() {
		setCurrentActivity(<Editor  onSubmit={(value) => {alert(value)}} onCloseActivity={() => setCurrentActivity(MainActivity)} />)
	}
	
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

export default UnitsEditor;