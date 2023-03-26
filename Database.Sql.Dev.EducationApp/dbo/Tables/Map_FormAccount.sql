CREATE TABLE [dbo].[Map_FormAccount] (
    [PK_FormAccountId]  BIGINT        IDENTITY (1, 1) NOT NULL,
    [FK_FormId]         BIGINT        NULL,
    [FK_AccountId]      BIGINT        NULL,
    [FK_CategoryId]     BIGINT        NULL,
    [IsCustomerAccount] BIT           NULL,
    [IsActive]          BIT           NULL,
    [IsDeleted]         BIT           NULL,
    [CreatedBy]         BIGINT        NULL,
    [CreatedDateTime]   DATETIME      NULL,
    [UpdatedBy]         BIGINT        NULL,
    [UpdatedDateTime]   DATETIME      NULL,
    [DeletedBy]         BIGINT        NULL,
    [DeletedDateTime]   DATETIME      NULL,
    [FK_CustomerId]     BIGINT        NULL,
    [InsertionMode]     VARCHAR (200) NULL,
    [CanAdd]            BIT           NULL,
    [CanEdit]           BIT           NULL,
    [CanDelete]         BIT           NULL,
    [CanView]           BIT           NULL,
    [CanExport]         BIT           NULL,
    CONSTRAINT [PK_Map_FormAccount] PRIMARY KEY CLUSTERED ([PK_FormAccountId] ASC) WITH (FILLFACTOR = 90)
);

