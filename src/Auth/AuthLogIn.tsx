import {FormEvent, ReactNode, useRef, useState} from "react";

const AuthLogIn = () => {
	// const [emailFieldMessage,setEmailFieldMessage] = useState<string>('')
	// const [passwordFieldMessage, setPasswordFieldMessage] = useState<ReactNode>('')
	const [registerResult, setRegisterResult] = useState<ReactNode>('')
	const formElement = useRef<HTMLFormElement>(null)
	
	// function validateEmail(email: string) {
	// 	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	// 	return emailRegex.test(email)
	// }
	//
	// function validatePassword(password: string) {
	// 	const minLengthRegex = /^.{6,}$/;
	// 	const digitRegex = /\d/;
	// 	const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
	// 	const uppercaseRegex = /[A-Z]/;
	//
	// 	return {
	// 		length: minLengthRegex.test(password),
	// 		digits: digitRegex.test(password),
	// 		alphanumeric: nonAlphanumericRegex.test(password),
	// 		uppercase: uppercaseRegex.test(password)
	// 	}
	// }
	
	// const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { value } = event.target;
	//
	// 	validateEmail(value) || value === '' ? setEmailFieldMessage('') : setEmailFieldMessage('Enter a valid email!');
	// };
	
	// const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { value } = event.target;
	//
	// 	const validationResult = validatePassword(value)
	//
	// 	const validatedRules: string[] = []
	//
	// 	!validationResult.length ? validatedRules.push('Password length must have minimum 6 literals!') : null
	// 	!validationResult.digits ? validatedRules.push('Password must have a digit!') : null
	// 	!validationResult.alphanumeric ? validatedRules.push('Password must have an alphanumeric characters!') : null
	// 	!validationResult.uppercase ? validatedRules.push('Password must have an uppercase letter!') : null
	//
	// 	const message = validatedRules.map(
	// 		rule => <p>{rule}</p>
	// 	)
	//
	// 	setPasswordFieldMessage(message)
	// }
	
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		const formData = new FormData(formElement?.current!)
		
		try {
			const responce = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/login?useCookies=true`,{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'accept': 'application/json'
				},
				body: JSON.stringify({
					email: formData.get('email'),
					password: formData.get('password'),
				}),
				credentials: 'include'
			})
			
			switch (responce.status) {
				case 200:
					console.log(responce.headers.getSetCookie())
					setRegisterResult('Logged in successfully!')
					break;
				default:
					setRegisterResult('Wrong password or login')
					break;
			}
			
		} catch (error) {
			console.error(error);
		}
	};
	
	return (
		<>
			<style jsx>{`
				form {
				  display: flex;
				  flex-direction: column;
				  margin: 5px;
				}
				input {
				  all: unset;
				  border: black 1px solid;
				}
				button {
				  border: black solid 1px;
				  width: fit-content;
				  border-radius: 4px;
				  padding: 0 3px 0 3px;
				}
			`}</style>
			<form onSubmit={handleSubmit} ref={formElement}>
				<label>Email:</label>
				<input name={'email'} type="email"  required/>
				{/*<p>{emailFieldMessage}</p>*/}
				<label>Password:</label>
				<input name={'password'} type="password"  required/>
				{/*<div>{passwordFieldMessage}</div>*/}
				<button type="submit">Login</button>
				<div>{registerResult}</div>
			</form>
		</>	);
};

export default AuthLogIn;