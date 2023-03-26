/*****************************************************************          
Created By: Vinish        
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

EXEC [dbo].[USP_SvcAuthenticatedAPIUserInfo]  
@cAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc4MTI3NDg2LCJleHAiOjE2NzgxMzEwODZ9.JBN5aPgXulHusCZkcMdZtj6P3ZJS_LV-YshxwehEbhQ'

*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcAuthenticatedAPIUserInfo]    
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



 IF  EXISTS          
 (          
  SELECT 1           
  FROM  [dbo].[MST_User](NOLOCK)           
  WHERE           
  UserName = @cUserName AND           
  UserPassword = @cPassword          
  AND Isnull(IsActive,0) = 1 and Isnull(IsDeleted,0) = 0
 )          
 BEGIN          
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
  SET LastWebLogInDatetime=GETDATE()
  WHERE PK_UserId=ISNULL(@iUserID,0)
  /*Select User Details*/          
  SELECT            
  Usr.[PK_UserId]  'UserId',          
  ISNULL(Usr.UserName,'')UserName,  
  ISNULL(Usr.UserPassword,'')UserPassword,      
  ISNULL(Usr.[FullName],'') 'Name',          
  Usr.[FK_RoleId]  'RoleId',  
  Usr.EmailId ,          
  Rol.RoleName 'RoleName',            
  Usr.FK_AccountId   FK_AccountId,             
  acc.AccountName AccountName,          
  Usr.FK_CustomerId,          
  --ISNULL(cust.CustomerName,'')CustomerName,          
  Usr.FK_CategoryId FK_CategoryId,           
  --cat.CategoryName CategoryName,             
  Usr.[FK_CityId]  'CityId',          
  City.[CityName],          
  City.[FK_StateId]    'StateId' ,          
  State.[StateName],          
  Country.[PK_CountryId] 'CountryId',          
  Country.[CountryName],            
  ISNULL(acc.AccountLogo,'') logoClass,        
  'COMPANY'  AS LoginType,        
  ISNULL(acc.FK_ResellerId ,0) FK_ResellerId,          
  ISNULL(acc.FK_AffiliateId,0) FK_AffiliateId          
  FROM  [dbo].[MST_User](NOLOCK) Usr          
  INNER JOIN MST_Role(NOLOCK) Rol ON Rol.PK_RoleId=Usr.FK_RoleId          
  LEFT JOIN [dbo].[MST_City](NOLOCK) City ON Usr.FK_CityId=[PK_CityId]           
  LEFT JOIN [dbo].[MST_State](NOLOCK) State ON City.[FK_StateId]=State.[PK_StateId]          
  LEFT JOIN [dbo].[MST_Country] Country ON Country.[PK_CountryId]=state.[FK_CountryId]          
  INNER JOIN [MST_Account](NOLOCK) acc ON Rol.FK_AccountId=acc.PK_AccountId                  
  WHERE Usr.UserName = @cUserName  AND Usr.UserPassword = @cPassword    
  AND ISNULL(Usr.IsActive,0) = 1 and ISNULL(Usr.IsDeleted,0) = 0
  /*Select Form Role Mapping*/
  IF(ISNULL(@cLanguage,'')<> '' AND LTRIM(RTRIM(ISNULL(@cLanguage,'')))<>'' AND UPPER(LTRIM(RTRIM(ISNULL(@cLanguage,''))))<>'ENGLISH')
	BEGIN
		SELECT
		 ISNULL(PK_FormId,0)PK_FormId
		,ISNULL(form.FK_ParentId,0) ParentId
		,ISNULL(form.FK_SolutionId,0)FK_SolutionId
		,ISNULL(RoleName,'')RoleName
		,ISNULL(ControllerName,'')ControllerName	
		,ISNULL(ActionName,'')ActionName		
		,ISNULL(LevelId,0)LevelId
		,ISNULL(FK_MainId,0) MainId
		,ISNULL(SortId,0)	SortId
		,IsNULL([Image],'') [Image]
		,IsNULL(CanAdd	,0)CanAdd
		,IsNULL(CanEdit,0)CanEdit	
		,IsNULL(CanDelete,0)CanDelete	
		,IsNULL(CanView,0)CanView
		,IsNULL(ClassName,'') ClassName
		,ISNULL(frole.HomePage,0) HomePage
		,ISNULL(form.Area,'') Area
		,ISNULL(lkplang.LanguageFullName,0) LanguageFullName
		 FROM MAP_FormRole  (NOLOCK) map
		 INNER JOIN MST_Form(NOLOCK) form  on form.PK_FormId=map.FK_FormId
		 INNER JOIN MST_Role(NOLOCK) frole on map.FK_RoleId=frole.PK_RoleId
		 LEFT JOIN [dbo].[Map_FormLanguage](NOLOCK) mapFormLang ON form.PK_FormId = mapFormLang.FK_FormId
	     LEFT JOIN LKP_Language(NOLOCK)  lkplang ON  mapFormLang.FK_LanguageId=lkplang.PK_LanguageId
		 WHERE map.CanView=1  and  map.FK_RoleId=@iRoleId and  ISNULL(form.IsDeleted,0)=0
		 AND ISNULL(lkplang.[LanguageFullName],'')  = @cLanguage	
		 ORDER BY FormName
	END
	ELSE
	BEGIN
		 SELECT
		 DISTINCT
		 form.FormName FormName
		,PK_FormId
		,ISNULL(form.FK_ParentId,0) ParentId
	    ,ISNULL(form.FK_SolutionId,0)FK_SolutionId
		,ISNULL(RoleName,''	)RoleName	
		,ISNULL(ControllerName,'')ControllerName
		,ISNULL(ActionName,'')ActionName		
		,ISNULL(LevelId,0)LevelId
		,ISNULL(FK_MainId,0) MainId
		,ISNULL(SortId,0)SortId	 
		,IsNULL([Image],'') [Image]
	    ,IsNULL(CanAdd	,0)CanAdd
		,IsNULL(CanEdit,0)CanEdit	
		,IsNULL(CanDelete,0)CanDelete	
		,IsNULL(CanView,0)CanView
		,IsNULL(ClassName,'') ClassName
		,ISNULL(frole.HomePage,0) HomePage
		,ISNULL(form.Area,'') Area
		,'English' LanguageFullName
		,ISNULL(form.SPA_ComponentHref,'') SPA_ComponentHref
		FROM MAP_FormRole  (NOLOCK) map
		INNER JOIN MST_Form(NOLOCK) form  on form.PK_FormId=map.FK_FormId
		INNER JOIN MST_Role(NOLOCK) frole on map.FK_RoleId=frole.PK_RoleId		
		WHERE map.CanView=1  and  map.FK_RoleId=@iRoleId and ISNULL(form.IsDeleted,0)=0
		ORDER BY SortId
	END
 END          
          
  ELSE          
   BEGIN          
    SELECT 0 AS Message_Id,'UserId & Password Did Not Match.' AS Message          
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

