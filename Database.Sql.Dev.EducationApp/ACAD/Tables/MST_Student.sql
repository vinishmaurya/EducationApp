﻿CREATE TABLE [ACAD].[MST_Student] (
    [PK_StudentId]         INT           IDENTITY (1, 1) NOT NULL,
    [FirstName]            VARCHAR (20)  NULL,
    [LastName]             VARCHAR (20)  NULL,
    [MobileNo]             VARCHAR (20)  NULL,
    [EmailId]              VARCHAR (50)  NULL,
    [Gender]               VARCHAR (10)  NULL,
    [ProfileImage]         VARCHAR (500) NULL,
    [DOB]                  VARCHAR (20)  NULL,
    [Section]              VARCHAR (20)  NULL,
    [FK_StudentCategoryId] INT           NULL,
    [AdmissionNo]          VARCHAR (20)  NULL,
    [RollNumber]           VARCHAR (20)  NULL,
    [Caste]                VARCHAR (20)  NULL,
    [Religion]             VARCHAR (20)  NULL,
    [AdmissionDatetime]    DATETIME      NULL,
    [BloodGroup]           VARCHAR (20)  NULL,
    [Height]               VARCHAR (20)  NULL,
    [Weight]               VARCHAR (20)  NULL,
    [FK_CountryId]         INT           NULL,
    [FK_StateId]           INT           NULL,
    [FK_CityId]            INT           NULL,
    [Pincode]              VARCHAR (10)  NULL,
    [CurrentAddress]       VARCHAR (500) NULL,
    [PermanentAddress]     VARCHAR (500) NULL,
    [FK_UserId]            INT           NULL,
    [IsActive]             BIT           NULL,
    [IsDeleted]            BIT           NULL,
    [CreatedDatetime]      DATETIME      NULL,
    [DeletedDatetime]      DATETIME      NULL,
    [UpdatedDatetime]      DATETIME      NULL,
    [UpdatedBy]            BIGINT        NULL,
    [CreatedBy]            BIGINT        NULL,
    [DeletedBy]            BIGINT        NULL,
    PRIMARY KEY CLUSTERED ([PK_StudentId] ASC)
);





