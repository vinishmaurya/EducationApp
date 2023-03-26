/******************************************                  
CreatedBy:Vinish            
CreatedDate:2023-03-12 12:10:13.510
purpos:Get Account Details                
                
EXEC [dbo].[USP_GetAccountDetails]                 
0,10,1,'',''                
    select * from mst_account(nolock)            
EXEC [dbo].[USP_GetAccountDetails]                 
0,10,1,'CategoryName','Reseller'                
                
EXEC [dbo].[USP_GetAccountDetails] 0,10,1,'',''
****************************************************/					
CREATE PROCEDURE [dbo].[USP_SvcGetAccountDetails]                
(    
          
 @iPK_AccountId               BIGINT,             
 @iRowperPage                 BIGINT,                
 @iCurrentPage                BIGINT,                
 @cSearchBy                   NVARCHAR(50)='',                
 @cSearchValue                NVARCHAR(50)=''       
)                
AS                
BEGIN TRY            
 SELECT 1 AS Message_Id, 'SUCCESS' AS Message                 
      SELECT        
	  ROW_NUMBER() OVER(ORDER BY fma.PK_AccountId DESC) SrNo, 
      ISNULL(fma.PK_AccountId, 0) PK_ID,                
      ISNULL(fma.AccountName,'')AccountName,                  
      CASE                 
      WHEN fma.FK_ResellerId IS NULL AND fma.FK_AffiliateId IS NULL THEN 'COMPANY'                
      WHEN fma.FK_ResellerId IS NOT NULL THEN 'RESELLER'                
      WHEN fma.FK_AffiliateId IS NOT NULL THEN 'AFFILIATE'                 
      ELSE 'NA' END AS AccountType,                
      ISNULL(msa.CategoryName,'')CategoryName,                        
      ISNULL(fma.AccountAddress,'')   AccountAddress,                    
      --ISNULL(fma.ZipCode,''  )ZipCode,                            
      ISNULL(cntry.CountryName, '' )CountryName,                    
      ISNULL(st.StateName, '' ) StateName,                        
      ISNULL(ct.CityName,  '')CityName,                          
      ISNULL(fma.BillingAddress,'')BillingAddress,                       
      ISNULL(fma.ContactPerson, '')ContactPerson,                       
      ISNULL(fma.MobileNo, '')MobileNo,                            
      ISNULL(fma.AlternateMobileNo,  '')AlternateMobileNo,                  
      ISNULL(fma.EmailId,'') EmailId ,                            
      ISNULL(fma.AlternateEmailId, '')AlternateEmailId,                    
      ISNULL(fma.AccountRegistrationNo,'')AccountRegistrationNo,                
      ISNULL(fma.AccountLogo, '')AccountLogo,                         
      ISNULL(fma.IsActive,0) IsActive,    
	  IIF(ISNULL(fma.IsActive,0) = 1,'Active','Inactive') [Status],    
      --By Vinish                
      ISNULL(p_fma.AccountName,'') ParentAccountName,                
      ISNULL(us.UserPassword,'')[Password],                              
      ISNULL(p_fma.FK_CategoryId,'') Parent_FK_CategoryId,                
      ISNULL(fma.FK_CategoryId,'') FK_CategoryId,                
      ISNULL(fma.FK_CountryId,'') FK_CountryId,                
      ISNULL(fma.FK_StateId,'') FK_StateId,                
      ISNULL(fma.FK_CityId,'') FK_CityId,                
      ISNULL(fma.ParentAccountId,'') ParentAccountId,                
      --ISNULL(fma.FK_CountryId_Billing,'') FK_CountryId_Billing,                
      ISNULL(fma.FK_StateId_Billing ,'') FK_StateId_Billing,                
      ISNULL(fma.FK_CityId_Billing ,'') FK_CityId_Billing ,                
      ISNULL(fma.UserLimit,'') UserLimit,                
      ISNULL(fma.ZipCode,'') ZipCode,                
      ISNULL(fma.ZipCode_Billing,'') ZipCode_Billing,                
      ISNULL(cntry_bill.CountryName,'')       CountryId_Billing_Name,                
      ISNULL(st_bill.StateName,'')           State_Billing_Name,                
      ISNULL(ct_bill.CityName,'') City_Billing_Name,       
      ISNULL(cntry_bill.PK_CountryId,'') FK_CountryId_Billing,     
 --ISNULL(st_bill.PK_StateId,'')  FK_StateId_Billing    ,                
      --ISNULL(ct_bill.PK_CityId,'') FK_CityId_Billing,                
      ISNULL(us.UserName,'')Username,       
      ISNULL(us.FK_RoleId,0)FK_RoleId ,               
	  ISNULL(rle.RoleName,'')RoleName,               

	  ISNULL(fma.FK_AccountId_Referrer,0)  FK_AccountId_Referrer    ,                
      ISNULL(p_fma_ref.AccountName,'') AccountName_Referrer,                
      ISNULL(fma.FK_CategoryId_Referrer,'') FK_CategoryId_Referrer,       
      ISNULL(msa_ref.CategoryName,0) CategoryName_Referrer      ,
	  ISNULL(fma.ShareVia,'') ShareVia,
	  FORMAT(fma.CreatedDateTime,'dd/MM/yyyy hh:mm:ss') CreatedDateTime,
	  ISNULL(fma.NextStep,'') NextStep,
	  ISNULL(fma.StepCompleted,'') StepCompleted


      --End Vinish                
      FROM  [dbo].[MST_Account]  fma (NOLOCK)                
      LEFT JOIN [dbo].[MST_Category]  msa   (NOLOCK)    ON fma.FK_CategoryId=msa.PK_CategoryId                
      --LEFT JOIN [dbo].[MST_Category]  catReseller   (NOLOCK)    ON fma.FK_ResellerId=catReseller.PK_CategoryId                
      --LEFT JOIN [dbo].[MST_Category]  catAffiliate   (NOLOCK)    ON fma.FK_ResellerId=catAffiliate.PK_CategoryId                
      LEFT JOIN [dbo].[MST_Country]   cntry (NOLOCK)    ON fma.FK_CountryId=cntry.PK_CountryId                
      LEFT JOIN [dbo].[MST_State]     st    (NOLOCK)    ON fma.FK_StateId=st.PK_StateId                
      LEFT JOIN [dbo].[MST_City]      ct    (NOLOCK)    ON fma.FK_CityId=ct.PK_CityId                
      --By Vinish                
      LEFT JOIN [dbo].[MST_User]  us (NOLOCK)    ON fma.FK_UserId=us.PK_UserId                
      left JOIN [dbo].[MST_Country]   cntry_bill (NOLOCK)    ON fma.FK_CountryId=cntry_bill.PK_CountryId                
      left JOIN [dbo].[MST_State]     st_bill    (NOLOCK)    ON fma.FK_StateId=     st_bill.PK_StateId                
      left JOIN [dbo].[MST_City]      ct_bill    (NOLOCK)    ON fma.FK_CityId=      ct_bill.PK_CityId                
      left JOIN [dbo].[MST_Account]     p_fma    (NOLOCK)    ON fma.ParentAccountId=p_fma.PK_AccountId                

	  LEFT JOIN [dbo].[MST_Account]     p_fma_ref    (NOLOCK)    ON fma.FK_AccountId_Referrer =p_fma_ref.PK_AccountId  
	  LEFT JOIN [dbo].[MST_Category]  msa_ref   (NOLOCK)    ON fma.FK_CategoryId_Referrer =msa_ref.PK_CategoryId
	  LEFT JOIN [dbo].[MST_Role]      rle    (NOLOCK)    ON us.FK_RoleId=rle.PK_RoleId 
      --End                
      WHERE             
		Isnull(fma.IsDeleted,0)=0   AND   
      fma.PK_AccountId= CASE WHEN @iPK_AccountId <> 0 THEN @iPK_AccountId ELSE fma.PK_AccountId END                
                
      --AND                      
 --(                    
 -- fma.FK_AccountId IN                    
 -- (                    
 --  SELECT AccountId from MAP_UserAccount(NOLOCK) FMUA                     
 --  INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId                     
 --  WHERE FK_UserId=@iPK_UserId and                 
 --  FMUA.IsActive=1 and FMU.IsActive=1                    
 --  AND @iFK_AccountId=1                    
 -- )                    
 -- OR                     
 -- fma.FK_AccountId =@iFK_AccountId                    
 --)                  
                
                
                
    ---By Vinish          
           
 and          
 (                    
    (case when CONVERT(CHAR(1),ISNULL(fma.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                         
    CASE                           
      WHEN                             
       (                          
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND @cSearchValue <> ''                          
       )                           
      THEN @cSearchValue          
      ELSE  (case when CONVERT(CHAR(1),ISNULL(fma.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                 
    END               
    )  
          
 and          
 (                  
    convert(varchar(10),concat(isnull(month(fma.CreatedDateTime),'0'),isnull(year(fma.CreatedDateTime),'0'))) =                         
    CASE                           
      WHEN 
       (                          
        @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                          
    )                           
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))          
   ELSE convert(varchar(10),concat(isnull(month(fma.CreatedDateTime),'0'),isnull(year(fma.CreatedDateTime),'0')))          
    END                    
    )                     
    AND                
      ISNULL(msa.CategoryName,'') LIKE                    
     CASE                     
       WHEN                       
     (                    
      @cSearchBy <> '' AND @cSearchBy = 'AccountCategory' AND @cSearchValue <> ''                    
     )                     
       THEN '%'+@cSearchValue+'%'                     
       ELSE  ISNULL(msa.CategoryName,'')                   
     END   
	   --End               
      AND                       
      ISNULL(fma.AccountName,'') LIKE                    
     CASE                     
       WHEN                       
     (                    
      @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND @cSearchValue <> ''                    
     )                     
       THEN '%'+@cSearchValue+'%'         
       ELSE  ISNULL(fma.AccountName,'')                   
     END                 
       AND                
          ISNULL(msa.CategoryName,'') LIKE                    
                  CASE                     
                    WHEN                       
                     (                    
                      @cSearchBy <> '' AND @cSearchBy = 'CategoryName' AND @cSearchValue <> ''                    
                     )                     
                    THEN '%'+@cSearchValue+'%'                     
                    ELSE  ISNULL(msa.CategoryName,'')                   
                  END                 
      AND                
    ISNULL(cntry.CountryName,'') LIKE                    
                    CASE                     
                      WHEN                       
                       (                    
                        @cSearchBy <> '' AND @cSearchBy = 'CountryName' AND @cSearchValue <> ''                    
                       )                     
                      THEN '%'+@cSearchValue+'%'                     
                      ELSE  ISNULL(cntry.CountryName,'')                   
                    END                  
        AND                
    ISNULL(st.StateName,'') LIKE                    
                    CASE                     
                      WHEN                       
                       (                    
                        @cSearchBy <> '' AND @cSearchBy = 'StateName' AND @cSearchValue <> ''                    
                       )                     
                      THEN '%'+@cSearchValue+'%'                     
                      ELSE  ISNULL(st.StateName,'')                   
                    END                
        AND                
    ISNULL(ct.CityName,'') LIKE                    
                    CASE                     
                      WHEN                       
                       (                    
  @cSearchBy <> '' AND @cSearchBy = 'CityName' AND @cSearchValue <> ''                    
                       )                     
                      THEN '%'+@cSearchValue+'%'                     
                      ELSE  ISNULL(ct.CityName,'')                   
                    END

						AND                
          ISNULL(fma.EmailId,'') LIKE                    
               CASE    
                   WHEN               
          (       
                      @cSearchBy <> '' AND @cSearchBy = 'Email' AND @cSearchValue <> ''                    
                     )                     
                    THEN '%'+@cSearchValue+'%'                     
                    ELSE  ISNULL(fma.EmailId,'')                   
                  END                 
      AND  
          ISNULL(fma.MobileNo,'') LIKE                    
                  CASE                     
                    WHEN                       
                     (                    
                      @cSearchBy <> '' AND @cSearchBy = 'MobileNo' AND @cSearchValue <> ''                    
                     )                     
                    THEN '%'+@cSearchValue+'%'                     
                    ELSE  ISNULL(fma.MobileNo,'')                   
                  END        
	
					                
                
                 ORDER BY fma.PK_AccountId  desc                 
  OFFSET (@iCurrentPage-1)*@iRowperPage ROWS                     
                 FETCH NEXT @iRowperPage ROWS ONLY                
                     
       SELECT           
         ISNULL(COUNT (1),0)  AS TotalItem,          
           (          
         SELECT           
       ISNULL(SUM(          
    CASE           
    WHEN YEAR(fma.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(fma.CreatedDateTime)=MONTH(GETDATE())           
    THEN 1           
    ELSE 0 END),0          
      )          
          ) AS TotalCurrentMonth,         
      ISNULL(SUM(CASE WHEN isnull(fma.IsActive,0) =1 THEN 1 ELSE 0 END),0)AS TotalActive,          
      ISNULL(SUM(CASE WHEN isnull(fma.IsActive,0) =0 THEN 1 ELSE 0 END),0)AS TotalInActive             
                     
      FROM  [dbo].[MST_Account]  fma (NOLOCK)                
      INNER JOIN [dbo].[MST_Category]  msa   (NOLOCK)    ON fma.FK_CategoryId=msa.PK_CategoryId                
      --LEFT JOIN [dbo].[MST_Category]  catReseller   (NOLOCK)    ON fma.FK_ResellerId=catReseller.PK_CategoryId                
      --LEFT JOIN [dbo].[MST_Category]  catAffiliate   (NOLOCK)    ON fma.FK_ResellerId=catAffiliate.PK_CategoryId                
      LEFT JOIN [dbo].[MST_Country]   cntry (NOLOCK)    ON fma.FK_CountryId=cntry.PK_CountryId                
      LEFT JOIN [dbo].[MST_State]     st    (NOLOCK)    ON fma.FK_StateId=st.PK_StateId                
      LEFT JOIN [dbo].[MST_City]      ct    (NOLOCK)    ON fma.FK_CityId=ct.PK_CityId                
      --By Vinish                
      left JOIN [dbo].[MST_User]  us (NOLOCK)    ON fma.FK_UserId=us.PK_UserId                
      left JOIN [dbo].[MST_Country]   cntry_bill (NOLOCK)    ON fma.FK_CountryId=cntry_bill.PK_CountryId                
      left JOIN [dbo].[MST_State]     st_bill    (NOLOCK)    ON fma.FK_StateId=     st_bill.PK_StateId                
      left JOIN [dbo].[MST_City]      ct_bill    (NOLOCK)    ON fma.FK_CityId=      ct_bill.PK_CityId                
      left JOIN [dbo].[MST_Account]     p_fma    (NOLOCK)    ON fma.ParentAccountId=p_fma.PK_AccountId 
	  
	  
	  LEFT JOIN [dbo].[MST_Account]     p_fma_ref    (NOLOCK)    ON fma.FK_AccountId_Referrer =p_fma_ref.PK_AccountId  
	  LEFT JOIN [dbo].[MST_Category]  msa_ref   (NOLOCK)    ON fma.FK_CategoryId_Referrer =msa_ref.PK_CategoryId                
      --End                
      WHERE                 
      Isnull(fma.IsDeleted,0)=0   AND   
      fma.PK_AccountId= CASE WHEN @iPK_AccountId <> 0 THEN @iPK_AccountId ELSE fma.PK_AccountId END                
           --AND                      
 --(               
 -- fma.FK_AccountId IN                    
 -- (                    
 --  SELECT AccountId from MAP_UserAccount(NOLOCK) FMUA                     
 --  INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId                     
 --  WHERE FK_UserId=@iPK_UserId and   
 --  FMUA.IsActive=1 and FMU.IsActive=1                 
 --  AND @iFK_AccountId=1                    
 -- )                    
 -- OR                     
 -- fma.FK_AccountId =@iFK_AccountId      
 --)                  
                
  ---By Vinish          
           
 and          
 (                    
    (case when CONVERT(CHAR(1),ISNULL(fma.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                         
    CASE                           
      WHEN                             
       (                          
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND @cSearchValue <> ''                          
       )                           
      THEN @cSearchValue          
      ELSE  (case when CONVERT(CHAR(1),ISNULL(fma.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                        
    END                    
    )                    
          
 and          
 (                    
    convert(varchar(10),concat(isnull(month(fma.CreatedDateTime),'0'),isnull(year(fma.CreatedDateTime),'0'))) =                         
    CASE                           
      WHEN          
       (                          
        @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                          
    )                           
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))          
      ELSE convert(varchar(10),concat(isnull(month(fma.CreatedDateTime),'0'),isnull(year(fma.CreatedDateTime),'0')))          
    END                    
    )                     
    AND                
      ISNULL(msa.CategoryName,'') LIKE                    
     CASE                     
       WHEN                       
     (                    
      @cSearchBy <> '' AND @cSearchBy = 'AccountCategory' AND @cSearchValue <> ''                    
     )                     
       THEN '%'+@cSearchValue+'%'                     
       ELSE  ISNULL(msa.CategoryName,'')                   
     END                 
      AND                
   --End     
                
      ISNULL(fma.AccountName,'') LIKE                    
     CASE             
  WHEN                       
     (                    
 @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND @cSearchValue <> ''              
     )                     
       THEN '%'+@cSearchValue+'%'                     
       ELSE  ISNULL(fma.AccountName,'')                   
     END       
       AND       
            ISNULL(msa.CategoryName,'') LIKE                    
                  CASE                     
                    WHEN                       
                     (                    
                      @cSearchBy <> '' AND @cSearchBy = 'CategoryName' AND @cSearchValue <> ''                    
                     )            
                    THEN '%'+@cSearchValue+'%'      
                    ELSE  ISNULL(msa.CategoryName,'')                   
                  END                 
      AND                
      ISNULL(cntry.CountryName,'') LIKE                    
                    CASE                     
                      WHEN                       
 (                    
                        @cSearchBy <> '' AND @cSearchBy = 'CountryName' AND @cSearchValue <> ''                    
                       )                     
                      THEN '%'+@cSearchValue+'%'                     
                      ELSE  ISNULL(cntry.CountryName,'')                   
                END                  
        AND                
     ISNULL(st.StateName,'') LIKE                    
                    CASE                     
                      WHEN                       
                       (                    
                        @cSearchBy <> '' AND @cSearchBy = 'StateName' AND @cSearchValue <> ''                    
             )        
           THEN '%'+@cSearchValue+'%'                 
                      ELSE  ISNULL(st.StateName,'')                   
                    END                
        AND       
     ISNULL(ct.CityName,'') LIKE                    
                    CASE                     
                      WHEN       
                       (                    
                        @cSearchBy <> '' AND @cSearchBy = 'CityName' AND @cSearchValue <> ''                    
                       )                     
                      THEN '%'+@cSearchValue+'%'                     
                      ELSE  ISNULL(ct.CityName,'')                   
                    END   
					
					AND                
          ISNULL(fma.EmailId,'') LIKE                    
                  CASE                     
                    WHEN                       
                     (                    
                      @cSearchBy <> '' AND @cSearchBy = 'Email' AND @cSearchValue <> ''                    
                     )                     
                    THEN '%'+@cSearchValue+'%'                     
                    ELSE  ISNULL(fma.EmailId,'')                   
                  END                 
      AND  
          ISNULL(fma.MobileNo,'') LIKE                    
                  CASE                     
                    WHEN                       
                     (             
                      @cSearchBy <> '' AND @cSearchBy = 'MobileNo' AND @cSearchValue <> ''                    
                     )                     
                    THEN '%'+@cSearchValue+'%'                     
                    ELSE  ISNULL(fma.MobileNo,'')                   
                  END        

SELECT
'PK_ID' PK_ID,
'#' SrNo,
'Account Category' CategoryName,
'Account Name' AccountName,
--'User Name' Username,
--'Roles' RoleName,
--'Email ID' EmailId,
'Mobile No' MobileNo,
--'Country' CountryName,
'State' StateName,
'City' CityName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'ACCOUNT_MASTER'

END TRY                
BEGIN CATCH                 
 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;
