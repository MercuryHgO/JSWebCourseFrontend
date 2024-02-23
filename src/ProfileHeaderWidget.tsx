import {ReactNode, useEffect, useState} from "react";

type UserEmail = string

async function checkLogin(): Promise<UserEmail|undefined> {
	const responce = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/manage/info`,{
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include'
	})
	
	if(responce.status === 200) {
		const { email } = await responce.json()
		return email
	}
	
}

export function ProfileHeaderWidget() {
	const [outputElement, setOutputElement] = useState<ReactNode>(null)
	
	
	useEffect(() => {
		checkLogin()
			.then( e => {
					if(e) {
						setOutputElement( () => <>
							<style jsx>{`
							  	div {
								  display: flex;
                                  align-items: center;
							    }
							    
								p {
								  margin: 0;
								  color: white;
								}
							`}</style>
							<div>
								<p>{e}</p>
							</div>
						</>)
					}
				})
	}, []);
	
	return outputElement
}