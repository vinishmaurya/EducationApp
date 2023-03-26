CREATE TABLE [dbo].[MST_Category] (
    [PK_CategoryId]   BIGINT         IDENTITY (1, 1) NOT NULL,
    [CategoryName]    NVARCHAR (150) NULL,
    [FK_CompanyId]    BIGINT         NULL,
    [IsActive]        BIT            NULL,
    [IsDeleted]       BIT            NULL,
    [CreatedBy]       BIGINT         NULL,
    [CreatedDateTime] DATETIME       NULL,
    [UpdatedBy]       BIGINT         NULL,
    [UpdatedDateTime] DATETIME       NULL,
    [DeletedBy]       BIGINT         NULL,
    [DeletedDateTime] DATETIME       NULL,
    PRIMARY KEY CLUSTERED ([PK_CategoryId] ASC)
);

