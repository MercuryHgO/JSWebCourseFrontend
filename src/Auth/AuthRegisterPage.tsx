import AuthSignIn from "./AuthSignIn.tsx";

const AuthLoginPage = () => {
	return (
		<>
			<style jsx>{`
				.authContainer {
				  color: black;
				  display: flex;
				  flex-direction: column;
				  align-items: center;
				  height: fit-content;
				  width: 100%;
				}
				
				a {
				  width: fit-content;
				  color: darkcyan;
				}
				
			`}</style>
			<div className={'authContainer'}>
				<AuthSignIn />
				<a href={'/login'}>Войти в существующий аккаунт</a>
			</div>
		</>
	);
};

export default AuthLoginPage;