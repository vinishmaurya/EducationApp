CREATE TABLE [dbo].[MST_Role] (
    [PK_RoleId]       BIGINT        IDENTITY (1, 1) NOT NULL,
    [RoleName]        NVARCHAR (50) NOT NULL,
    [FK_CategoryId]   BIGINT        NULL,
    [FK_AccountId]    BIGINT        NULL,
    [HomePage]        BIGINT        NULL,
    [IsActive]        BIT           NULL,
    [IsDeleted]       BIT           NULL,
    [CreatedBy]       BIGINT        NULL,
    [CreatedDateTime] DATETIME      NULL,
    [UpdatedBy]       BIGINT        NULL,
    [UpdatedDateTime] DATETIME      NULL,
    [DeletedBy]       BIGINT        NULL,
    [DeletedDateTime] DATETIME      NULL,
    [FK_CustomerId]   BIGINT        NULL,
    [FK_InstallerId]  BIGINT        NULL,
    [FK_DriverId]     BIGINT        NULL,
    [FK_CompanyId]    BIGINT        NULL,
    CONSTRAINT [PK__MST_R__B09F5DC9B50FEDCF] PRIMARY KEY CLUSTERED ([PK_RoleId] ASC) WITH (FILLFACTOR = 90)
);

