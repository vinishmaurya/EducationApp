CREATE TABLE [dbo].[ErrorLog] (
    [PK_ErrorID]     BIGINT          IDENTITY (1, 1) NOT NULL,
    [ErrorNumber]    BIGINT          NULL,
    [ErrorSeverity]  BIGINT          NULL,
    [ErrorState]     BIGINT          NULL,
    [ErrorProcedure] NVARCHAR (128)  NULL,
    [ErrorLine]      BIGINT          NULL,
    [ErrorMessage]   NVARCHAR (4000) NULL,
    [ErrorDatetime]  DATETIME        CONSTRAINT [DF_ErrorLog_ErrorDatetime] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_ErrorLog] PRIMARY KEY CLUSTERED ([PK_ErrorID] ASC)
);

