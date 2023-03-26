/******************************************    
CreatedBy:Vinish            
CreatedDate:2023-03-12 12:10:13.510
purpos:Get Role Master  Deatils 
[dbo].[USP_GetRoleDetails]      

EXEC [dbo].[USP_GetRoleDetails] 0,10,1,'','',1,1,'COMPANY',0

****************************************************/  
CREATE PROCEDURE [dbo].[USP_SvcGetRoleDetails]    
(    
  @iPK_RoleId        BIGINT,
  @iRowperPage       BIGINT, 
  @iCurrentPage      BIGINT, 
  @cSearchBy         NVARCHAR(50),    
  @cSearchValue      NVARCHAR(50) ,
  @iFK_AccountId     INT=1,
  @iUserId           INT=1,
  @cLogInType VARCHAR(100)='',
  @iFK_CompanyId BIGINT=0
  )  
AS
BEGIN TRY 
	     SELECT 1 AS Message_Id,'Success' AS Message 
		
         SELECT 
		 ROW_NUMBER() OVER(ORDER BY rol.PK_Roleid DESC) SrNo, 
         ISNULL(rol.PK_Roleid,0)PK_ID,
	     ISNULL(rol.RoleName,'')RoleName,
		 ISNULL(null,'') RoleFor,
		 '' CustomerName,
		 '' CompanyName,
		 ISNULL(rol.FK_CustomerId,0)CustomerId,
		 ISNULL(rol.FK_CompanyId,0)CompanyId,
	     ISNULL(rol.FK_CategoryId,0)CategoryId,
	     ''  CategoryName,
	     ISNULL(rol.FK_AccountId,0)AccountId,
	     ISNULL(acc.AccountName,'')  AccountName,
	     ISNULL(frm.FormName,'')     FormName,
	     ISNULL(rol.IsActive,0)IsActive,
	     CASE WHEN rol.IsActive = 1 THEN 'Active' ELSE 'Inactive' END [Status],
	     ISNULL(FORMAT(rol.CreatedDateTime,'dd/MM/yyyy hh:mm:ss'),'-NA-') CreatedDateTime,
	     ISNULL(rol.HomePage,0)LandingPage,
		 ISNULL(acc.FK_CategoryId,0)AS AccountCategoryId
	      FROM MST_Role(NOLOCK) rol

         LEFT JOIN MST_Account      (NOLOCK)   acc ON rol.FK_AccountId = acc.PK_AccountId AND   Isnull(acc.IsDeleted,0)=0 
	     LEFT JOIN [dbo].[MST_Form] (NOLOCK)   frm ON rol.HomePage = frm.PK_FormId AND  Isnull(frm.IsDeleted,0)=0
		 
	     WHERE 
	     Isnull(rol.IsDeleted,0)=0    
		 
	   AND
	   rol.PK_RoleId  IN (CASE WHEN @iPK_RoleId=0 THEN rol.PK_RoleId ELSE @iPK_RoleId END) 
	   AND
	   ISNULL(rol.RoleName,'') LIKE    
       CASE     
           WHEN       
            (    
             @cSearchBy <> '' AND @cSearchBy = 'RoleName' AND LTRIM(RTRIM(@cSearchValue)) <> ''    
            )     
           THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'     
           ELSE  ISNULL(rol.RoleName,'')   
     END  
	  
	 AND
	   (
			ISNULL(acc.AccountName,'') LIKE    
				CASE     
					WHEN       
					(    
					 @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''    
					)     
				THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'     
			ELSE  ISNULL(acc.AccountName,'')   
			END
		
		)
		    AND
	    ISNULL(frm.FormName,'') LIKE    
         CASE     
           WHEN       
            (    
             @cSearchBy <> '' AND @cSearchBy = 'FormName' AND LTRIM(RTRIM(@cSearchValue)) <> ''    
            )     
           THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'     
           ELSE  ISNULL(frm.FormName,'')   
         END 
		 
	and  
    (            
    (case when CONVERT(CHAR(1),ISNULL(rol.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
    CASE                   
      WHEN                     
       (                  
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
       )                   
      THEN @cSearchValue  
      ELSE  (case when CONVERT(CHAR(1),ISNULL(rol.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
    END            
    )            
  
 and  
 (            
    convert(varchar(10),concat(isnull(month(rol.CreatedDateTime),'0'),isnull(year(rol.CreatedDateTime),'0'))) =    
    CASE 
      WHEN                     
       (     
       @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                  
    )                   
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))  
      ELSE convert(varchar(10),concat(isnull(month(rol.CreatedDateTime),'0'),isnull(year(rol.CreatedDateTime),'0')))  
   END   
 )  
	     ORDER BY rol.CreatedDateTime DESC    
         OFFSET (@iCurrentPage-1)*@iRowperPage ROWS     
         FETCH NEXT @iRowperPage ROWS ONLY 
	     SELECT 
         ISNULL(COUNT (1),0)  AS TotalItem,
         (
	     SELECT 
         ISNULL(SUM (
	     CASE 
	     WHEN YEAR(rol.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(rol.CreatedDateTime)=MONTH(GETDATE()) 
	 	 THEN 1 
	 	 ELSE 0 END),0
	     )
         ) AS TotalCurrentMonth, 
         ISNULL(SUM(CASE WHEN rol.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,
         ISNULL(SUM(CASE WHEN rol.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive  
	     FROM MST_Role(NOLOCK) rol

         LEFT JOIN MST_Account      (NOLOCK)   acc ON rol.FK_AccountId = acc.PK_AccountId AND   Isnull(acc.IsDeleted,0)=0 
	     LEFT JOIN [dbo].[MST_Form] (NOLOCK)   frm ON rol.HomePage = frm.PK_FormId AND  Isnull(frm.IsDeleted,0)=0
		 
	     WHERE 
	     Isnull(rol.IsDeleted,0)=0    
		 
	   AND
	   rol.PK_RoleId  IN (CASE WHEN @iPK_RoleId=0 THEN rol.PK_RoleId ELSE @iPK_RoleId END) 
	   AND
	   ISNULL(rol.RoleName,'') LIKE    
       CASE     
           WHEN       
            (    
             @cSearchBy <> '' AND @cSearchBy = 'RoleName' AND LTRIM(RTRIM(@cSearchValue)) <> ''    
            )     
           THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'     
           ELSE  ISNULL(rol.RoleName,'')   
     END  
	  
	 AND
	   (
			ISNULL(acc.AccountName,'') LIKE    
				CASE     
					WHEN       
					(    
					 @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''    
					)     
				THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'     
			ELSE  ISNULL(acc.AccountName,'')   
			END
		
		)
		    AND
	    ISNULL(frm.FormName,'') LIKE    
         CASE     
           WHEN       
            (    
             @cSearchBy <> '' AND @cSearchBy = 'FormName' AND LTRIM(RTRIM(@cSearchValue)) <> ''    
            )     
           THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'     
           ELSE  ISNULL(frm.FormName,'')   
         END 
		 
	and  
    (            
    (case when CONVERT(CHAR(1),ISNULL(rol.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
    CASE                   
      WHEN                     
       (                  
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
       )                   
      THEN @cSearchValue  
      ELSE  (case when CONVERT(CHAR(1),ISNULL(rol.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
    END            
    )            
  
 and  
 (            
    convert(varchar(10),concat(isnull(month(rol.CreatedDateTime),'0'),isnull(year(rol.CreatedDateTime),'0'))) =                 
    CASE 
      WHEN                     
       (     
       @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                  
    )                   
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))  
      ELSE convert(varchar(10),concat(isnull(month(rol.CreatedDateTime),'0'),isnull(year(rol.CreatedDateTime),'0')))  
    END   
 )
 
 
SELECT
'PK_ID' PK_ID,
'#' SrNo,
'Role Name' RoleName,
'Account Name' AccountName,
'Landing Page' FormName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'ROLE_MASTER'

END TRY
BEGIN CATCH

	SELECT 0 [Message_Id], ERROR_MESSAGE() [Message] 
END CATCH
