﻿/*****************************************************************          
Created By: Vinish
Created Date:   2023-02-21 16:30:57.510 
Purpose: To Authenticate User And Fetch Its Rights  

EXEC [dbo].[USP_SvcAuthenticatedAPIUserTokenValidation]  
@cAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc2OTY0Mzg4LCJleHAiOjE2NzY5Njc5ODh9.hA9hghSnf0a00pft1dQ5eAJPD_mh1cAAI1TeQOVM4xk'

*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcAuthenticatedAPIUserTokenValidation]
(
@cAccessToken nvarchar(max)
)
AS          
BEGIN TRY
 DECLARE @cUserName	nvarchar(100),@cPassword nvarchar(50),@cLanguage nvarchar(50) = ''

 SELECT TOP 1
 @cUserName = UserName,        
 @cPassword = UserPassword  
 FROM [dbo].MST_User(NOLOCK) A
 WHERE 
 A.PK_UserId = 
 (
	SELECT TOP 1 B.FK_UserId FROM [dbo].MST_UserTokenFamily(NOLOCK) B
	WHERE B.AccessToken = @cAccessToken 
	AND CONVERT(DATETIME,B.ExpiryDatetime,103) > GETDATE()
 );

 IF(ISNULL(@cUserName,'') = '' OR ISNULL(@cPassword,'') = '')
 BEGIN
	SELECT 0 AS Message_Id,'Unauthorized? Invalid credentials!' AS Message   
	RETURN;
 END
 SELECT 1 AS Message_Id, 'Success' AS Message 
 SELECT TOP 1 B.TokenGeneratedDatetime,B.ExpiryDatetime,B.AccessToken FROM [dbo].MST_UserTokenFamily(NOLOCK) B
 WHERE B.AccessToken = @cAccessToken 
 AND CONVERT(DATETIME,B.ExpiryDatetime,103) > GETDATE()
END TRY           
BEGIN CATCH           
 SELECT 0 AS Message_Id, ERROR_MESSAGE() + ' Error Line : '+ CONVERT(VARCHAR,ERROR_LINE()) AS Message          
          
 --INSERT INTO [dbo].[ErrorLog_App]           
 --(ErrorTime,Source,Assembly_Name,Class_Name,Method_Name,ErrorMessage,ErrorType,Remarks )          
 --VALUES           
 --(GETDATE(),'[dbo].[usp_AuthenticateUser] Stored Procedure','Authentication DAL','Account','AuthenticateUser',Error_Message(),'Exception In Stored Procedure','Error In Stored Procedure : Logged In Catch Block')          
END CATCH;
