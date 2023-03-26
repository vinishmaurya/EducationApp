CREATE TABLE [dbo].[ErrorLog_Service] (
    [ErrorLogId]    BIGINT         IDENTITY (1, 1) NOT NULL,
    [ErrorTime]     DATETIME       NOT NULL,
    [Source]        NVARCHAR (100) NOT NULL,
    [Assembly_Name] NVARCHAR (100) NOT NULL,
    [Class_Name]    NVARCHAR (100) NOT NULL,
    [Method_Name]   NVARCHAR (100) NOT NULL,
    [ErrorMessage]  NVARCHAR (MAX) NOT NULL,
    [Remarks]       NVARCHAR (MAX) NOT NULL,
    [ErrorType]     NVARCHAR (250) NULL,
    CONSTRAINT [PK__ErrorLog__D65247C2FB77C137] PRIMARY KEY CLUSTERED ([ErrorLogId] ASC) WITH (FILLFACTOR = 90)
);

