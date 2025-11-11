import type IPFCElementInfo from "./IPFCElementInfo";

class PFCElementInfo implements IPFCElementInfo {
    ID: number;
    Type: string; //number;
    ElemName: string;
    Description: string;
    Condition: string;
    File: string;
    PrevID: number;
    NextID: number;
    XPosition: number;
    YPosition: number;
    Height: number;
    Width: number;
    Acquire: boolean;
    Retain: boolean;
    KeyParam: string;
    KeyParamEU: string;

    RRtName: string;
    RRtPath: string;
    RRtState: string; //number;
    RRtMode: number;
    RRtCmdMask: number;
    RRtFailIndex: number;
    RRtStepIndex: number;
    RRtOwner: number;
    RRtRunCount: number;
    RRtValue: string;
    RRtStepInHeld: boolean;
    RRtKeyParam: number;

    constructor(
        ID: number = 0,
        Type: string = "", //number = 0,
        ElemName: string = "",
        Description: string = "",
        Condition: string = "",
        File: string = "",
        PrevID: number = 0,
        NextID: number = 0,
        XPosition: number = 0,
        YPosition: number = 0,
        Height: number = 0,
        Width: number = 0,
        Acquire: boolean = false,
        Retain: boolean = false,
        KeyParam: string = "",
        KeyParamEU: string = "",
        RRtName: string = "",
        RRtPath: string = "",
        RRtState: string = "", //number = 0,
        RRtMode: number = 0,
        RRtCmdMask: number = 0,
        RRtFailIndex: number = 0,
        RRtStepIndex: number = 0,
        RRtOwner: number = 0,
        RRtRunCount: number = 0,
        RRtValue: string = "",
        RRtStepInHeld: boolean = false,
        RRtKeyParam: number = 0
    ) {
        this.ID = ID;
        this.Type = Type;
        this.ElemName = ElemName;
        this.Description = Description;
        this.Condition = Condition;
        this.File = File;
        this.PrevID = PrevID;
        this.NextID = NextID;
        this.XPosition = XPosition;
        this.YPosition = YPosition;
        this.Height = Height;
        this.Width = Width;
        this.Acquire = Acquire;
        this.Retain = Retain;
        this.KeyParam = KeyParam;
        this.KeyParamEU = KeyParamEU;
        this.RRtName = RRtName;
        this.RRtPath = RRtPath;
        this.RRtState = RRtState;
        this.RRtMode = RRtMode;
        this.RRtCmdMask = RRtCmdMask;
        this.RRtFailIndex = RRtFailIndex;
        this.RRtStepIndex = RRtStepIndex;
        this.RRtOwner = RRtOwner;
        this.RRtRunCount = RRtRunCount;
        this.RRtValue = RRtValue;
        this.RRtStepInHeld = RRtStepInHeld;
        this.RRtKeyParam = RRtKeyParam;
    }
}

export { PFCElementInfo as default, PFCElementInfo };