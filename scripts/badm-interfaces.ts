/**
 * Created by jimsugg on 5/1/16.
 */
export interface IDmObject
{
    // Properties
    name : string;
    description : string;

    // Methods
    Clone() : IDmObject;
    CopyFrom(source:IDmObject) : void;
    IsEqual(other:IDmObject) : Boolean;
}

export interface IDmMediaObject extends IDmObject
{
    // Properties
    url : string;
    isAvailable : Boolean;  // readonly - replaces FileExists
    isLocal : Boolean;      // readonly
}

export interface IDmPlaylistItem extends IDmObject
{
    // Properties
    id : string;            // GUID

}

export interface IDmMediaPlaylistItem extends IDmPlaylistItem
{
    // Properties
    media : IDmMediaObject;
}

export const enum EventType
{
    MediaEnd,
    Timer
}

export interface IDmTransition extends IDmObject
{
    target: IDmMediaState;
}

export interface IDmEvent extends IDmObject
{
    // type : EventType;
    transitionList : [IDmTransition];
}


export interface IDmMediaState extends IDmObject
{
    // Properties
    id : string;            // GUID
    mediaPlaylistItem :     IDmPlaylistItem;
    mediaHasBrokenLink :    Boolean;   // convenience property
    eventList :             [IDmEvent];
}


export interface IDmPlaylist extends IDmObject
{

}

export interface IDmZonePlaylist extends IDmObject
{
    mediaStates: IDmMediaState[]
}





// export module BADM.Interfaces {
//     export interface IDmObject
//     {
//         // Properties
//         name : string;
//         description : string;
//
//         // Methods
//         Clone() : IDmObject;
//         CopyFrom(source:IDmObject) : void;
//         IsEqual(other:IDmObject) : Boolean;
//     }
//
//     export interface IDmMediaObject extends IDmObject
//     {
//         // Properties
//         url : string;
//         isAvailable : Boolean;  // readonly - replaces FileExists
//         isLocal : Boolean;      // readonly
//     }
//
//     export interface IDmPlaylistItem extends IDmObject
//     {
//         // Properties
//         id : string;            // GUID
//
//     }
//
//     interface IDmMediaPlaylistItem extends IDmPlaylistItem
//     {
//         // Properties
//         media : IDmMediaObject;
//         volume : number;
//     }
//
//     export interface IDmUserVariable extends IDmObject
//     {
//         // Properties
//         name : string;
//         value : string;
//         defaultValue : string;
//     }
//
//     export const enum CompareOperator
//     {
//         Equals,
//         NotEquals,
//         GreaterThan,
//         GreaterThanOrEqual,
//         LessThan,
//         LessThanOrEqual
//     }
//
//     export interface IDmCondition extends IDmObject
//     {
//         // Properties
//         userVariable : IDmUserVariable;
//         compareOperator : CompareOperator;
//         compareValue : string;
//         isTrue : Boolean;
//     }
//
//     export interface IDmTransition extends IDmObject
//     {
//         target: IDmMediaState;
//     }
//
//     export interface IDmConditionalTransition extends IDmTransition
//     {
//         // Properties
//         condition: IDmCondition;
//     }
//
//     export const enum EventType
//     {
//         MediaEnd,
//         Timer
//     }
//
//     export interface IDmEvent extends IDmObject
//     {
//         type : EventType;
//         transitionList : [IDmTransition];
//     }
//
//     export interface IDmTimer
//     {
//         interval : number;
//     }
//
//     export interface IDmTimerEvent extends IDmEvent
//     {
//         timer : IDmTimer;
//     }
//
//     export interface IDmMediaState extends IDmObject
//     {
//         // Properties
//         id : string;            // GUID
//         playlistItem : IDmPlaylistItem;
//         mediaHasBrokenLink : Boolean;   // convenience property
//         eventList : [IDmEvent];
//     }
//
//     export interface IDmPlaylist extends IDmObject
//     {
//
//     }
//
//     export interface IDmZone extends IDmObject
//     {
//
//     }
//
//     export interface IDmSign extends IDmObject
//     {
//
//     }
//
//     export interface IDmExportImportStreamer extends IDmObject
//     {
//         // Methods
//         Write(object : IDmObject) : string;  //need a way to handle error
//         Read(input : string) : IDmObject;    //need a way to handle error
//     }
//
//     export interface IDmExportImport extends IDmObject
//     {
//         // Properties
//         streamer : IDmExportImportStreamer
//
//         // Methods
//         Write(object : IDmObject) : string;
//         Read(input : string) : IDmObject;
//     }
// }