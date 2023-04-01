CREATE TABLE [ACAD].[MST_Session] (
    [PK_SessionId]    INT          IDENTITY (1, 1) NOT NULL,
    [SessionName]     VARCHAR (20) NULL,
    [StartDate]       VARCHAR (20) NULL,
    [EndDate]         VARCHAR (20) NULL,
    [IsActive]        BIT          NULL,
    [IsDeleted]       BIT          NULL,
    [CreatedDatetime] DATETIME     NULL,
    [DeletedDatetime] DATETIME     NULL,
    [UpdatedDatetime] DATETIME     NULL,
    [CreatedBy]       BIGINT       NULL,
    [UpdatedBy]       BIGINT       NULL,
    [DeletedBy]       BIGINT       NULL,
    PRIMARY KEY CLUSTERED ([PK_SessionId] ASC)
);

