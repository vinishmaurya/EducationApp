CREATE TABLE [ACAD].[MAP_AssignStudentClass] (
    [PK_MapStudentClassId] INT      IDENTITY (1, 1) NOT NULL,
    [FK_StudentId]         INT      NULL,
    [FK_ClassId]           INT      NULL,
    [IsActive]             BIT      NULL,
    [IsDeleted]            BIT      NULL,
    [CreatedDatetime]      DATETIME NULL,
    [DeletedDatetime]      DATETIME NULL,
    [UpdatedDatetime]      DATETIME NULL,
    PRIMARY KEY CLUSTERED ([PK_MapStudentClassId] ASC)
);

