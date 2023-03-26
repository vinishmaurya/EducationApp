CREATE TABLE [dbo].[MAP_FormRole_MobileApp] (
    [PK_FormRoleId]   BIGINT   IDENTITY (1, 1) NOT NULL,
    [FK_FormId]       BIGINT   NULL,
    [FK_RoleId]       BIGINT   NULL,
    [CanAdd]          BIT      NULL,
    [CanEdit]         BIT      NULL,
    [CanDelete]       BIT      NULL,
    [CanView]         BIT      NULL,
    [IsActive]        BIT      NULL,
    [IsDeleted]       BIT      NULL,
    [CreatedBy]       INT      NULL,
    [CreatedDate]     DATETIME NULL,
    [UpdatedBy]       INT      NULL,
    [UpdatedDate]     DATETIME NULL,
    [CanExport]       BIT      NULL,
    [UpdatedDatetime] DATETIME NULL,
    [CreatedDatetime] DATETIME NULL
);

