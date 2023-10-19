import Image from "next/image";
import { MouseEventHandler } from "react";

type  Props = {
    title: string;
    type: 'button' | 'submit';
    leftIcon?: string | null;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    isSubmitting?: boolean;
    bgColor?: string;
    textColor?: string;
    
}
const Button = ({title, type, leftIcon, rightIcon, handleClick, isSubmitting, bgColor, textColor} : Props) => {
  return (
    <button
    type={type}
    disabled={isSubmitting}
    // change bgcolor and textColor
    className={`flex justify-center items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:full
    ${textColor || 'text-white'}
    ${isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'}`}
    onClick={handleClick}
    >
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left"/>}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right"/>}

    </button>
  )
}

export default Button