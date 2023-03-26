CREATE TABLE [dbo].[MST_SearchTerms] (
    [PK_ASTID]           INT           IDENTITY (1, 1) NOT NULL,
    [SearchByValue]      VARCHAR (100) NULL,
    [SearchByText]       VARCHAR (100) NULL,
    [IsActive]           BIT           NULL,
    [IsDeleted]          BIT           NULL,
    [FormCode]           VARCHAR (100) NULL,
    [IsDefaultSelection] BIT           NULL,
    PRIMARY KEY CLUSTERED ([PK_ASTID] ASC)
);

