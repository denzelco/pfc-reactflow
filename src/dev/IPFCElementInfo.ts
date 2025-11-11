interface IPFCElementInfo {
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
}

export type { IPFCElementInfo as default, IPFCElementInfo };