CREATE TABLE [dbo].[MST_State] (
    [PK_StateId]      BIGINT         IDENTITY (1, 1) NOT NULL,
    [FK_CountryId]    BIGINT         NOT NULL,
    [StateName]       NVARCHAR (100) NOT NULL,
    [IsActive]        BIT            NULL,
    [IsDeleted]       BIT            NULL,
    [CreatedBy]       BIGINT         NULL,
    [CreatedDateTime] DATETIME       NULL,
    [UpdatedBy]       BIGINT         NULL,
    [UpdatedDateTime] DATETIME       NULL,
    [DeletedBy]       BIGINT         NULL,
    [DeletedDateTime] DATETIME       NULL,
    CONSTRAINT [PK__MST_S__B650CB33CE7D908E] PRIMARY KEY CLUSTERED ([PK_StateId] ASC) WITH (FILLFACTOR = 90)
);

