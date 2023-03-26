CREATE TABLE [dbo].[MST_FormColumn] (
    [PK_FormColumnId] BIGINT        IDENTITY (1, 1) NOT NULL,
    [FK_FormId]       BIGINT        NULL,
    [Form_Name]       NVARCHAR (50) NULL,
    [Column_Name]     NVARCHAR (50) NULL,
    [IsDeleted]       BIT           NULL,
    [DeletedBy]       BIGINT        NULL,
    [CreatedDateTime] DATETIME      NULL,
    [CreatedBy]       BIGINT        NULL,
    [UpdatedDateTime] DATETIME      NULL,
    [UpdatedBy]       BIGINT        NULL,
    [DeletedDateTime] DATETIME      NULL,
    [IsActive]        BIT           NULL,
    [FK_AccountId]    BIGINT        NULL,
    PRIMARY KEY CLUSTERED ([PK_FormColumnId] ASC) WITH (FILLFACTOR = 90)
);

