import React from "react";

interface TerminationIconProps {
    color: string;
    size: string;
}

const TerminationIcon = ({ color, size }: TerminationIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 -900 1000 900" fill={color} stroke={color} strokeWidth="50">
        <path d="M440-80v-200H240v-120h200v-160H120v-120h320v-200h80v200h320v120H520v160h200v120H520v200h-80Z"/>
    </svg>
);

export default TerminationIcon;