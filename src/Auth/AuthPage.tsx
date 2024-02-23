import AuthSignIn from "./AuthSignIn.tsx";
import AuthLogIn from "./AuthLogIn.tsx";

const AuthPage = () => {
	return (
		<>
			<style jsx>{`
				div {
				  color: black;
				  display: flex;
				  justify-content: center;
				  height: fit-content;
				}
			`}</style>
			<div>
				<AuthSignIn />
				<AuthLogIn />
			</div>
		</>
	);
};

export default AuthPage;