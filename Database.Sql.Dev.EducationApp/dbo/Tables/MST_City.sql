CREATE TABLE [dbo].[MST_City] (
    [PK_CityId]       BIGINT         IDENTITY (1, 1) NOT NULL,
    [FK_CountryId]    BIGINT         NOT NULL,
    [FK_StateId]      BIGINT         NOT NULL,
    [CityName]        NVARCHAR (100) NOT NULL,
    [IsActive]        BIT            NULL,
    [IsDeleted]       BIT            NULL,
    [CreatedBy]       BIGINT         NULL,
    [CreatedDateTime] DATETIME       NULL,
    [UpdatedBy]       BIGINT         NULL,
    [UpdatedDateTime] DATETIME       NULL,
    [DeletedBy]       BIGINT         NULL,
    [DeletedDateTime] DATETIME       NULL,
    CONSTRAINT [PK__MST_C__60A2AE21211687C0] PRIMARY KEY CLUSTERED ([PK_CityId] ASC) WITH (FILLFACTOR = 90)
);

