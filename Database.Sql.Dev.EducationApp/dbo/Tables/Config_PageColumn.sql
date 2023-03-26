CREATE TABLE [dbo].[Config_PageColumn] (
    [PK_PageColumnConfigId] BIGINT        IDENTITY (1, 1) NOT NULL,
    [FK_FormColumnId]       BIGINT        NULL,
    [FK_AccountId]          BIGINT        NULL,
    [Column_Name]           NVARCHAR (50) NULL,
    [IsActive]              BIT           NULL,
    [FK_FormId]             BIGINT        NULL,
    [UpdatedBy]             BIGINT        NULL,
    [Updated_DateTime]      DATETIME      NULL,
    [FK_CustomerId]         BIGINT        NULL,
    [icon]                  VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([PK_PageColumnConfigId] ASC) WITH (FILLFACTOR = 90)
);

