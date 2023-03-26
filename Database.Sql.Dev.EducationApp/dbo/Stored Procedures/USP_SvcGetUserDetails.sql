/******************************************                            
CreatedBy:Vinish                          
CreatedDate:2020-05-01 16:21:12.527
purpos:Get User Master  Deatils                         
                         
EXEC [dbo].[USP_GetUserDetails]  0,0,0,0,'',10,1,'',''                        
****************************************************/                          
CREATE PROCEDURE [dbo].[USP_SvcGetUserDetails]                        
(                        
 @iPK_UserId            BIGINT,                          
 @iFK_AccountId         BIGINT = 0,                         
 @iUserId               BIGINT = 0,                
 @iFK_CustomerId        BIGINT = 0,              
 @cLoginType            nvarchar(200) = '',              
 @iRowperPage           BIGINT,                        
 @iCurrentPage          BIGINT,                        
 @cSearchBy             NVARCHAR(50),                          
 @cSearchValue          NVARCHAR(50)                            
)                         
AS                            
BEGIN TRY                            
         SELECT 1 [Message_Id],'Success' [Message]                            
         SELECT                        
		 ROW_NUMBER() OVER(ORDER BY usr.PK_UserId DESC) SrNo, 
         ISNULL(usr.PK_UserId,0)PK_ID,                        
         ISNULL(usr.UserName,'')UserName,                        
         ISNULL(usr.FirstName,'')+' '+ISNULL(usr.LastName,'') [Name],                        
         ISNULL(usr.FK_CategoryId,0)CategoryId,                        
         ISNULL(cat.CategoryName,'') CategoryName,                        
         ISNULL(usr.FK_RoleId,0) RoleId,                        
         ISNULL(rol.RoleName,'') RoleName,                         
         ISNULL(usr.FK_AccountId, 0)AccountId,                           
         ISNULL(acc.AccountName,'') AccountName,                        
         ISNULL(usr.UserPassword,'')UserPassword,                        
         ISNULL(usr.MobileNo,'')MobileNo,                        
         ISNULL(usr.AlternateMobileNo,'')AlternateMobileNo,                        
         ISNULL(usr.EmailId,'')EmailId,                        
         ISNULL(usr.AlternateEmailId,'')AlternateEmailId,                        
         ISNULL(usr.Gender,'') Gender,                        
         ISNULL(usr.DateOfBirth,'') DateOfBirth,                        
         --ISNULL(CONVERT(VARCHAR,FORMAT(usr.DateOfBirth,'dd/MM/yyyy HH:mm')),'')DateOfBirth,                      
         ISNULL(usr.UserAddress,'')UserAddress,                        
         ISNULL(usr.ZipCode,0) ZipCode,                        
         ISNULL(usr.FK_CountryId,0)CountryId,                        
         ISNULL(cntry.CountryName,'') CountryName,                        
         ISNULL(usr.FK_StateId,0)StateId,                        
         ISNULL(st.StateName,'') StateName,                        
         ISNULL(usr.FK_CityId,0)CityId,                        
         ISNULL(cty.CityName,'') CityName,                        
         ISNULL(usr.ShareBy,'')ShareBy,                        
         ISNULL(usr.IsActive,0)IsActive,                        
         ISNULL(usr.FullName,'')FullName,                   
         0 FK_CustomerId,                       
         CASE WHEN usr.IsActive = 1 THEN 'Active' ELSE 'Inactive' END [Status],                        
         ISNULL(FORMAT(usr.CreatedDateTime,'dd/MM/yyyy HH:mm'),'') CreatedDateTime,                        
         ISNULL(usrCreated.FirstName,'')+' '+ISNULL(usrCreated.LastName,'') CreatedBy                        
         ,acc.FK_CategoryId  as CategoryIdForCust                 
         ,'' CustomerName,      
   ISNULL(usr.IsVehicleSpecific,0)IsVehicleSpecific,--Added By Meenakshi Jha(10-Feb-2020)            
		 ISNULL(usr.UserLogo,'') UserLogo
         FROM  [dbo].[MST_User](NOLOCK) usr           
         LEFT JOIN MST_Category(NOLOCK) cat                  
         ON usr.FK_CategoryId = cat.PK_CategoryId                        
         INNER JOIN MST_Role(NOLOCK) rol                   
         ON usr.FK_RoleId = rol.PK_RoleId                        
         LEFT JOIN MST_Account(NOLOCK) acc                        
         ON usr.FK_AccountId = acc.PK_AccountId                        
         LEFT JOIN MST_Country(NOLOCK) cntry             
         ON usr.FK_CountryId = cntry.PK_CountryId                        
         LEFT JOIN MST_State(NOLOCK) st                        
         ON usr.FK_StateId = st.PK_StateId                     
         LEFT JOIN MST_City(NOLOCK) cty                        
         ON usr.FK_CityId = cty.PK_CityId                        
         LEFT JOIN MST_User(NOLOCK) usrCreated                        
         ON usr.CreatedBy = usrCreated.PK_UserId            
         
		   where                                                          
         ISNULL(usr.IsDeleted,0)=0                   
         AND                        
         usr.PK_UserId = CASE WHEN @iPK_UserId <> 0 THEN @iPK_UserId ELSE usr.PK_UserId END                
     --    AND         
     --1=(        
     --                       CASE         
     --  WHEN (usr.FK_AccountId IN            
     --                                                                           (            
     --                                                                               SELECT FMUA.FK_AccountId from MAP_UserAccount(NOLOCK) FMUA             
     --                                                                               INNER JOIN MST_User(NOLOCK) FMU ON FMUA.FK_UserId=FMU.PK_UserId             
     --                                                                               WHERE         
     --                FK_UserId=(case when @iUserId = (SELECT DISTINCT PK_UserId FROM MST_USER WHERE UserName = 'dadmin') then FK_UserId else @iUserId end) and        
     --                                                                               FMUA.IsActive=1 and FMU.IsActive=1            
     --                                                                               AND @iFK_AccountId=(SELECT DISTINCT FK_AccountId FROM MST_USER WHERE UserName = 'dadmin')                
     --                --FK_UserId=@iUserId and        
     --                                                                               --FMUA.IsActive=1 and FMU.IsActive=1            
     --                                                                               --AND @iFK_AccountId=6          
     --    )            
     --                                                                           OR             
     --                                                                           ISNULL(usr.FK_AccountId,0) =@iFK_AccountId        
     --                                                           )  THEN 1        
                                  
     --                       ELSE 0        
     --                       END        
     --                 )        
                                
       AND                        
         ISNULL(usr.UserName,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'UserName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(usr.UserName,'')                           
            END                        
                                    
         AND                        
         ISNULL(usr.MobileNo,'') LIKE  
            CASE                
         WHEN  
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'MobileNo' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(usr.MobileNo,'')                           
            END                        
                                   
         AND                        
         ISNULL(usr.EmailId,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'EmailId' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(usr.EmailId,'')                           
            END     
    AND                        
         ISNULL(cat.CategoryName,'') LIKE                            
     CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'AccountCategory' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(cat.CategoryName,'')                           
        END       
   AND                        
         ISNULL(rol.RoleName,'') LIKE                            
            CASE                             
              WHEN          
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'Role' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(rol.RoleName,'')                              
        END       
   AND                        
       
	   (
	     ISNULL(acc.AccountName,'')  LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'AccountName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(acc.AccountName,'')                           
        END     
		
		)                       
   --Nitin                     
    AND                        
 (                                  
    (case when CONVERT(CHAR(1),ISNULL(usr.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                                       
    CASE                                         
      WHEN                                           
       (                                        
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                                        
       )                                         
      THEN @cSearchValue                        
      ELSE  (case when CONVERT(CHAR(1),ISNULL(usr.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                                      
    END                                  
    )                                  
                        
 AND                        
 (                                  
    convert(varchar(10),concat(isnull(month(usr.CreatedDateTime),'0'),isnull(year(usr.CreatedDateTime),'0'))) =                            
CASE                                           WHEN                                           
       (                                        
        @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                                        
    )                                         
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))                        
      ELSE convert(varchar(10),concat(isnull(month(usr.CreatedDateTime),'0'),isnull(year(usr.CreatedDateTime),'0')))                        
    END                                  
    )     
                       
                       
   --NitinEnd                      
                                
         ORDER BY usr.PK_UserId desc       OFFSET (@iCurrentPage-1)*@iRowperPage ROWS                                     
         FETCH NEXT @iRowperPage ROWS ONLY                         
         SELECT                       
         ISNULL(COUNT (1),0)  AS TotalItem,                      
         (                      
      SELECT                       
        ISNULL( SUM (                      
      CASE                       
      WHEN YEAR(usr.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(usr.CreatedDateTime)=MONTH(GETDATE())                       
    THEN 1                       
    ELSE 0 END),0                      
      )                      
         ) AS TotalCurrentMonth,                       
         ISNULL(SUM(CASE WHEN usr.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,                      
         ISNULL(SUM(CASE WHEN usr.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive             
       FROM  [dbo].[MST_User](NOLOCK) usr                         
         LEFT JOIN MST_Category(NOLOCK) cat                        
         ON usr.FK_CategoryId = cat.PK_CategoryId                        
         INNER JOIN MST_Role(NOLOCK) rol                        
         ON usr.FK_RoleId = rol.PK_RoleId                        
         LEFT JOIN MST_Account(NOLOCK) acc                        
         ON usr.FK_AccountId = acc.PK_AccountId                        
         LEFT JOIN MST_Country(NOLOCK) cntry                        
         ON usr.FK_CountryId = cntry.PK_CountryId                        
         LEFT JOIN MST_State(NOLOCK) st                        
         ON usr.FK_StateId = st.PK_StateId                        
         LEFT JOIN MST_City(NOLOCK) cty                        
         ON usr.FK_CityId = cty.PK_CityId                        
         LEFT JOIN MST_User(NOLOCK) usrCreated                        
         ON usr.CreatedBy = usrCreated.PK_UserId   
		                     
           where
         ISNULL(usr.IsDeleted,0)=0  
         AND                        
         usr.PK_UserId = CASE WHEN @iPK_UserId <> 0 THEN @iPK_UserId ELSE usr.PK_UserId END                   
     AND         
     1=(        
                            CASE         
       WHEN (usr.FK_AccountId IN            
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
                                                                                ISNULL(usr.FK_AccountId,0) =@iFK_AccountId        
                                                                )  THEN 1        
                                  
                            ELSE 0        
                            END        
                      )         
         AND                        
         ISNULL(usr.UserName,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'UserName' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(usr.UserName,'')                           
            END                      
                         
                                    
         AND                        
         ISNULL(usr.MobileNo,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'MobileNo' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(usr.MobileNo,'')                           
 END                        
                                   
         AND                        
         ISNULL(usr.EmailId,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'EmailId' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(usr.EmailId,'')                           
        END         
   AND                        
         ISNULL(cat.CategoryName,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'AccountCategory' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(cat.CategoryName,'')                           
        END       
   AND               
         ISNULL(rol.RoleName,'') LIKE                            
            CASE                             
              WHEN                               
               (                            
                @cSearchBy <> '' AND @cSearchBy = 'Role' AND LTRIM(RTRIM(@cSearchValue)) <> ''                            
               )                             
              THEN '%'+LTRIM(RTRIM(@cSearchValue))+'%'                             
              ELSE  ISNULL(rol.RoleName,'')                              
        END       
    AND 
	(                      
 ISNULL(acc.AccountName ,'')  LIKE                            
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
  (                    
    (case when CONVERT(CHAR(1),ISNULL(usr.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                                       
    CASE                                         
      WHEN                                           
       (                                        
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                                        
       )                                         
      THEN @cSearchValue                        
      ELSE  (case when CONVERT(CHAR(1),ISNULL(usr.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                                      
    END                                  
    )                                  
                        
 AND                        
 (                  
    convert(varchar(10),concat(isnull(month(usr.CreatedDateTime),'0'),isnull(year(usr.CreatedDateTime),'0'))) =                                       
    CASE                                         
      WHEN                                           
       (                                        
        @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                                        
    )                                         
      THEN convert(varchar(10),concat(month(getdate()),year(getdate())))                        
      ELSE convert(varchar(10),concat(isnull(month(usr.CreatedDateTime),'0'),isnull(year(usr.CreatedDateTime),'0')))                        
    END                                  
    )                        

SELECT
'PK_ID' PK_ID,
'#' SrNo,
'User Name' UserName,
'Role Name' RoleName,
'User Category' CategoryName,
'Account Name' AccountName,
'Mobile No.' MobileNo,
'EmailId' EmailId,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'USER_MASTER'                
                          
END TRY                        
BEGIN CATCH                        
    SELECT 0 [Message_Id], ERROR_MESSAGE() [Message]                         
END CATCH   
