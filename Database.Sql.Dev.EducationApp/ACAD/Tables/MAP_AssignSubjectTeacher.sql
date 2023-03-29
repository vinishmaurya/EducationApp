CREATE TABLE [ACAD].[MAP_AssignSubjectTeacher] (
    [PK_MapSubjectTeacherId] INT      IDENTITY (1, 1) NOT NULL,
    [FK_Subject]             INT      NULL,
    [FK_TeacherId]           INT      NULL,
    [IsActive]               BIT      NULL,
    [IsDeleted]              BIT      NULL,
    [CreatedDatetime]        DATETIME NULL,
    [DeletedDatetime]        DATETIME NULL,
    [UpdatedDatetime]        DATETIME NULL,
    [UpdatedBy]              BIGINT   NULL,
    [CreatedBy]              BIGINT   NULL,
    [DeletedBy]              BIGINT   NULL,
    PRIMARY KEY CLUSTERED ([PK_MapSubjectTeacherId] ASC)
);



