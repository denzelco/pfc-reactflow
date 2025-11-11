import type IPFCRecipe from "./IPFCRecipe";

interface ISLVItem {
    ID: number;
    Recipe: IPFCRecipe | null | undefined;
    Parent: ISLVItem | null;
    Children: ISLVItem[];

    AddChild(child: ISLVItem): void;
    RemoveChild(child: ISLVItem): void;
    GetChild(id: number): ISLVItem | undefined;
    GetAllChildren(): ISLVItem[];
    HasActiveChildren(): boolean;
    GetDeepestActiveChild(): ISLVItem | null;
}

export type { ISLVItem as default, ISLVItem };