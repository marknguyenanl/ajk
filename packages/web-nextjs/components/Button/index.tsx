import "./index.css";
// state: active, disable, hover, focus, clicked

interface ButtonProps {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
	className?: string;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	onBlur,
	className,
	disabled,
}: ButtonProps) => {
	return (
		<>
			<button
				className={`whitespace-nowrap btn ${className}`}
				onClick={onClick}
				onBlur={onBlur}
				disabled={disabled}
			>
				{children}
			</button>
		</>
	);
};
export default Button;
