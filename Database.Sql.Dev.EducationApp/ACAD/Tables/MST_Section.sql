CREATE TABLE [ACAD].[MST_Section] (
    [PK_SectionId]    INT          IDENTITY (1, 1) NOT NULL,
    [SectionName]     VARCHAR (20) NULL,
    [IsActive]        BIT          NULL,
    [IsDeleted]       BIT          NULL,
    [CreatedDatetime] DATETIME     NULL,
    [DeletedDatetime] DATETIME     NULL,
    [UpdatedDatetime] DATETIME     NULL,
    [CreatedBy]       BIGINT       NULL,
    [UpdatedBy]       BIGINT       NULL,
    [DeletedBy]       BIGINT       NULL,
    PRIMARY KEY CLUSTERED ([PK_SectionId] ASC)
);

