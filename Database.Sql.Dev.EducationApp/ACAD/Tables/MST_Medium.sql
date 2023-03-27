CREATE TABLE [ACAD].[MST_Medium] (
    [PK_MediumId]     INT          IDENTITY (1, 1) NOT NULL,
    [MediumName]      VARCHAR (20) NULL,
    [IsActive]        BIT          NULL,
    [IsDeleted]       BIT          NULL,
    [CreatedDatetime] DATETIME     NULL,
    [DeletedDatetime] DATETIME     NULL,
    [UpdatedDatetime] DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([PK_MediumId] ASC)
);

