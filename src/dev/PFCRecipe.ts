import type IPFCRecipe from "./IPFCRecipe";
import type IPFCElementInfo from "./IPFCElementInfo";


class PFCRecipe implements IPFCRecipe {
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


    constructor(
        ID: string,
        Name: string,
        FileName: string,
        Version: string,
        Date: string,
        Author: string,
        ProductCode: string,
        Description: string,
        Abstract: string,
        Type: string,
        Binding: number,
        Equipment: string,
        ValidatedAgainst: string,
        ProductName: string,
        DefSize: string,
        MaxSize: string,
        MinSize: string,
        EU: string,
        RunLength: string,
        Released: string,
        ApprovedBy: string,
        AreaModelFile: string,
        ValidationTime: string,
        Parent: string,
        Elements: IPFCElementInfo[]
    ) {
        this.ID = ID;
        this.Name = Name;
        this.FileName = FileName;
        this.Version = Version;
        this.Date = Date;
        this.Author = Author;
        this.ProductCode = ProductCode;
        this.Description = Description;
        this.Abstract = Abstract;
        this.Type = Type;
        this.Binding = Binding;
        this.Equipment = Equipment;
        this.ValidatedAgainst = ValidatedAgainst;
        this.ProductName = ProductName;
        this.DefSize = DefSize;
        this.MaxSize = MaxSize;
        this.MinSize = MinSize;
        this.EU = EU;
        this.RunLength = RunLength;
        this.Released = Released;
        this.ApprovedBy = ApprovedBy;
        this.AreaModelFile = AreaModelFile;
        this.ValidationTime = ValidationTime;
        this.Parent = Parent;
        this.Elements = Elements;
    }
}

export { PFCRecipe as default, PFCRecipe };