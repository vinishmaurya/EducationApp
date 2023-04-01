CREATE TABLE [ACAD].[MST_StudentCategory] (
    [PK_StudentCategoryId] INT          IDENTITY (1, 1) NOT NULL,
    [StudentCategoryName]  VARCHAR (20) NULL,
    [IsActive]             BIT          NULL,
    [IsDeleted]            BIT          NULL,
    [CreatedDatetime]      DATETIME     NULL,
    [DeletedDatetime]      DATETIME     NULL,
    [UpdatedDatetime]      DATETIME     NULL,
    [CreatedBy]            BIGINT       NULL,
    [UpdatedBy]            BIGINT       NULL,
    [DeletedBy]            BIGINT       NULL,
    PRIMARY KEY CLUSTERED ([PK_StudentCategoryId] ASC)
);





