import React from "react";

interface TransititonIconProps {
    color: string;
    size: string;
}

const TransitionIcon = ({ color, size }: TransititonIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="50 -900 900 900" fill={color} stroke={color} strokeWidth="50">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
    </svg>
);

export default TransitionIcon;