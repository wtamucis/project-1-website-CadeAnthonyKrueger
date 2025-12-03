import './Button.scss'

interface ButtonProps {
    text: string;
    buttonStyle?: string;
    height?: string;
    width?: string;
    margin?: string;
    onClick?: (() => void) | (() => undefined);
    type?: "button" | "submit" | "reset" | undefined;
    iconPath?: string;
    iconPlacement?: 'left' | 'right';
}

const Button = (
    { text, buttonStyle = 'main', height = 'fit-content', width = 'fit-content', margin = '0px',
    onClick = () => undefined, type = 'button', iconPath, iconPlacement = 'right' } : ButtonProps
) => {

    return (
        <button className={`Button ${buttonStyle}`} style={{ 
            height: height, width: width, margin: margin, flexDirection: iconPlacement == 'right' ? 'row' : 'row-reverse'
        }} onClick={onClick} type={type}>
            <div className='ButtonText'>{text}</div>
            {iconPath && <div className='ButtonIcon' style={{ backgroundImage: `url('/${iconPath}')` }}/>}
        </button>
    );

}

export default Button;