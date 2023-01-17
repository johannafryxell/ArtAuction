export interface IArt{
    objectID : string,
    primaryImage : string,
    objectName : string,
    title : string,
    country : string,
    artistDisplayName : string,
    period : string,
    accessionYear  : string,
    artistDisplayBio : string,
}

export interface IArtCollection{
    total: number,
	objectIDs: number[]
}