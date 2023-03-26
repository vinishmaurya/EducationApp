CREATE TABLE [dbo].[MST_MobileAppStatus] (
    [PK_AppStatus_ID]       INT          IDENTITY (1, 1) NOT NULL,
    [App_Name]              VARCHAR (50) NULL,
    [App_Current_Version]   VARCHAR (30) NULL,
    [AppUpdateCompulsary]   BIT          NULL,
    [UpdateDatetime]        DATETIME     NULL,
    [IsActive]              BIT          NULL,
    [IsUpdateAvailable]     BIT          NULL,
    [ClearAppData]          BIT          NULL,
    [CreatedBy]             INT          NULL,
    [CreatedDatetime]       DATETIME     NULL,
    [RecordUpdatedBy]       INT          NULL,
    [RecordUpdatedDatetime] DATETIME     NULL,
    CONSTRAINT [PK_MST_MobileAppStatus] PRIMARY KEY CLUSTERED ([PK_AppStatus_ID] ASC) WITH (FILLFACTOR = 90)
);

