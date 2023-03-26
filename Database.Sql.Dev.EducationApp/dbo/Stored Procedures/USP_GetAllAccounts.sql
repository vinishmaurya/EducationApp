/******************************************  
CreatedBy:Vinish
CreatedDate:3-12-2019
purpos:Get Account Details By Optional Conditions

EXEC [dbo].[USP_GetAllAccounts] 0
****************************************************/  
CREATE PROCEDURE [dbo].[USP_GetAllAccounts]
(
	@iFK_ParentAccountId	BIGINT		=0,
	@iFK_UserId             BIGINT=0,  
	@cAccountName			NVARCHAR(50)='',	
	@iFK_CategoryId			BIGINT		=0,
	@cMobileNo				NVARCHAR(50)='',
	@cEmailId				NVARCHAR(50)='',
	@cZipCode				NVARCHAR(50)=''
 )
AS          
BEGIN TRY  
	     SELECT
	        ISNULL(PK_AccountId,0)PK_AccountId,
	        ISNULL(AccountName,'')AccountName,
	        ISNULL(ParentAccountId,0)ParentAccountId
	        --(SELECT   
         --   CONVERT(varchar(50),
         --   STUFF((  
         --   SELECT  DISTINCT ', ' + CONVERT(varchar(50), UMP.FK_AccountId,0) 
         --   FROM map_UserAccount(NOLOCK)UMP  
         --   INNER JOIN dboGyanmitrasMST_Account(NOLOCK)acc  
         --   ON acc.PK_AccountId=UMP.FK_AccountId 
 	       -- WHERE
 	       -- UMP.FK_UserId=@iFK_UserId
         --   FOR XML PATH('')), 1, 1, '')) As AlreadyExist)
	        FROM MST_Account(NOLOCK)  
	        WHERE 
			ISNULL(IsDeleted,0)=0 AND
	        AccountName LIKE '%'+LTRIM(RTRIM(ISNULL(@cAccountName,'')))+'%'
	        AND
	        ISNULL(MobileNo,'') LIKE '%'+LTRIM(RTRIM(ISNULL(@cMobileNo,'')))+'%'
	        AND
	        ISNULL(EmailId,'') LIKE '%'+LTRIM(RTRIM(ISNULL(@cEmailId,'')))+'%'
	        AND
	        ISNULL(ZipCode,'') LIKE '%'+LTRIM(RTRIM(ISNULL(@cZipCode,'')))+'%'
	        AND
	        FK_CategoryId = CASE WHEN @iFK_CategoryId <> 0 THEN @iFK_CategoryId ELSE FK_CategoryId END
	        
	        AND ParentAccountId = CASE WHEN @iFK_ParentAccountId <> 0 THEN @iFK_ParentAccountId ELSE ParentAccountId END 
END TRY          
BEGIN CATCH          
  SELECT 0 [Message_Id], ERROR_MESSAGE() [Message]           
END CATCH



