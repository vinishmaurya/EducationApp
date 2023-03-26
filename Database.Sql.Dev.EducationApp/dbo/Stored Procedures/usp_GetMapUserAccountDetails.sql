/*****************************************************************                    
Created By: Prince kumar srivastva                
Created Date:12-12-2019                   
Purpose: Get User Account Mapping Details   
SELECT * FROM MAP_UserAccount              
EXEC [dbo].[usp_GetMapUserAccountDetails]   0,1,100,1,'',''               
*******************************************************************/                    
CREATE PROCEDURE [dbo].[usp_GetMapUserAccountDetails]                
(     
--declare                   
  @PK_UserAccountId  BIGINT=0--0              
 ,@iFK_AccountID    BIGINT=1--1              
 ,@iRowperPage   INT =1 --=10    --2              
 ,@iCurrentPage  INT=10--=0    --1              
 ,@cSearchBy     VARCHAR(50) ='' --=''--''                  
 ,@cSearchValue     VARCHAR(50)=''--='' --''              
 ,@iUserid BIGINT=''--=1 
 ,@iFK_CustomerId BIGINT=0,
  @cLoginType nvarchar(100)=''      --1              
)                    
AS                    
BEGIN TRY              
        SELECT 1 AS Message_Id,'Success' AS Message              
               
        SELECT   
        ISNULL(MAPUA.FK_CategoryId,0) AS  FK_CategoryId,         
        ISNULL(MSTCAT.CategoryName,'')AS CategoryName,            
        ISNULL(FMA.AccountName,'')AS AccountName,                 
        ISNULL(FMU.UserName,'') AS UserName,              
        ISNULL(MAPUA.PK_UserAccountId,0) AS PK_UserAccountId,              
        ISNULL(MAPUA.FK_UserId,0) AS FK_UserId,              
        ISNULL(MAPUA.FK_AccountId,0) AS FK_AccountId,              
        ISNULL(MAPUA.IsActive,0) AS IsActive,            
        ISNULL(FMR.RoleName,'') AS RoleName,          
        CASE WHEN ISNULL(MAPUA.IsActive,0)=0 THEN 'InActive' ELSE 'Active' END AS CurrentStatus,           
        ISNULL(CONVERT(VARCHAR(20),MAPUA.CreatedDateTime,103),'') AS CreatedDateTime,              
        ISNULL(MAPUA.UpdatedBy,0) AS UpdatedBy,              
        ISNULL(CONVERT(VARCHAR(20),MAPUA.UpdatedDateTime,103),'')AS UpdatedDateTime ,      
        ISNULL(MAPUA.IsCustomerAccount,0) AS IsCustomerAccount            
        FROM MAP_UserAccount(NOLOCK)MAPUA              
        INNER JOIN MST_User(NOLOCK)FMU              
        ON FMU.PK_UserId=MAPUA.FK_UserId              
        LEFT JOIN MST_Account(NOLOCK)FMA              
        ON FMA.PK_AccountId=MAPUA.FK_AccountId             
        LEFT JOIN MST_Category(NOLOCK)MSTCAT               
        ON MSTCAT.PK_CategoryId=FMA.FK_CategoryId            
        LEFT JOIN MST_Role(NOLOCK)FMR            
        ON FMR.PK_RoleId=FMU.FK_RoleId            
        WHERE 
		ISNULL(MAPUA.IsDeleted,0)=0  
        AND  
		MAPUA.PK_UserAccountId=CASE WHEN @PK_UserAccountId=0 THEN MAPUA.PK_UserAccountId ELSE @PK_UserAccountId END 
		AND 
		1=(
                CASE WHEN @cLoginType='CUSTOMER' AND   @iFK_CustomerId IN (
                                                                              SELECT PK_CustomerId FROM dboGyanmitrasMST_Customer (NOLOCK)
                                                                              WHERE
                                                                              IsActive=1
                                                                              AND PK_CustomerId    = @iFK_CustomerId
                                                                              OR ISNULL(FK_ParentCustomerId,0)    = @iFK_CustomerId
                                                                            )  THEN 1
                 WHEN @cLoginType='COMPANY' AND (MAPUA.FK_AccountId IN    
                                                                    (    
                                                                        SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA     
                                                                        INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId     
                                                                        WHERE FK_UserId=@iUserId and
                                                                        FMUA.IsActive=1 and FMU.IsActive=1    
                                                                        AND @iFK_AccountId=6    
                                                                    )    
                                                                    OR     
                                                                    ISNULL(MAPUA.FK_AccountId,0) =@iFK_AccountId
                                                    )  THEN 1
                WHEN @cLoginType='RESELLER' AND @iFK_AccountID IN(
                                                                     SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                              WHERE
                                                                              IsActive=1
                                                                              AND PK_AccountId    = @iFK_AccountId
                                                                              OR ISNULL(FK_ResellerId,0)    = @iFK_AccountId    
                                                                    ) THEN 1
                WHEN @cLoginType='AFFILIATE' AND @iFK_AccountID IN(
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
          (CASE WHEN CONVERT(CHAR(1),ISNULL(MAPUA.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
                CASE                   
                    WHEN                     
                     (                  
                      @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
                     )                   
                    THEN @cSearchValue  
                    ELSE  (case when CONVERT(CHAR(1),ISNULL(MAPUA.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
                END            
         )            
        AND  
        (            
          CONVERT(varchar(10),concat(isnull(month(MAPUA.CreatedDateTime),'0'),isnull(year(MAPUA.CreatedDateTime),'0'))) =                 
          CASE                   
            WHEN                     
             (                  
              @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                  
             )                   
            THEN convert(varchar(10),concat(month(getdate()),year(getdate())))  
            ELSE convert(varchar(10),concat(isnull(month(MAPUA.CreatedDateTime),'0'),isnull(year(MAPUA.CreatedDateTime),'0')))  
          END            
        )                
        AND                   
         (                  
            ISNULL(FMU.UserName,'') LIKE    
            CASE                       
                WHEN                         
                   (                      
                      @cSearchBy <> '' AND @cSearchBy = 'UserName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                      
                   )                       
                THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                        
                ELSE  ISNULL(FMU.UserName,'')                     
            END         
           )                          
       AND     
          (                
              ISNULL(FMA.AccountName,'') LIKE                      
                CASE                       
                   WHEN                         
                       (                      
                       @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                      
                        )                       
                   THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                        
                   ELSE  ISNULL(FMA.AccountName,'')                     
                  END                  
           )                         
       AND                   
          (                  
              ISNULL(MSTCAT.CategoryName,'') LIKE                      
                CASE                       
                    WHEN                         
                      (                      
                       @cSearchBy <> '' AND @cSearchBy = 'AccountCategory' AND LTRIM(RTRIM(@cSearchValue)) <> ''
					  )                                                    
                   THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                        
                   ELSE  ISNULL(MSTCAT.CategoryName,'')                     
                END                  
            )                 
                     
      ORDER BY 1 DESC                        
      OFFSET (@iCurrentPage-1)*@iRowperPage ROWS                       
      FETCH NEXT @iRowperPage ROWS ONLY                  
            
			
			
			/*Query For Total Count On Grid*/      
        SELECT 
        ISNULL(COUNT (1),0)  AS TotalItem,
        (
	    SELECT 
        ISNULL(SUM (
	    CASE 
	    WHEN YEAR(MAPUA.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(MAPUA.CreatedDateTime)=MONTH(GETDATE()) 
	 	THEN 1 
	 	ELSE 0 END),0
	    )
        ) AS TotalCurrentMonth, 
        ISNULL(SUM(CASE WHEN MAPUA.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,
        ISNULL(SUM(CASE WHEN MAPUA.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive                          
        FROM MAP_UserAccount(NOLOCK)MAPUA              
        INNER JOIN MST_User(NOLOCK)FMU              
        ON FMU.PK_UserId=MAPUA.FK_UserId              
        LEFT JOIN MST_Account(NOLOCK)FMA              
        ON FMA.PK_AccountId=MAPUA.FK_AccountId             
        LEFT JOIN MST_Category(NOLOCK)MSTCAT               
        ON MSTCAT.PK_CategoryId=FMA.FK_CategoryId            
        LEFT JOIN MST_Role(NOLOCK)FMR            
        ON FMR.PK_RoleId=FMU.FK_RoleId               
        WHERE
		ISNULL(MAPUA.IsDeleted,0)=0  
        AND  
		MAPUA.PK_UserAccountId= ( CASE WHEN @PK_UserAccountId=0 THEN MAPUA.PK_UserAccountId ELSE @PK_UserAccountId END)              
        AND 
		    1=(
                CASE WHEN @cLoginType='CUSTOMER' AND   @iFK_CustomerId IN (
                                                                              SELECT PK_CustomerId FROM dboGyanmitrasMST_Customer (NOLOCK)
                                                                              WHERE
                                                                              IsActive=1
                                                                              AND PK_CustomerId    = @iFK_CustomerId
                                                                              OR ISNULL(FK_ParentCustomerId,0)    = @iFK_CustomerId
                                                                            )  THEN 1
                 WHEN @cLoginType='COMPANY' AND (MAPUA.FK_AccountId IN    
                                                                    (    
                                                                        SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA     
                                                                        INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId     
                                                                        WHERE FK_UserId=@iUserId and
                                                                        FMUA.IsActive=1 and FMU.IsActive=1    
                                                                        AND @iFK_AccountId=6    
                                                                    )    
                                                                    OR     
                                                                    ISNULL(MAPUA.FK_AccountId,0) =@iFK_AccountId
                                                    )  THEN 1
                WHEN @cLoginType='RESELLER' AND @iFK_AccountID IN(
                                                                     SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                              WHERE
                                                                              IsActive=1
                                                                              AND PK_AccountId    = @iFK_AccountId
                                                                              OR ISNULL(FK_ResellerId,0)    = @iFK_AccountId    
                                                                    ) THEN 1
                WHEN @cLoginType='AFFILIATE' AND @iFK_AccountID IN(
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
          (CASE WHEN CONVERT(CHAR(1),ISNULL(MAPUA.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
              CASE                   
                 WHEN                     
                  (                  
                   @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue ))<> ''                  
                  )                   
                 THEN @cSearchValue  
                 ELSE  (case when CONVERT(CHAR(1),ISNULL(MAPUA.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
             END            
         )            
       AND  
           (            
             CONVERT(varchar(10),concat(isnull(month(MAPUA.CreatedDateTime),'0'),isnull(year(MAPUA.CreatedDateTime),'0'))) =                 
              CASE                   
                WHEN                     
                 (                  
                  @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                  
                 )                   
                THEN convert(varchar(10),concat(month(getdate()),year(getdate())))  
                ELSE convert(varchar(10),concat(isnull(month(MAPUA.CreatedDateTime),'0'),isnull(year(MAPUA.CreatedDateTime),'0')))  
              END            
            )        
      AND                   
        (                  
         ISNULL(FMU.UserName,'') LIKE                      
            CASE                       
                WHEN                         
                   (                      
                      @cSearchBy <> '' AND @cSearchBy = 'UserName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                      
                   )                       
                THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                        
                ELSE  ISNULL(FMU.UserName,'')                     
            END                  
        )                         
      AND                   
        (                  
           ISNULL(FMA.AccountName,'') LIKE                      
           CASE                       
                WHEN                         
                   (                      
                   @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                      
                    )       
                 THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                        
                 ELSE  ISNULL(FMA.AccountName,'')                     
            END                  
        )                      
      AND    
       (                  
           ISNULL(MSTCAT.CategoryName,'') LIKE                      
           CASE                       
              WHEN                         
                  (                      
                    @cSearchBy <> '' AND @cSearchBy = 'AccountCategory' AND LTRIM(RTRIM(@cSearchValue)) <> ''
				  )                       
              THEN '%'+RTRIM(LTRIM(@cSearchValue))+'%'                        
              ELSE  ISNULL(MSTCAT.CategoryName,'')                     
              END                  
       )                       
       ORDER BY 1 DESC               
 END TRY              
 BEGIN CATCH   
 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message               
                                                                          
 END CATCH              
              
                   
                  
              
              
              
              
              
              
              











