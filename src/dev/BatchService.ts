import { mockData } from "./mockPfcInfo";
import PFCElementInfo from "./PFCElementInfo";
import PFCRecipe from "./PFCRecipe";

export class BatchService {
    private static data : PFCRecipe[] = [];

    public static initialize() {
        // Fetch data from the server
        const recipeData = mockData.Recipes;

        const recipes: PFCRecipe[] = recipeData.map((recipe: any) => ({
            ID: recipe.ID,
            Name: recipe.Name,
            FileName: recipe.FileName,
            Version: recipe.Version,
            Date: recipe.Date,
            Author: recipe.Author,
            ProductCode: recipe.ProductCode,
            Description: recipe.Description,
            Abstract: recipe.Abstract,
            Type: recipe.Type,
            Binding: recipe.Binding,
            Equipment: recipe.Equipment,
            ValidatedAgainst: recipe.ValidatedAgainst,
            ProductName: recipe.ProductName,
            DefSize: recipe.DefSize,
            MaxSize: recipe.MaxSize,
            MinSize: recipe.MinSize,
            EU: recipe.EU,
            RunLength: recipe.RunLength,
            Released: recipe.Released,
            ApprovedBy: recipe.ApprovedBy,
            AreaModelFile: recipe.AreaModelFile,
            ValidationTime: recipe.ValidationTime,
            Parent: recipe.Parent,
            Elements: recipe.Elements.map((element: PFCElementInfo) => ({
                ID: element.ID,
                Type: element.Type,
                ElemName: element.ElemName,
                Description: element.Description,
                Condition: element.Condition,
                File: element.File,
                PrevID: element.PrevID,
                NextID: element.NextID,
                XPosition: element.XPosition,
                YPosition: element.YPosition,
                Height: element.Height,
                Width: element.Width,
                Acquire: element.Acquire,
                Retain: element.Retain,
                KeyParam: element.KeyParam,
                KeyParamEU: element.KeyParamEU,
                RRtName: element.RRtName,
                RRtPath: element.RRtPath,
                RRtState: element.RRtState,//number;
                RRtMode: element.RRtMode,
                RRtCmdMask: element.RRtCmdMask,
                RRtFailIndex: element.RRtFailIndex,
                RRtStepIndex: element.RRtStepIndex,
                RRtOwner: element.RRtOwner,
                RRtRunCount: element.RRtRunCount,
                RRtValue: element.RRtValue,
                RRtStepInHeld: element.RRtStepInHeld,
                RRtKeyParam: element.RRtKeyParam,
            }))
        }));

        this.data = recipes;
    }

    public static getRecipeById(id: string) {
        return this.data.find(element => element.ID === id);
    }

    public static getAllElements() {
        return this.data;
    }
}