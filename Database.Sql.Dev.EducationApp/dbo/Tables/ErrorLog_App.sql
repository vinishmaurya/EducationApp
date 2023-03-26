CREATE TABLE [dbo].[ErrorLog_App] (
    [ErrorLogId]    BIGINT         IDENTITY (1, 1) NOT NULL,
    [ErrorTime]     DATETIME       NOT NULL,
    [Source]        NVARCHAR (100) NOT NULL,
    [Assembly_Name] NVARCHAR (100) NOT NULL,
    [Class_Name]    NVARCHAR (100) NOT NULL,
    [Method_Name]   NVARCHAR (100) NOT NULL,
    [ErrorMessage]  NVARCHAR (300) NOT NULL,
    [ErrorType]     NVARCHAR (100) NOT NULL,
    [Remarks]       NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK__ErrorLog__D65247C2D0B8C695] PRIMARY KEY CLUSTERED ([ErrorLogId] ASC) WITH (FILLFACTOR = 90)
);

