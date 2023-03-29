CREATE TABLE [ACAD].[MAP_AssignClassTeacher] (
    [PK_MapStudentClassId] INT      IDENTITY (1, 1) NOT NULL,
    [FK_ClassId]           INT      NULL,
    [FK_TeacherId]         INT      NULL,
    [IsActive]             BIT      NULL,
    [IsDeleted]            BIT      NULL,
    [CreatedDatetime]      DATETIME NULL,
    [DeletedDatetime]      DATETIME NULL,
    [UpdatedDatetime]      DATETIME NULL,
    [UpdatedBy]            BIGINT   NULL,
    [CreatedBy]            BIGINT   NULL,
    [DeletedBy]            BIGINT   NULL,
    PRIMARY KEY CLUSTERED ([PK_MapStudentClassId] ASC)
);



