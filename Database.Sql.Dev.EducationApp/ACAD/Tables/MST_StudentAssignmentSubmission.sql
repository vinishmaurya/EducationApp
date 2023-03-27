CREATE TABLE [ACAD].[MST_StudentAssignmentSubmission] (
    [PK_StuAssignId]         INT           IDENTITY (1, 1) NOT NULL,
    [FK_ClassId]             INT           NULL,
    [FK_StudentId]           INT           NULL,
    [AssignmentFileUrls]     VARCHAR (MAX) NULL,
    [AssignmentStatus]       VARCHAR (20)  NULL,
    [AssignmentRatingPoints] VARCHAR (20)  NULL,
    [AssignmentFeedback]     VARCHAR (500) NULL,
    [IsActive]               BIT           NULL,
    [IsDeleted]              BIT           NULL,
    [CreatedDatetime]        DATETIME      NULL,
    [DeletedDatetime]        DATETIME      NULL,
    [UpdatedDatetime]        DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([PK_StuAssignId] ASC)
);

