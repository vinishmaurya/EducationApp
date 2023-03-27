CREATE TABLE [ACAD].[MST_StudentCategory] (
    [PK_StuCatId]         INT          IDENTITY (1, 1) NOT NULL,
    [StudentCategoryName] VARCHAR (20) NULL,
    [IsActive]            BIT          NULL,
    [IsDeleted]           BIT          NULL,
    [CreatedDatetime]     DATETIME     NULL,
    [DeletedDatetime]     DATETIME     NULL,
    [UpdatedDatetime]     DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([PK_StuCatId] ASC)
);

