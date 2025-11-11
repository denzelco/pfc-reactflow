import type IPFCElementInfo from "./IPFCElementInfo";

interface IPFCRecipe {
    ID: string;
    Name: string;
    FileName: string;
    Version: string;
    Date: string;
    Author: string;
    ProductCode: string;
    Description: string;
    Abstract: string;
    Type: string;
    Binding: number;
    Equipment: string;
    ValidatedAgainst: string;
    ProductName: string;
    DefSize: string;
    MaxSize: string;
    MinSize: string;
    EU: string;
    RunLength: string;
    Released: string;
    ApprovedBy: string;
    AreaModelFile: string;
    ValidationTime: string;
    Parent: string;
    Elements: IPFCElementInfo[];
}

export type { IPFCRecipe as default, IPFCRecipe };