import React from 'react';

type ButtonProps = {
  text: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string | number;
  padding?: string;
  margin?: string;
  borderRadius?: string | number;
  boxShadow?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  hoverBoxShadow?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  color = '#fff',
  backgroundColor = '#007BFF',
  fontSize = '1rem',
  padding = '0.5em 1.2em',
  margin,
  borderRadius = 6,
  boxShadow,
  hoverColor,
  hoverBackgroundColor,
  hoverBoxShadow,
  onClick,
  style,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle: React.CSSProperties = {
    color: isHovered && hoverColor ? hoverColor : color,
    backgroundColor: isHovered && hoverBackgroundColor ? hoverBackgroundColor : backgroundColor,
    fontSize,
    padding,
    margin,
    borderRadius,
    boxShadow: isHovered && hoverBoxShadow ? hoverBoxShadow : boxShadow,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s',
    ...style,
  };

  return (
  <button 
    style={buttonStyle}
    onClick={disabled ? undefined : onClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
