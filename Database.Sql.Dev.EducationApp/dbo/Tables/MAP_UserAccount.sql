CREATE TABLE [dbo].[MAP_UserAccount] (
    [PK_UserAccountId]  BIGINT   IDENTITY (1, 1) NOT NULL,
    [FK_UserId]         BIGINT   NULL,
    [FK_AccountId]      BIGINT   NULL,
    [FK_CategoryId]     BIGINT   NULL,
    [IsCustomerAccount] BIT      NULL,
    [IsActive]          BIT      NULL,
    [IsDeleted]         BIT      NULL,
    [CreatedBy]         BIGINT   NULL,
    [CreatedDateTime]   DATETIME NULL,
    [UpdatedBy]         BIGINT   NULL,
    [UpdatedDateTime]   DATETIME NULL,
    [DeletedBy]         BIGINT   NULL,
    [DeletedDateTime]   DATETIME NULL
);

