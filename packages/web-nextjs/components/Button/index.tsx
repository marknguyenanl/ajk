import "./index.css";
// state: active, disable, hover, focus, clicked

interface ButtonProps {
	children: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
}: ButtonProps) => {
	return (
		<>
			<button
				className={`whitespace-nowrap btn btn-focus btn-hover btn-active ${className}`}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	);
};
export default Button;
