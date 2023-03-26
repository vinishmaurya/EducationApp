CREATE TABLE [dbo].[Map_FormLanguage] (
    [PK_FormLanguageId]  BIGINT         IDENTITY (1, 1) NOT NULL,
    [FK_FormId]          BIGINT         NULL,
    [TranslatedFormName] NVARCHAR (100) NULL,
    [FK_LanguageId]      BIGINT         NULL,
    [IsActive]           BIT            CONSTRAINT [df_IsActive] DEFAULT ('0') NULL,
    [IsDeleted]          BIT            CONSTRAINT [df_IsDeleted] DEFAULT ('0') NULL,
    [CreatedBy]          BIGINT         NULL,
    [CreatedDateTime]    DATETIME       NULL,
    [UpdatedBy]          BIGINT         NULL,
    [UpdatedDateTime]    DATETIME       NULL,
    [DeletedBy]          BIGINT         NULL,
    [DeletedDateTime]    DATETIME       NULL,
    [FK_CompanyID]       BIGINT         NULL,
    [FK_AccountID]       BIGINT         NULL,
    [FK_CustomerID]      BIGINT         NULL,
    CONSTRAINT [PK_Map_FormLanguage] PRIMARY KEY CLUSTERED ([PK_FormLanguageId] ASC) WITH (FILLFACTOR = 90)
);

