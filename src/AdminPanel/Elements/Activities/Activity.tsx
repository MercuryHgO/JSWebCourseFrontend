import {ReactNode, useContext} from "react";


type Props = {
	children?: ReactNode,
}

const Activity = (props: Props) => {
	
	return (
		<>
			<style jsx>{`
				.activity div {
				  border-radius: inherit;
				}
			`}</style>
			<div className={'activity'}>
				{props.children}
			</div>
		</>
	);
};

export default Activity;