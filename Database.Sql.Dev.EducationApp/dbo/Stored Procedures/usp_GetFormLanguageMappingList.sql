
-- =============================================          
-- Author:  Vinish          
-- Create date: 2019-12-11 15:59:43.327          
-- Description: EXEC [dbo].[usp_GetFormLanguageMappingList]  0,10,1,'ThisMonth',''          
-- =============================================          
CREATE PROCEDURE [dbo].[usp_GetFormLanguageMappingList]          
@iPK_FormLanguageId               bigint,          
@iRowperPage                      bigint,          
@iCurrentPage                  bigint,          
@cSearchBy                     nvarchar(50),            
@cSearchValue                  nvarchar(50)     ,
@iUserId                INT=1,
@iFK_AccountId     BIGINT = 0,
@iFK_CustomerId   BIGINT = 0,
@cLoginType          nvarchar(100) = ''         
AS          
BEGIN try          
 SET NOCOUNT ON;          
 IF  @iPK_FormLanguageId<>0          
 BEGIN          
  SELECT 1 AS Message_Id,'Success' As Message            
  --Select          
  SELECT  FLM.*,L.LanguageFullName LanguageName,F.FormName FormName FROM          
  [dbo].[Map_FormLanguage]  FLM (NOLOCK)          
  INNER JOIN [dbo].[LKP_Language]  L (NOLOCK) ON L.PK_LanguageId=FLM.FK_LanguageId  and   ISNULL(FLM.IsDeleted,0) = 0 and FLM.PK_FormLanguageId=@iPK_FormLanguageId        
  INNER JOIN [dbo].[MST_Form] F (NOLOCK) ON F.PK_FormId = FLM.FK_FormId and   ISNULL(FLM.IsDeleted,0) = 0  and FLM.PK_FormLanguageId=@iPK_FormLanguageId        
        
  ORDER BY  1 DESC            
            
  --Count          
  SELECT COUNT(1) as TotalItem           
  FROM  [dbo].[Map_FormLanguage]  FLM (NOLOCK)         
  WHERE FLM.PK_FormLanguageId=@iPK_FormLanguageId          
 END          
 ELSE          
 BEGIN          
  SELECT 1 AS Message_Id,'Success' As Message            
  --Select      
          
  SELECT  case when concat(isnull(month(FLM.CreatedDateTime),'0'),isnull(year(FLM.CreatedDateTime),'0')) = concat(month(getdate()),year(FLM.CreatedDateTime))
  then '1' else '0' end thismonth
  ,FLM.*,L.LanguageFullName LanguageName,F.FormName FormName FROM          
  [dbo].[Map_FormLanguage]  FLM (NOLOCK)          
  INNER JOIN [dbo].[LKP_Language]  L (NOLOCK) ON L.PK_LanguageId=FLM.FK_LanguageId   and   ISNULL(FLM.IsDeleted,0) = 0         
  INNER JOIN [dbo].[MST_Form] F (NOLOCK) ON F.PK_FormId = FLM.FK_FormId  and     ISNULL(FLM.IsDeleted,0) = 0   
  where         
  (            
   (          
    ISNULL(F.FormName,'') LIKE                
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'FormName' AND @cSearchValue <> ''                
       )                 
      THEN '%'+@cSearchValue+'%'                 
      ELSE  ISNULL(F.FormName,'')               
    END          
    )              
       AND          
   (      
    ISNULL(L.LanguageFullName,'') LIKE                
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'LanguageName' AND @cSearchValue <> ''                
       )                 
      THEN '%'+@cSearchValue+'%'                 
      ELSE  ISNULL(L.LanguageFullName,'')               
    END           
    )   
	and
	(          
    (case when CONVERT(CHAR(1),ISNULL(FLM.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like               
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND @cSearchValue <> ''                
       )                 
      THEN @cSearchValue
      ELSE  (case when CONVERT(CHAR(1),ISNULL(FLM.IsActive,'')) = '1' then 'Active' else 'Inactive' end )              
    END          
    )          

	and
	(          
    convert(varchar(10),concat(isnull(month(FLM.CreatedDateTime),'0'),isnull(year(FLM.CreatedDateTime),'0'))) =               
    CASE                 
WHEN                  
       (                
        @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                
    )                 
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))
      ELSE convert(varchar(10),concat(isnull(month(FLM.CreatedDateTime),'0'),isnull(year(FLM.CreatedDateTime),'0')))
    END          
    )     
   )      
   
 -------User Wise Data 
					-------Added By Vinish 2020-01-14 12:30:26.640
					and 
					1=(
                            CASE 
							WHEN @cLoginType='CUSTOMER' AND   FLM.FK_CustomerId IN (
                                                                                          SELECT PK_CustomerId FROM dboGyanmitrasMST_Customer (NOLOCK)
                                                                                          WHERE
                                                                                          IsActive=1
                                                                                          AND PK_CustomerId    = @iFK_CustomerId
                                                                                          OR ISNULL(FK_ParentCustomerId,0)    = @iFK_CustomerId
                                                                                        )  THEN 1
                             WHEN @cLoginType='COMPANY' AND (FLM.FK_AccountId IN    
                                                                                (    
                                                                                    SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA     
                                                                                    INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId     
                                                                                    WHERE
																					FK_UserId=(case when @iUserId = (SELECT DISTINCT PK_UserId FROM MST_USER WHERE UserName = 'dadmin') then FK_UserId else @iUserId end) and
                                                                                    FMUA.IsActive=1 and FMU.IsActive=1    
                                                                                    AND @iFK_AccountId=(SELECT DISTINCT FK_AccountId FROM MST_USER WHERE UserName = 'dadmin')        
																					--FK_UserId=@iUserId and
                                                                                    --FMUA.IsActive=1 and FMU.IsActive=1    
                                                                                    --AND @iFK_AccountId=6  
                                                                                )    
                                                                                OR     
                                                                                ISNULL(FLM.FK_AccountId,0) =@iFK_AccountId
                                                                )  THEN 1
                            WHEN @cLoginType='RESELLER' AND FLM.FK_AccountId IN(
                                                                                 SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                                          WHERE
                                                                                          IsActive=1
                                                                                          AND PK_AccountId    = @iFK_AccountId
                                                                                          OR ISNULL(FK_ResellerId,0)    = @iFK_AccountId    
                                                                                ) THEN 1
                            WHEN @cLoginType='AFFILIATE' AND FLM.FK_AccountId IN(
  SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                WHERE
                                                                                          IsActive=1
                                                                                          AND PK_AccountId    = @iFK_AccountId
                                                                                          OR ISNULL(FK_AffiliateId,0)    = @iFK_AccountId    
                                                     ) THEN 1
                            ELSE 0
                            END
                      )
					  -------End 2020-01-14 12:31:17.690
        
  ORDER BY  1 DESC      
            
  OFFSET (@iCurrentPage-1)*@iRowperPage ROWS           
  FETCH NEXT @iRowperPage ROWS ONLY          
  --Count          
      
   SELECT--added sandeep   
         ISNULL(COUNT (1),0)  AS TotalItem,  
         (  
      SELECT   
         ISNULL(SUM (  
      CASE   
      WHEN YEAR(FLM.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(FLM.CreatedDateTime)=MONTH(GETDATE())   
    THEN 1   
    ELSE 0 END),0  
      )  
         ) AS TotalCurrentMonth,   
         ISNULL(SUM(CASE WHEN FLM.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,  
         ISNULL(SUM(CASE WHEN FLM.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive    
   --end  
   FROM [dbo].[Map_FormLanguage]  FLM (NOLOCK)          
  INNER JOIN [dbo].[LKP_Language]  L (NOLOCK) ON L.PK_LanguageId=FLM.FK_LanguageId   and   ISNULL(FLM.IsDeleted,0) = 0         
  INNER JOIN [dbo].[MST_Form] F (NOLOCK) ON F.PK_FormId = FLM.FK_FormId  and   ISNULL(FLM.IsDeleted,0) = 0   
  where         
  (            
   (          
    ISNULL(F.FormName,'') LIKE                
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'FormName' AND @cSearchValue <> ''                
       )                 
      THEN @cSearchValue
      ELSE  ISNULL(F.FormName,'')               
    END          
    )              
       AND          
   (      
    ISNULL(L.LanguageFullName,'') LIKE                
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'LanguageName' AND @cSearchValue <> ''                
       )                 
      THEN '%'+@cSearchValue+'%'                 
      ELSE  ISNULL(L.LanguageFullName,'')               
    END           
    )   
	and
	(          
      (case when CONVERT(CHAR(1),ISNULL(FLM.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND @cSearchValue <> ''                
       )                 
      THEN '%'+@cSearchValue+'%' 
      ELSE  (case when CONVERT(CHAR(1),ISNULL(FLM.IsActive,'')) = '1' then 'Active' else 'Inactive' end )
    END          
    )    
	and
	(          
    concat(isnull(month(FLM.CreatedDateTime),'0'),isnull(year(FLM.CreatedDateTime),'0')) =               
    CASE                 
      WHEN                   
       (                
        @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                
       )                 
      THEN concat(month(getdate()),year(getdate()))
      ELSE  concat(isnull(month(FLM.CreatedDateTime),'0'),isnull(year(FLM.CreatedDateTime),'0'))
    END          
    )           
   )     
   
   
 -------User Wise Data 
					-------Added By Vinish 2020-01-14 12:30:26.640
					and 
					1=(
                            CASE 
							WHEN @cLoginType='CUSTOMER' AND   FLM.FK_CustomerId IN (
                                                                                          SELECT PK_CustomerId FROM dboGyanmitrasMST_Customer (NOLOCK)
           WHERE
                                    IsActive=1
                                                                                          AND PK_CustomerId    = @iFK_CustomerId
                                                                                          OR ISNULL(FK_ParentCustomerId,0)    = @iFK_CustomerId
                 )  THEN 1
                             WHEN @cLoginType='COMPANY' AND (FLM.FK_AccountId IN    
                                                                                (    
                                                                                    SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA     
                                                                                    INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId     
                                                                                    WHERE
																					FK_UserId=(case when @iUserId = (SELECT DISTINCT PK_UserId FROM MST_USER WHERE UserName = 'dadmin') then FK_UserId else @iUserId end) and
                                                                                    FMUA.IsActive=1 and FMU.IsActive=1    
                                                                                    AND @iFK_AccountId=(SELECT DISTINCT FK_AccountId FROM MST_USER WHERE UserName = 'dadmin')        
																					--FK_UserId=@iUserId and
                                                                                    --FMUA.IsActive=1 and FMU.IsActive=1    
                                                                                    --AND @iFK_AccountId=6    
                                                                                )    
                                                                                OR     
                                                                                ISNULL(FLM.FK_AccountId,0) =@iFK_AccountId
                                                                )  THEN 1
                            WHEN @cLoginType='RESELLER' AND FLM.FK_AccountId IN(
                                                                                 SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                                          WHERE
                                                                                          IsActive=1
                                                                                          AND PK_AccountId    = @iFK_AccountId
                                                                                          OR ISNULL(FK_ResellerId,0)    = @iFK_AccountId    
                                                                                ) THEN 1
                            WHEN @cLoginType='AFFILIATE' AND FLM.FK_AccountId IN(
                                                                                 SELECT PK_AccountId FROM dboGyanmitrasMST_Account (NOLOCK)
                                                                                          WHERE
                                                                                          IsActive=1
                                                                                          AND PK_AccountId    = @iFK_AccountId
                                                                                          OR ISNULL(FK_AffiliateId,0)    = @iFK_AccountId    
                                                                                ) THEN 1
                            ELSE 0
                            END
                      )
					  -------End 2020-01-14 12:31:17.690      
  ORDER BY  1 DESC             
 END          
end TRY          
BEGIN CATCH           
SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message           
END CATCH; 








