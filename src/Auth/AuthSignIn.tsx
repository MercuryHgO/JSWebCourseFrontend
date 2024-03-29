import {FormEvent, ReactNode, useRef, useState} from "react";


const AuthSignIn = () => {
	const [emailFieldMessage,setEmailFieldMessage] = useState<string>('')
	const [passwordFieldMessage, setPasswordFieldMessage] = useState<ReactNode>('')
	const [registerResult, setRegisterResult] = useState<ReactNode>('')
	const formElement = useRef<HTMLFormElement>(null)
	
	function validateEmail(email: string) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email)
	}
	
	function validatePassword(password: string) {
		const minLengthRegex = /^.{6,}$/;
		const digitRegex = /\d/;
		const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
		const uppercaseRegex = /[A-Z]/;
		
		return {
				length: minLengthRegex.test(password),
				digits: digitRegex.test(password),
				alphanumeric: nonAlphanumericRegex.test(password),
				uppercase: uppercaseRegex.test(password)
			}
	}
	
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		
		validateEmail(value) || value === '' ? setEmailFieldMessage('') : setEmailFieldMessage('Enter a valid email!');
	};
	
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		
		const validationResult = validatePassword(value)
		
		const validatedRules: string[] = []
		
		!validationResult.length ? validatedRules.push('Password length must have minimum 6 literals!') : null
		!validationResult.digits ? validatedRules.push('Password must have a digit!') : null
		!validationResult.alphanumeric ? validatedRules.push('Password must have an alphanumeric characters!') : null
		!validationResult.uppercase ? validatedRules.push('Password must have an uppercase letter!') : null
		
		const message = validatedRules.map(
			rule => <p>{rule}</p>
		)
		
		setPasswordFieldMessage(message)
	}
	
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		const formData = new FormData(formElement?.current!)
		
		try {
			const responce = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/register`,{
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					email: formData.get('email'),
					password: formData.get('password'),
				}),
			})
			
			switch (responce.status) {
				case 200:
					
					setRegisterResult('Registered successfully!')
					break;
				default:
					setRegisterResult('Error')
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
                justify-content: space-between;
                margin: 5px;
                background-color: #cccccc;
                padding: 10px;
                border-radius: 15px;
                border: 2px black solid;
              }

              input {
                all: unset;
                font-size: 24px;
                font-weight: 500;
                border: black 1px solid;
                margin-bottom: 15px;
              }

              label {
                margin-top: 15px;
              }
              
              button {
                border: black solid 1px;
                width: auto;
                text-align: center;
                font-size: 24px;
                background-color: #3636ff;
				color: white;
                border-radius: 4px;
                padding: 0 3px 0 3px;
                margin-top: 30px;
              }
              p {
                margin: 0;
              }
			`}</style>
			<form onSubmit={handleSubmit} ref={formElement}>
				<label>Email:</label>
				<input name={'email'} type="email" onChange={handleEmailChange} required/>
				<p>{emailFieldMessage}</p>
				<label>Password:</label>
				<input name={'password'} type="password" onChange={handlePasswordChange} required/>
				<div>{passwordFieldMessage}</div>
				<div>{registerResult}</div>
				<button type="submit">Register</button>
			</form>
		</>	);
};

export default AuthSignIn;