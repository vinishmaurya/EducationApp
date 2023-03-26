CREATE TABLE [dbo].[MST_Country] (
    [PK_CountryId]    BIGINT         IDENTITY (1, 1) NOT NULL,
    [CountryName]     NVARCHAR (100) NOT NULL,
    [IsActive]        BIT            NULL,
    [IsDeleted]       BIT            NULL,
    [CreatedBy]       BIGINT         NULL,
    [CreatedDateTime] DATETIME       NULL,
    [UpdatedBy]       BIGINT         NULL,
    [UpdatedDateTime] DATETIME       NULL,
    [DeletedBy]       BIGINT         NULL,
    [DeletedDateTime] DATETIME       NULL,
    [TimeZone]        VARCHAR (10)   NULL,
    CONSTRAINT [PK__MST_C__0A4C9D57EDE917B5] PRIMARY KEY CLUSTERED ([PK_CountryId] ASC) WITH (FILLFACTOR = 90)
);

