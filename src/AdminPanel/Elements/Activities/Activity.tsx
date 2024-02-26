import {ReactNode} from "react";


type Props = {
	children?: ReactNode,
}

export type Activity = ReactNode

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