CREATE TABLE [ACAD].[MST_Subject] (
    [PK_SubjectId]        INT           IDENTITY (1, 1) NOT NULL,
    [FK_MediumId]         INT           NULL,
    [SubjectName]         VARCHAR (200) NULL,
    [SubjectType]         VARCHAR (200) NULL,
    [SubjectCode]         VARCHAR (200) NULL,
    [BackgroundColorCode] VARCHAR (20)  NULL,
    [SubjectImageUrl]     VARCHAR (500) NULL,
    [IsActive]            BIT           NULL,
    [IsDeleted]           BIT           NULL,
    [CreatedDatetime]     DATETIME      NULL,
    [DeletedDatetime]     DATETIME      NULL,
    [UpdatedDatetime]     DATETIME      NULL,
    [UpdatedBy]           BIGINT        NULL,
    [CreatedBy]           BIGINT        NULL,
    [DeletedBy]           BIGINT        NULL,
    PRIMARY KEY CLUSTERED ([PK_SubjectId] ASC)
);



