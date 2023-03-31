CREATE TABLE [ACAD].[MST_Class] (
    [PK_ClassId]      INT          IDENTITY (1, 1) NOT NULL,
    [MediumName]      VARCHAR (20) NULL,
    [ClassName]       VARCHAR (20) NULL,
    [FK_SectionId]    INT          NULL,
    [IsActive]        BIT          NULL,
    [IsDeleted]       BIT          NULL,
    [CreatedDatetime] DATETIME     NULL,
    [DeletedDatetime] DATETIME     NULL,
    [UpdatedDatetime] DATETIME     NULL,
    [UpdatedBy]       BIGINT       NULL,
    [CreatedBy]       BIGINT       NULL,
    [DeletedBy]       BIGINT       NULL,
    CONSTRAINT [PK__MST_Clas__CCB736640AF95FDE] PRIMARY KEY CLUSTERED ([PK_ClassId] ASC)
);





