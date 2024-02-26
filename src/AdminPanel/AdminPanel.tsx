import {ReactNode, useState} from "react";
import UnitsEditor from "./Elements/UnitsEditor";
import ChapterEditor from "./Elements/ChapterEditor";

type AdminPanelSection = {
	name: string,
	element: ReactNode
}



export function AdminPanel() {
	const [panelSections] = useState<AdminPanelSection[]>([
		{name: "Chapters",element: (<ChapterEditor />)},
		{name: "Units",element: (<UnitsEditor />)},
	])
	
	const [selectedPanelSection,setSelectedPanelSection] = useState<AdminPanelSection>(panelSections[0])
	
	return (<>
		<style jsx>{`
			main {
			  all: unset;
			  background-color: #cccccc;
			  color: black;
			  height: fit-content;
			  width: 85%;
			  display: flex;
              border-radius: 15px;
              box-shadow: black 5px 5px 0 0;
			}
			
			menu {
			  display: flex;
			  flex-direction: column;
			  padding-right: 30px;
			  margin: 0;
			  border-right: 2px grey solid;
			}
			
			button {
			  margin-top: 5px;
              margin-bottom: 5px;
			}
			
			.menu-element {
			  cursor: pointer;
			}
			
			.admin-panel-element-container {
			  background-color: #eeeeee;
			  width: 100%;
              border-radius: 0 15px 15px 0;
			}
		`}</style>
		<main>
			<menu>
			{
				panelSections.map( (s, i) => (
						<button key={i} className={'menu-element'} onClick={() => setSelectedPanelSection(() => s)}>{s.name}</button>
				))
			}
			</menu>
			<div className={'admin-panel-element-container'}>{
				selectedPanelSection?.element
			}</div>
		</main>
	</>);
}