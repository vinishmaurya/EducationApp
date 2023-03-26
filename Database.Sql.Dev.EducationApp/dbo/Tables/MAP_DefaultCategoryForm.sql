CREATE TABLE [dbo].[MAP_DefaultCategoryForm] (
    [PK_DefaultCateFormId] BIGINT IDENTITY (1, 1) NOT NULL,
    [FK_CategoryId]        INT    NULL,
    [FK_FormId]            INT    NULL,
    [IsActive]             BIT    NULL,
    CONSTRAINT [PK_MAP_DefaultCategoryForm] PRIMARY KEY CLUSTERED ([PK_DefaultCateFormId] ASC)
);

