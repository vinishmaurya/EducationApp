/*****************************************************************          
Created By:Vinish         
Created Date: 2019-12-10          
Purpose: To Authenticate User And Fetch Its Rights  

EXEC [dbo].[USP_SvcAuthenticateAPIUser]  
@cUserName							 = 'dadmin'       ,
@cPassword							 = 'hii7cvmi4FNzaTlIl5j2kw==' ,
@cLanguage							 = ''			  ,
@cGrantType						   	 = 'Password'	  ,
@cRefreshToken						 = null			  ,
@iRefreshTokenExpiryTimeInDays  	 = 1 			  

SELECT 
 AccessToken					
,ExpiryDatetime				
,TokenGeneratedDatetime		
,RefreshToken				
,RefreshTokenExpiryDatetime
,DATEADD(D,1,CONVERT(DATETIME,TokenGeneratedDatetime,103))
,GETDATE()
FROM [dbo].[MST_User](NOLOCK) WHERE 
UserName = 'dadmin'

*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcAuthenticateAPIUser]          
(  
 @cUserName							nvarchar(100),          
 @cPassword							nvarchar(50),
 @cLanguage							nvarchar(100)='',
 @cGrantType						nvarchar(100)='',
 @cRefreshToken						nvarchar(max)='',
 @iRefreshTokenExpiryTimeInMinutes		BIGINT = 0,
 @cIPAddress						nvarchar(50)=''
)          
AS          
BEGIN TRY
 SET @cRefreshToken = ISNULL(@cRefreshToken,'');
 DECLARE @IsLoggedIn BIT = 0,@iFK_UserId BIGINT = 0;
 IF(UPPER(@cGrantType) <> 'PASSWORD' AND UPPER(@cGrantType) <> 'REFRESHTOKEN')
 BEGIN
	SELECT 0 AS Message_Id,'Invalid grant type, kindly use grant only in (''Password'' or ''RefreshToken'')!' + @cGrantType AS Message ;
	RETURN;
 END
 IF(UPPER(@cGrantType) = 'REFRESHTOKEN' AND @cRefreshToken <> '')
 BEGIN
	SET @cUserName = '';
	SET @cPassword = '';
	SELECT @cUserName = B.UserName,@cPassword = B.UserPassword FROM [dbo].MST_User(NOLOCK) B
	WHERE PK_UserId = 
	(
		SELECT TOP 1 FK_UserId FROM [dbo].MST_UserTokenFamily(NOLOCK) A
		WHERE A.RefreshToken = @cRefreshToken
		AND GETDATE() < DATEADD(M,@iRefreshTokenExpiryTimeInMinutes,CONVERT(DATETIME,A.TokenGeneratedDatetime,103))
		AND A.IPAddress = @cIPAddress
		AND IsActive = 1
		AND IsDeleted = 0
	)
	AND IsnUll(B.IsActive,0) = 1
	AND Isnull(B.IsDeleted,0) = 0

	IF EXISTS          
	(          
	 SELECT 1           
	 FROM  [dbo].[MST_User](NOLOCK)           
	 WHERE           
	 UserName = @cUserName AND           
	 UserPassword = @cPassword          
	 AND Isnull(IsActive,0) = 1 and Isnull(IsDeleted,0) = 0
	)
	BEGIN
		SET @IsLoggedIn = 1;
	END
 END
 ELSE IF(UPPER(@cGrantType) = 'REFRESHTOKEN')
 BEGIN
	SELECT 0 AS Message_Id,'Invalid Refresh Token kindly use grant type ''password''!' AS Message;
	RETURN;
 END
 
 IF(UPPER(@cGrantType) = 'PASSWORD' AND @cUserName <> '' AND @cPassword <> '')
 BEGIN
	IF EXISTS          
	(          
	 SELECT 1           
	 FROM  [dbo].[MST_User](NOLOCK)           
	 WHERE           
	 UserName = @cUserName AND           
	 UserPassword = @cPassword          
	 AND Isnull(IsActive,0) = 1 and Isnull(IsDeleted,0) = 0
	 AND @cRefreshToken = ''
	)
	BEGIN
		SET @IsLoggedIn = 1;
	END
 END
 ELSE IF(UPPER(@cGrantType) = 'PASSWORD')
 BEGIN
	SELECT 0 AS Message_Id,'Username & Password did not match!' AS Message;
	RETURN;
 END
 IF(@IsLoggedIn <> 1)
 BEGIN
	SELECT 0 AS Message_Id,'Authentication failed due to invalid grant type & credentials!' AS Message;
	RETURN;
 END

  DECLARE          
  @iRoleID   BIGINT         ,
   @iUserID   BIGINT=0; 
          
  SELECT           
  @iRoleID  = FK_RoleId  ,
  @iUserID=USR.PK_UserId   
  FROM MST_User(NOLOCK) USR          
  --INNER JOIN MST_Category (NOLOCK)  CTGR ON          
  --USR.FK_CategoryId=CTGR.PK_CategoryId          
  WHERE           
  UserName = @cUserName AND           
  UserPassword = @cPassword          
  AND ISNULL(USR.IsActive,0) = 1 
  and ISNULL(USR.IsDeleted,0) = 0 
  --and ISNULL(CTGR.IsActive,0) = 1  
  AND ISNULL(USR.IsDeleted,0) = 0 
  --and ISNULL(CTGR.IsDeleted,0) = 0    
            
  SELECT 1 AS Message_Id,'Success' AS Message         
  
  /*********************************/
  UPDATE MST_User
  SET LastAPITokenFetchDatetime=GETDATE()
  WHERE PK_UserId=ISNULL(@iUserID,0)
  
END TRY           
BEGIN CATCH           
 SELECT 0 AS Message_Id, ERROR_MESSAGE() + ' Error Line : '+ CONVERT(VARCHAR,ERROR_LINE()) AS Message          
          
 --INSERT INTO [dbo].[ErrorLog_App]           
 --(ErrorTime,Source,Assembly_Name,Class_Name,Method_Name,ErrorMessage,ErrorType,Remarks )          
 --VALUES           
 --(GETDATE(),'[dbo].[usp_AuthenticateUser] Stored Procedure','Authentication DAL','Account','AuthenticateUser',Error_Message(),'Exception In Stored Procedure','Error In Stored Procedure : Logged In Catch Block')          
END CATCH;
