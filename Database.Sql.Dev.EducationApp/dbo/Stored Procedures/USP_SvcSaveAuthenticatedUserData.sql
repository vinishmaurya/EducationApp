/*****************************************************************          
Created By: Vinish
Created Date: 2019-12-10          
Purpose: To Authenticate User And Fetch Its Rights  
EXEC [dbo].[USP_SvcSaveAuthenticatedUserDate]
 @cAccessToken					 = '',
 @cExpiryDatetime				 = '',
 @cTokenGeneratedDatetime		 = '',
 @cRefreshToken					 = '',
 @cRefreshTokenExpiryDatetime	 = '',
 @cUserName						 = '',
 @cIPAddress					 = '',
 @cLat							 = '',
 @cLong							 = ''
*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcSaveAuthenticatedUserData]          
(  
 @cAccessToken					nvarchar(max),          
 @cExpiryDatetime				nvarchar(50),
 @cTokenGeneratedDatetime		nvarchar(50)='',
 @cRefreshToken					nvarchar(max)='',
 @cRefreshTokenExpiryDatetime	nvarchar(50)='',
 @cUserName						nvarchar(50)='',
 @cIPAddress					nvarchar(50)='',
 @cLat							DECIMAL(18,6) = NULL,
 @cLong						    DECIMAL(18,6) = NULL
)          
AS          
BEGIN TRY
	IF EXISTS
	(
		SELECT TOP 1 1 FROM [DBO].MST_User(NOLOCK)
		WHERE UserName = @cUserName 
		AND ISNULL(IsActive,0) = 1 
		AND ISNULL(IsDeleted,0) = 0 
	)
	BEGIN
		DECLARE @iPK_UserId BIGINT = 
		(
			SELECT TOP 1 PK_UserId FROM [DBO].MST_User(NOLOCK)
			WHERE UserName = @cUserName 
			AND ISNULL(IsActive,0) = 1 
			AND ISNULL(IsDeleted,0) = 0 
		);
		IF EXISTS
		(
			SELECT TOP 1 1 FROM [DBO].MST_UserTokenFamily(NOLOCK)
			WHERE FK_UserId = @iPK_UserId 
			AND IPAddress = @cIPAddress
		)
		BEGIN
			UPDATE [DBO].MST_UserTokenFamily
			SET
			AccessToken					 = @cAccessToken				, 	      
			ExpiryDatetime				 = @cExpiryDatetime				, 
			TokenGeneratedDatetime		 = @cTokenGeneratedDatetime		, 
			RefreshTokenGenerateDateTime = @cTokenGeneratedDatetime		,
			RefreshToken				 = @cRefreshToken				, 
			RefreshTokenExpiryDatetime	 = @cRefreshTokenExpiryDatetime ,
			IPAddress					 = @cIPAddress					,
			Lat							 = @cLat						,
			Long						 = @cLong						,
			UserName					 = @cUserName					,
			IsActive					 = 1							,
			IsDeleted					 = 0							,
			RevokedDatetime				 = NULL							,
			RevokedBy_UserName  		 = NULL							,
			Revoked_IPAddress   		 = NULL							
			WHERE FK_UserId = @IPK_UserId
			AND IPAddress = @cIPAddress;
			SELECT 1 AS Message_Id,'Success, Token Details updated into token family!' AS Message; 
		END
		ELSE
		BEGIN
			INSERT INTO [DBO].MST_UserTokenFamily
			(
				AccessToken					,
				ExpiryDatetime				,
				TokenGeneratedDatetime		,
				RefreshTokenGenerateDateTime,
				RefreshToken				,
				RefreshTokenExpiryDatetime	,
				IPAddress					,
				Lat							,
				Long						,
				FK_UserId					,
				IsActive					,
				IsDeleted					,
				UserName
			)
			VALUES
			(
				@cAccessToken				,
				@cExpiryDatetime			,	
				@cTokenGeneratedDatetime	,
				@cTokenGeneratedDatetime	,	
				@cRefreshToken				,
				@cRefreshTokenExpiryDatetime, 
				@cIPAddress					,
				@cLat						,
				@cLong						,
				@iPK_UserId					,
				1							,
				0							,
				@cUserName
			);
			SELECT 1 AS Message_Id,'Success, Token Details added into token family!' AS Message; 
		END
		
	END
	ELSE
	BEGIN
		SELECT 0 AS Message_Id,'Invalid User!' AS Message;
	END
END TRY           
BEGIN CATCH                 
	INSERT INTO ErrorLog 
	(
		 [ErrorNumber]
		,[ErrorSeverity]
		,[ErrorState]
		,[ErrorProcedure]
		,[ErrorLine]
		,[ErrorMessage]
		,[ErrorDatetime]
	)
	VALUES
	(
		ERROR_NUMBER(),
		ERROR_SEVERITY(),
		ERROR_STATE(),
		ERROR_PROCEDURE(),
		ERROR_LINE(),
		ERROR_MESSAGE(),
		GETDATE()
	)
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;

