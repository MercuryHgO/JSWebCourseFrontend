import {ReactNode, useEffect, useState} from "react";

type UserEmail = string

async function logOut() {
	try {
		const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/logout`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
		
		if (response.status === 200) {
			window.location.reload()
		}
	} catch (e) {
	
	}
}

async function checkLogin(): Promise<UserEmail|undefined> {
	try {
		const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/manage/info`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
		
		if (response.status === 200) {
			const {email} = await response.json()
			return email
		}
	} catch (e) {
		return
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
							    button {
                                  text-decoration: none;
                                  background-color: #817c7c;
                                  padding: 5px;
                                  margin-left: 10px;
                                  width: fit-content;
                                  text-align: center;
                                  color: #fff;
                                  border-radius: 5px;
							    }
							    
							`}</style>
							<button onClick={async () => { await logOut()}}>Выйти из аккаунта</button>
							
							
						</>)
					} else {
						setOutputElement( () => <>
							<a href={'/login'}>Войти в аккаунт</a>
						</>)
					}
				})
	}, []);
	
	return outputElement
}