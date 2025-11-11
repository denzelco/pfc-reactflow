import type IPFCRecipe from "./IPFCRecipe";
import type ISLVItem from "./ISLVItem";

class SLVItem implements ISLVItem {
    ID: number;
    Recipe: IPFCRecipe | null | undefined;
    Parent: ISLVItem | null;
    Children: ISLVItem[];

    constructor(id: number, recipe: IPFCRecipe | null | undefined, parent: ISLVItem | null = null) {
        this.ID = id;
        this.Recipe = recipe;
        this.Parent = parent;
        this.Children = [];
    }

    AddChild(child: ISLVItem): void {
        child.Parent = this;
        this.Children.push(child);
    }

    RemoveChild(child: ISLVItem): void {
        const index = this.Children.indexOf(child);
        if (index !== -1) {
            this.Children.splice(index, 1);
            child.Parent = null;
        }
    }

    GetChild(id: number): ISLVItem | undefined {
        return this.Children.find(child => child.ID === id);
    }

    GetAllChildren(): ISLVItem[] {
        return this.Children;
    }

    HasActiveChildren(): boolean {
        if (!this.Recipe) {
            return false;
        }

        return this.Recipe.Elements.some(element => element.RRtState === "Active");
    }

    GetDeepestActiveChild(): ISLVItem | null {
        if (!this.Recipe) {
            return null;
        }
    
        let activeChild: ISLVItem | null = null;
    
        if (this.Recipe.Type === "Procedure" || this.Recipe.Type === "Unit Procedure") {
            for (const element of this.Recipe.Elements) {
                if (element.RRtState === "Running") {
                    const child = this.GetChild(element.ID);
                    if (child) {
                        activeChild = child;
                        break; // Exit the loop early
                    }
                }
            }
        }
    
        if (activeChild) {
            return activeChild.GetDeepestActiveChild(); // Recursively find the deepest active child
        } else {
            return this;
        }
    }
}

export { SLVItem as default, SLVItem };