CREATE TABLE [dbo].[MST_MapFormCompany] (
    [PK_FormCompanyId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [FK_FormId]        BIGINT   NULL,
    [FK_CompanyId]     BIGINT   NULL,
    [CanAdd]           BIT      NULL,
    [CanEdit]          BIT      NULL,
    [CanDelete]        BIT      NULL,
    [CanView]          BIT      NULL,
    [IsActive]         BIT      NULL,
    [IsDeleted]        BIT      NULL,
    [CreatedBy]        BIGINT   NULL,
    [CreatedDateTime]  DATETIME NULL,
    [UpdatedBy]        BIGINT   NULL,
    [UpdatedDateTime]  DATETIME NULL,
    [DeletedBy]        BIGINT   NULL,
    [DeletedDateTime]  DATETIME NULL,
    CONSTRAINT [PK__MST_M__BCC642B20C2EB111] PRIMARY KEY CLUSTERED ([PK_FormCompanyId] ASC) WITH (FILLFACTOR = 90)
);

