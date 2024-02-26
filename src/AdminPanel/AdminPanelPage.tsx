import {ReactNode, useEffect, useState} from "react";
import {AdminPanel} from "./AdminPanel.tsx";

type AdminState = boolean
async function adminCheck(): Promise<AdminState> {
	const responce = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/Admin/get/isAdmin`,{
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include'
	})
	
	if(responce.status === 200) {
		const {isAdmin} = await responce.json()
		return  isAdmin
	}
	
	return false
}

const AdminPanelPage = () => {
	const [outputElement,setOutputElement] = useState<ReactNode>()
	
	
	useEffect(() => {
		adminCheck()
			.then( isAdmin => {
				if(!isAdmin) setOutputElement(() => (<>
					<style jsx>{`
						p {
						  color: black;
						}
					`}</style>
					<p>You are not an admin</p>
				</>) )
				
				if(isAdmin) setOutputElement( () => <AdminPanel />)
			})
		
	}, []);
	
	
	return outputElement
};

export default AdminPanelPage;