/*****************************************************************          
Created By: Vinish         
Created Date: 2022-09-22 12:17:18.940         
Purpose: 
EXEC [dbo].[USP_SvcRevokeRefreshTokenByUser]
@cUserName	= 'dadmin',
@cIPAddress = '::1'
*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcRevokeRefreshTokenByUser]
(  
 @cUserName							nvarchar(200),          
 @cIPAddress						nvarchar(50)
)          
AS          
BEGIN TRY
 
 IF NOT EXISTS          
 (          
  SELECT 1           
  FROM  [dbo].[MST_User](NOLOCK)           
  WHERE           
  UserName = @cUserName         
  AND Isnull(IsActive,0) = 1 and Isnull(IsDeleted,0) = 0
 )
 BEGIN
 	SELECT 0 AS Message_Id,'Failed ? Username is invalid!' AS Message ;
	RETURN;
 END
 ELSE IF NOT EXISTS
 (
	SELECT TOP 1 FK_UserId FROM [dbo].MST_UserTokenFamily(NOLOCK) A
	WHERE A.UserName = @cUserName
	AND A.IPAddress = @cIPAddress
	AND IsActive = 1
	AND IsDeleted = 0
 )
 BEGIN
	SELECT 0 AS Message_Id,'Failed ? Refresh token was not found!' AS Message ;
	RETURN;
 END
 SELECT 1 AS Message_Id,'Success!' AS Message         
 UPDATE [dbo].MST_UserTokenFamily
 SET 
 IsActive			= 0,
 IsDeleted			= 1,
 RevokedDatetime	= GETDATE(),
 RevokedBy_UserName = @cUserName,
 Revoked_IPAddress  = @cIPAddress
 WHERE 
 UserName = @cUserName
 AND IPAddress = @cIPAddress;
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
