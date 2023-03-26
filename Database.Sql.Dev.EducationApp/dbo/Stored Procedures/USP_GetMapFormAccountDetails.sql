/*****************************************************************                                
Created By: Sandeep Kumar        
Created Date:18-12-2019          
Purpose: Get Form Account Mapping Details                       
EXEC [dbo].[USP_GetMapFormAccountDetails]   0,1,10,1,'',' ',1                        
*******************************************************************/         
CREATE PROCEDURE [dbo].[USP_GetMapFormAccountDetails]                      
(           
    --declare                    
  @iPK_FormAccountId  BIGINT--=0               
 ,@iFK_AccountID     BIGINT--=1                   
 ,@iRowperPage       INT --=10 --=10    --2                    
 ,@iCurrentPage      INT=1--=0    --1                    
 ,@cSearchBy         NVARCHAR(50) --='FormName' --=''--''                        
 ,@cSearchValue      NVARCHAR(50)--='user'--='' --''                    
 ,@iUserid           BIGINT--=1  
 ,@iFK_CustomerId     BIGINT--=1  
 ,@cLoginType      NVARCHAR(50)=''                
)                          
AS                          
BEGIN TRY                    
        SELECT 1 AS Message_Id,'Success' AS Message                    
  SELECT        
  frma.PK_FormAccountId AS PK_FormAccountId,         
  frma.FK_CategoryId AS FK_CategoryId,        
  frma.IsCustomerAccount AS IsCustomerAccount,        
  ISNULL(ct.CategoryName,'') AS CategoryName,        
  frma.FK_AccountId AS FK_AccountId,        
  ISNULL(acc.AccountName,'')AS  AccountName,        
  frma.FK_FormId AS FK_FormId,        
  ISNULL(fm.FormName,'')  AS FormName,        
  frma.IsActive AS IsActive,        
  CASE WHEN frma.IsActive = 1 THEN 'Active' ELSE 'InActive' END AS [Status],        
  FORMAT(frma.CreatedDateTime,'dd/MM/yyyy HH:mm') AS CreatedDateTime        
  FROM Map_FormAccount(NOLOCK) frma        
  LEFT JOIN MST_Category(NOLOCK)   ct  ON frma.FK_CategoryId = ct.PK_CategoryId        
  LEFT JOIN MST_Account(NOLOCK)    acc     ON frma.FK_AccountId = acc.PK_AccountId        
  LEFT JOIN [dbo].[MST_Form] (NOLOCK) fm ON frma.FK_FormId = fm.PK_FormId        
  WHERE 
         PK_FormAccountId= CASE 
                                WHEN @iPK_FormAccountId <> 0 
					        	THEN @iPK_FormAccountId 
					        	ELSE PK_FormAccountId
				            END        
  AND 
  ISNULL(frma.IsDeleted,0)=0
  AND
     1=(
         CASE WHEN @cLoginType='CUSTOMER' AND  @iFK_CustomerId IN (
                                                                       SELECT PK_CustomerId FROM dboGyanmitrasMST_Customer (NOLOCK)
                                                                       WHERE
                                                                       IsActive=1
                                                                       AND PK_CustomerId    = @iFK_CustomerId
                                                                       OR ISNULL(FK_ParentCustomerId,0)    = @iFK_CustomerId
                                                                     )  THEN 1
          WHEN @cLoginType='COMPANY' AND (frma.FK_AccountId IN    
                                                             (    
                                                                 SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA     
                                                                 INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId     
                                                                 WHERE FK_UserId=@iUserId and
                                                                 FMUA.IsActive=1 and FMU.IsActive=1    
                                                                 AND @iFK_AccountId=6    
                                                             )    
                                                             OR     
                                                             ISNULL(frma.FK_AccountId,0) =@iFK_AccountId
                 )  THEN 1
         WHEN @cLoginType='RESELLER' AND frma.FK_AccountId IN(
                                                              SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                       WHERE
                                                                       IsActive=1
                                                                       AND PK_AccountId    = @iFK_AccountId
                                                                       OR ISNULL(FK_ResellerId,0)    = @iFK_AccountId    
                                                             ) THEN 1
         WHEN @cLoginType='AFFILIATE' AND frma.FK_AccountId IN(
                                                              SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                       WHERE
                                                                       IsActive=1
                                                                       AND PK_AccountId    = @iFK_AccountId
                                                                       OR ISNULL(FK_AffiliateId,0)    = @iFK_AccountId    
                                                             ) THEN 1
         ELSE 0
         END
      )
   AND  
      (           
      (CASE WHEN CONVERT(CHAR(1),ISNULL(frma.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) LIKE                 
        CASE                   
             WHEN                     
                 (                  
                  @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
                 )                   
              THEN @cSearchValue  
              ELSE  (case when CONVERT(CHAR(1),ISNULL(frma.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
        END            
      )           
   AND  
      (            
      CONVERT(varchar(10),concat(isnull(month(frma.CreatedDateTime),'0'),ISNULL(year(frma.CreatedDateTime),'0'))) =                 
      CASE                   
        WHEN                     
         (                  
          @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                  
         )                   
        THEN convert(varchar(10),concat(month(getdate()),year(getdate())))  
        ELSE convert(varchar(10),concat(isnull(month(frma.CreatedDateTime),'0'),isnull(year(frma.CreatedDateTime),'0')))  
      END            
      )
   AND                         
     (                        
       ISNULL(acc.AccountName,'') LIKE                            
            CASE                             
                WHEN                               
                   (                            
                      @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
                   )                             
                THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                              
                ELSE  ISNULL(acc.AccountName,'')                           
            END                        
      )                                       
   AND                         
      (                        
         ISNULL(fm.FormName,'') LIKE                            
           CASE                             
               WHEN                               
                   (                            
                    @cSearchBy <> '' AND @cSearchBy = 'FormName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
                    )                             
               THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                              
               ELSE  ISNULL(fm.FormName,'')                           
           END                        
      )                                    
   AND                         
      (                        
        ISNULL(ct.CategoryName,'') LIKE                            
          CASE                             
             WHEN                               
                 (                            
                   @cSearchBy <> '' AND @cSearchBy = 'CategoryName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                           )                             
            THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                              
            ELSE  ISNULL(ct.CategoryName,'')                           
          END                        
      )                       
                        
      ORDER BY 1 DESC                        
                            
      OFFSET (@iCurrentPage-1)*@iRowperPage ROWS                             
      FETCH NEXT @iRowperPage ROWS ONLY                        
          
		  
		  
		  
		  /*Query For Count Total Items In Grid*/              
     SELECT 
     ISNULL(COUNT (1),0)  AS TotalItem,
     (
      SELECT 
      ISNULL(SUM(
       CASE 
           WHEN YEAR(frma.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(frma.CreatedDateTime)=MONTH(GETDATE()) 
           THEN 1 
           ELSE 0 
	    END),0
                )
     ) AS TotalCurrentMonth, 
     ISNULL(SUM(CASE WHEN frma.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,
     ISNULL(SUM(CASE WHEN frma.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive         
     FROM Map_FormAccount(NOLOCK) frma        
     LEFT JOIN MST_Category(NOLOCK)   ct  ON frma.FK_CategoryId = ct.PK_CategoryId        
     LEFT JOIN MST_Account(NOLOCK)    acc     ON frma.FK_AccountId = acc.PK_AccountId        
     LEFT JOIN [dbo].[MST_Form] (NOLOCK) fm ON frma.FK_FormId = fm.PK_FormId        
     WHERE 
     PK_FormAccountId= CASE WHEN @iPK_FormAccountId <> 0 THEN @iPK_FormAccountId ELSE PK_FormAccountId END        
     AND
     ISNULL(frma.IsDeleted,0)=0
     AND
     1=(
         CASE WHEN @cLoginType='CUSTOMER' AND  @iFK_CustomerId IN (
                                                                       SELECT PK_CustomerId FROM dboGyanmitrasMST_Customer (NOLOCK)
                                                                       WHERE
                                                                       IsActive=1
                                                                       AND PK_CustomerId    = @iFK_CustomerId
                                                                       OR ISNULL(FK_ParentCustomerId,0)    = @iFK_CustomerId
                                                                     )  THEN 1
          WHEN @cLoginType='COMPANY' AND (frma.FK_AccountId IN    
                                                             (    
                                                                 SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA     
                                                                 INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId     
                                                                 WHERE FK_UserId=@iUserId and
                                                                 FMUA.IsActive=1 and FMU.IsActive=1    
                                                                 AND @iFK_AccountId=6    
                                                             )    
                                                             OR     
                                                             ISNULL(frma.FK_AccountId,0) =@iFK_AccountId
                                             )  THEN 1
         WHEN @cLoginType='RESELLER' AND frma.FK_AccountId IN(
                                    SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                       WHERE
                                                                       IsActive=1
                                                                       AND PK_AccountId    = @iFK_AccountId
                                                                       OR ISNULL(FK_ResellerId,0)    = @iFK_AccountId    
                                                             ) THEN 1
         WHEN @cLoginType='AFFILIATE' AND frma.FK_AccountId IN(
                                                              SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                       WHERE
                                                                       IsActive=1
                                                                       AND PK_AccountId    = @iFK_AccountId
                                                                       OR ISNULL(FK_AffiliateId,0)    = @iFK_AccountId    
                                                             ) THEN 1
         ELSE 0
         END
        )
     AND  
       (            
          (case when CONVERT(CHAR(1),ISNULL(frma.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
           CASE                   
               WHEN                     
                (                  
                 @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
                )                   
               THEN @cSearchValue  
               ELSE  (case when CONVERT(CHAR(1),ISNULL(frma.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
            END            
        )            
    AND  
       (            
        CONVERT(varchar(10),concat(isnull(month(frma.CreatedDateTime),'0'),isnull(year(frma.CreatedDateTime),'0'))) =                 
        CASE                   
            WHEN                     
             (                  
              @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                  
             )                   
            THEN convert(varchar(10),concat(month(getdate()),year(getdate())))  
            ELSE convert(varchar(10),concat(isnull(month(frma.CreatedDateTime),'0'),isnull(year(frma.CreatedDateTime),'0')))  
        END            
       )
    AND                         
      (                        
           ISNULL(acc.AccountName,'') LIKE                            
           CASE                             
               WHEN                               
                   (                            
                      @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
                   )                             
                THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                              
                ELSE  ISNULL(acc.AccountName,'')                           
            END                        
       )                                     
     AND                         
      (                        
           ISNULL(fm.FormName,'') LIKE                            
           CASE                             
              WHEN                               
                  (                            
                   @cSearchBy <> '' AND @cSearchBy = 'FormName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
                   )                             
              THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                              
              ELSE  ISNULL(fm.FormName,'')                  
           END                        
        )                                
    AND                         
      (                        
           ISNULL(ct.CategoryName,'') LIKE                            
           CASE                             
           WHEN                               
                 (                            
                  @cSearchBy <> '' AND @cSearchBy = 'CategoryName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                           )                             
             THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                              
            ELSE  ISNULL(ct.CategoryName,'')                           
           END                        
       )
 END TRY                    
 BEGIN CATCH                                                                                    
 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                     
                                                                                
 END CATCH   









