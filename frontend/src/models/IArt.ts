export interface IArt{
    objectId : string,
    primaryImage : string,
    objectName : string,
    title : string,
    country : string,
    artistDisplayName : string,
    period : string,
}

export interface IArtCollection{
    total: number,
	objectIDs: number[]
}