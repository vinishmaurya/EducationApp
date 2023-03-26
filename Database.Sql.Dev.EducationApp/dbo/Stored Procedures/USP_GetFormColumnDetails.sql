/******************************************                    
CREATED BY:Vinish        
CREATED DATE:02 January 2020                    
PURPOSE:To Get  Form Column  Details      
select * from MST_FormColumn                 
EXEC [dbo].[USP_GetFormColumnDetails] 0,10,1,'','',1,1           
****************************************************/      
CREATE PROCEDURE [dbo].[USP_GetFormColumnDetails]      
(      
  @iPK_FormColumnId        BIGINT,      
  @iRowperPage             BIGINT,       
  @iCurrentPage            BIGINT,       
  @cSearchBy               NVARCHAR(50),          
  @cSearchValue            NVARCHAR(50) ,      
  @iFK_AccountId           INT=1,      
  @iUserId                 INT=1 ,
   @iFK_CustomerId   BIGINT=0, 
    @cLoginType          nvarchar(100)=''  
      
)      
AS      
BEGIN TRY      
         SELECT 1 AS Message_Id,'Success' AS Message       
         SELECT       
               ISNULL(FRMCLMN.PK_FormColumnId,0)PK_FormColumnId,      
               ISNULL(FRMCLMN.Column_Name,'')Column_Name,      
               ISNULL(FRMCLMN.FK_AccountId,0)FK_AccountId,    
               ISNULL(acc.AccountName,'')AccountName,      
               ISNULL(FRMCLMN.FK_FormId,0)FK_FormId,      
               ISNULL(FRM.FormName,'') FormName      
               FROM MST_FormColumn (NOLOCK) FRMCLMN      
               LEFT JOIN MST_FORM  (NOLOCK) FRM  ON FRM.PK_FormId = FRMCLMN.FK_FormId     
               LEFT JOIN MST_Account  (NOLOCK) acc  ON acc.PK_AccountId = FRMCLMN.FK_AccountId      
               WHERE  ISNULL(FRMCLMN.IsDeleted,0)=0 AND    
               FRMCLMN.PK_FormColumnId  IN (CASE WHEN @iPK_FormColumnId=0 THEN FRMCLMN.PK_FormColumnId ELSE @iPK_FormColumnId END)    
      and    
               (              
                 (case when CONVERT(CHAR(1),ISNULL(FRMCLMN.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                   
                 CASE                     
                   WHEN                       
                    (                    
                     @cSearchBy <> '' AND @cSearchBy = 'Status' AND @cSearchValue <> ''                    
                    )                     
                   THEN @cSearchValue    
                   ELSE  (case when CONVERT(CHAR(1),ISNULL(FRMCLMN.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                  
                 END              
                 )              
                 
                and    
                (              
                 convert(varchar(10),concat(isnull(month(FRMCLMN.CreatedDateTime),'0'),isnull(year(FRMCLMN.CreatedDateTime),'0'))) =                   
                 CASE                     
                   WHEN                       
                    (                    
                     @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                    
                  )                     
                   THEN convert(varchar(10),concat(month(getdate()),year(getdate())))    
                   ELSE convert(varchar(10),concat(isnull(month(FRMCLMN.CreatedDateTime),'0'),isnull(year(FRMCLMN.CreatedDateTime),'0')))    
                 END              
                 )   
               AND      
               ISNULL(FRMCLMN.Form_Name,'') LIKE          
               CASE           
                WHEN             
                 (          
                  @cSearchBy <> '' AND @cSearchBy = 'Form_Name' AND @cSearchValue <> ''          
                 )           
                THEN '%'+@cSearchValue+'%'           
                ELSE  ISNULL(FRMCLMN.Form_Name,'')         
               END        
      
               AND      
               ISNULL(FRMCLMN.Column_Name,'') LIKE          
                CASE           
                  WHEN             
                   (          
                    @cSearchBy <> '' AND @cSearchBy = 'Column_Name' AND @cSearchValue <> ''          
                   )           
               THEN '%'+@cSearchValue+'%'           
               ELSE  ISNULL(FRMCLMN.Column_Name,'')         
 END       
               ORDER BY FRMCLMN.PK_FormColumnId desc          
               OFFSET (@iCurrentPage-1)*@iRowperPage ROWS           
               FETCH NEXT @iRowperPage ROWS ONLY      
               SELECT         
               ISNULL(COUNT (1),0)  AS TotalItem,    
                  (      
               SELECT       
               ISNULL(SUM (      
               CASE       
               WHEN YEAR(FRMCLMN.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(FRMCLMN.CreatedDateTime)=MONTH(GETDATE())       
               THEN 1       
               ELSE 0 END),0      
                )      
                  ) AS TotalCurrentMonth,       
               ISNULL(SUM(CASE WHEN FRMCLMN.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,      
               ISNULL(SUM(CASE WHEN FRMCLMN.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive       
               FROM MST_FormColumn (NOLOCK) FRMCLMN      
               LEFT JOIN MST_FORM  (NOLOCK) FRM  ON FRM.PK_FormId = FRMCLMN.FK_FormId      
               WHERE  ISNULL(FRMCLMN.IsDeleted,0)=0 AND      
               FRMCLMN.PK_FormColumnId  IN (CASE WHEN @iPK_FormColumnId=0 THEN FRMCLMN.PK_FormColumnId ELSE @iPK_FormColumnId END)      
               AND    
               (              
                 (case when CONVERT(CHAR(1),ISNULL(FRMCLMN.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                   
                 CASE                     
                   WHEN                       
                    (                    
                     @cSearchBy <> '' AND @cSearchBy = 'Status' AND @cSearchValue <> ''                    
                    )                     
                   THEN @cSearchValue    
                   ELSE  (case when CONVERT(CHAR(1),ISNULL(FRMCLMN.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                  
                 END              
                 )              
                 
                AND    
                (              
                 convert(varchar(10),concat(isnull(month(FRMCLMN.CreatedDateTime),'0'),isnull(year(FRMCLMN.CreatedDateTime),'0'))) =                   
                 CASE                     
                   WHEN                       
                    (                    
                     @cSearchBy <> '' AND @cSearchBy = 'ThisMonth'                    
                  )                     
                   THEN convert(varchar(10),concat(month(getdate()),year(getdate())))    
                   ELSE convert(varchar(10),concat(isnull(month(FRMCLMN.CreatedDateTime),'0'),isnull(year(FRMCLMN.CreatedDateTime),'0')))    
                 END              
                 )  
      AND      
               ISNULL(FRMCLMN.Form_Name,'') LIKE          
               CASE           
                WHEN             
                 (          
                  @cSearchBy <> '' AND @cSearchBy = 'Form_Name' AND @cSearchValue <> ''          
                 )           
                THEN '%'+@cSearchValue+'%'           
                ELSE  ISNULL(FRMCLMN.Form_Name,'')         
               END        
      
               AND      
               ISNULL(FRMCLMN.Column_Name,'') LIKE          
                CASE           
                  WHEN             
                   (          
                    @cSearchBy <> '' AND @cSearchBy = 'Column_Name' AND @cSearchValue <> ''          
                   )           
                  THEN '%'+@cSearchValue+'%'           
                  ELSE  ISNULL(FRMCLMN.Column_Name,'')         
                  END       
                 END TRY                
BEGIN CATCH                
    SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                
END CATCH 




