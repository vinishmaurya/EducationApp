CREATE TABLE [ACAD].[MST_StudentParentGuardian] (
    [PK_StuParGuarId] INT           IDENTITY (1, 1) NOT NULL,
    [FK_StudentId]    INT           NULL,
    [ParentType]      VARCHAR (20)  NULL,
    [FirstName]       VARCHAR (20)  NULL,
    [LastName]        VARCHAR (20)  NULL,
    [MobileNo]        VARCHAR (20)  NULL,
    [EmailId]         VARCHAR (50)  NULL,
    [ProfileImage]    VARCHAR (500) NULL,
    [FK_UserId]       INT           NULL,
    [IsActive]        BIT           NULL,
    [IsDeleted]       BIT           NULL,
    [CreatedDatetime] DATETIME      NULL,
    [DeletedDatetime] DATETIME      NULL,
    [UpdatedDatetime] DATETIME      NULL,
    [UpdatedBy]       BIGINT        NULL,
    [CreatedBy]       BIGINT        NULL,
    [DeletedBy]       BIGINT        NULL,
    PRIMARY KEY CLUSTERED ([PK_StuParGuarId] ASC)
);



