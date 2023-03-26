CREATE TABLE [dbo].[Map_FormRole] (
    [PK_FormRoleId]   BIGINT        IDENTITY (1, 1) NOT NULL,
    [FK_FormId]       BIGINT        NULL,
    [FK_RoleId]       BIGINT        NULL,
    [CanAdd]          BIT           NULL,
    [CanEdit]         BIT           NULL,
    [CanDelete]       BIT           NULL,
    [CanView]         BIT           NULL,
    [IsActive]        BIT           NULL,
    [IsDeleted]       BIT           NULL,
    [CreatedBy]       BIGINT        NULL,
    [CreatedDateTime] DATETIME      NULL,
    [UpdatedBy]       BIGINT        NULL,
    [UpdatedDateTime] DATETIME      NULL,
    [DeletedBy]       BIGINT        NULL,
    [DeletedDateTime] DATETIME      NULL,
    [InsertionMode]   VARCHAR (200) NULL,
    [CanExport]       BIT           NULL,
    CONSTRAINT [PK__MST_M__2DC2CA694A71FA24] PRIMARY KEY CLUSTERED ([PK_FormRoleId] ASC) WITH (FILLFACTOR = 90)
);

