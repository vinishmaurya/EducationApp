﻿/*****************************************************************          
Created By: Vinish         
Created Date: 2022-09-22 12:17:18.940         
Purpose: 
*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcRevokeAllRefreshTokenFamily]
(  
 @cUserName			 NVARCHAR(200),          
 @cIPAddress		 NVARCHAR(50),
 @bIsRevokeAllByUser	 BIT
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
 AND 
 (@bIsRevokeAllByUser = 1)
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
 AND (@bIsRevokeAllByUser = 1)
 BEGIN
	SELECT 0 AS Message_Id,'Failed ? Refresh token was not found!' AS Message ;
	RETURN;
 END
 SELECT 1 AS Message_Id,'Success' AS Message         
 IF(@bIsRevokeAllByUser = 1)
 BEGIN
	UPDATE [dbo].MST_UserTokenFamily 
	SET 
	IsActive	= 0,
	IsDeleted	= 1,
	RevokedDatetime	= GETDATE(),
	RevokedBy_UserName = @cUserName,
	Revoked_IPAddress  = @cIPAddress
	WHERE 
	UserName = @cUserName
	AND IPAddress = @cIPAddress;
 END
 ELSE
 BEGIN IF (@bIsRevokeAllByUser <> 1)
	UPDATE [dbo].MST_UserTokenFamily
	SET 
	IsActive			= 0,
	IsDeleted			= 1,
	RevokedDatetime		= GETDATE(),
	RevokedBy_UserName  = @cUserName,
	Revoked_IPAddress   = @cIPAddress
 END
END TRY           
BEGIN CATCH           
 SELECT 0 AS Message_Id, ERROR_MESSAGE() + ' Error Line : '+ CONVERT(VARCHAR,ERROR_LINE()) AS Message          
          
 --INSERT INTO [dbo].[ErrorLog_App]           
 --(ErrorTime,Source,Assembly_Name,Class_Name,Method_Name,ErrorMessage,ErrorType,Remarks )          
 --VALUES           
 --(GETDATE(),'[dbo].[usp_AuthenticateUser] Stored Procedure','Authentication DAL','Account','AuthenticateUser',Error_Message(),'Exception In Stored Procedure','Error In Stored Procedure : Logged In Catch Block')          
END CATCH;
