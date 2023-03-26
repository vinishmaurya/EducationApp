CREATE TABLE [dbo].[MST_UserTokenFamily] (
    [FK_UserId]                    BIGINT          NULL,
    [IPAddress]                    NVARCHAR (50)   NULL,
    [Lat]                          DECIMAL (18, 6) NULL,
    [Long]                         DECIMAL (18, 6) NULL,
    [RefreshToken]                 NVARCHAR (MAX)  NULL,
    [RefreshTokenGenerateDateTime] NVARCHAR (MAX)  NULL,
    [AccessToken]                  NVARCHAR (MAX)  NULL,
    [ExpiryDatetime]               NVARCHAR (MAX)  NULL,
    [TokenGeneratedDatetime]       NVARCHAR (MAX)  NULL,
    [RefreshTokenExpiryDatetime]   NVARCHAR (MAX)  NULL,
    [IsActive]                     BIT             NULL,
    [IsDeleted]                    BIT             NULL,
    [UserName]                     VARCHAR (200)   NULL,
    [RevokedBy_UserName]           VARCHAR (200)   NULL,
    [RevokedDatetime]              DATETIME        NULL,
    [Revoked_IPAddress]            VARCHAR (50)    NULL,
    [PK_UserTokenFamilyId]         BIGINT          IDENTITY (1, 1) NOT NULL,
    PRIMARY KEY CLUSTERED ([PK_UserTokenFamilyId] ASC)
);

