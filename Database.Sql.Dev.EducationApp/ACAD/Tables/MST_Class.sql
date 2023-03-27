CREATE TABLE [ACAD].[MST_Class] (
    [PK_ClassId]      INT          IDENTITY (1, 1) NOT NULL,
    [MediumName]      VARCHAR (20) NULL,
    [ClassName]       VARCHAR (20) NULL,
    [Section]         VARCHAR (20) NULL,
    [IsActive]        BIT          NULL,
    [IsDeleted]       BIT          NULL,
    [CreatedDatetime] DATETIME     NULL,
    [DeletedDatetime] DATETIME     NULL,
    [UpdatedDatetime] DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([PK_ClassId] ASC)
);

