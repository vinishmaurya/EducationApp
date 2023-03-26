﻿/*****************************************************************          
Created By: Sandeep Kr.          
Created Date: 2019-12-10          
Purpose: To Authenticate User And Fetch Its Rights  
EXEC [dbo].[usp_AuthenticateUser]   'dadmin','0o6ba1MX6fU=', ''       
*******************************************************************/          
CREATE PROCEDURE [dbo].[USP_AuthenticateUser]          
(  

@cUserName    nvarchar(100),          
 @cPassword    nvarchar(50),
 @cLanguage    nvarchar(100)=''   

 --DECLARE        
 --@cUserName    nvarchar(100) ='dadmin',          
 --@cPassword    nvarchar(50)='0o6ba1MX6fU=',
 --@cLanguage    nvarchar(100)='English'          
)          
AS          
BEGIN TRY          
          
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
          
  EXEC [dbo].[usp_GetFormRoleMapping] @iRoleID, @cLanguage          
 END          
          
  ELSE          
   BEGIN          
    SELECT 0 AS Message_Id,'UserId & Password Did Not Match.' AS Message          
   END          
END TRY           
BEGIN CATCH           
 SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message          
          
 --INSERT INTO [dbo].[ErrorLog_App]           
 --(ErrorTime,Source,Assembly_Name,Class_Name,Method_Name,ErrorMessage,ErrorType,Remarks )          
 --VALUES           
 --(GETDATE(),'[dbo].[usp_AuthenticateUser] Stored Procedure','Authentication DAL','Account','AuthenticateUser',Error_Message(),'Exception In Stored Procedure','Error In Stored Procedure : Logged In Catch Block')          
END CATCH;






