CREATE TABLE [ACAD].[MAP_AssignClassSubject] (
    [PK_MapClassSubjectId] INT      IDENTITY (1, 1) NOT NULL,
    [FK_ClassId]           INT      NULL,
    [FK_SubjectId]         INT      NULL,
    [IsActive]             BIT      NULL,
    [IsDeleted]            BIT      NULL,
    [CreatedDatetime]      DATETIME NULL,
    [DeletedDatetime]      DATETIME NULL,
    [UpdatedDatetime]      DATETIME NULL,
    PRIMARY KEY CLUSTERED ([PK_MapClassSubjectId] ASC)
);

