CREATE TABLE [dbo].[LKP_MobileApps] (
    [PK_MobileApp_Id] INT           IDENTITY (1, 1) NOT NULL,
    [App_Name]        VARCHAR (50)  NULL,
    [OSType]          VARCHAR (50)  NULL,
    [App_Description] VARCHAR (500) NULL,
    [IsActive]        BIT           NULL,
    [IsDeleted]       BIT           NULL,
    CONSTRAINT [PK_LKP_MobileApps] PRIMARY KEY CLUSTERED ([PK_MobileApp_Id] ASC) WITH (FILLFACTOR = 90)
);

