CREATE TABLE [dbo].[LKP_Language] (
    [PK_LanguageId]       INT            IDENTITY (1, 1) NOT NULL,
    [LanguageFullName]    NVARCHAR (100) NULL,
    [LanguageCultureName] NVARCHAR (30)  NULL,
    [LanguageIcon]        NVARCHAR (30)  NULL
);

