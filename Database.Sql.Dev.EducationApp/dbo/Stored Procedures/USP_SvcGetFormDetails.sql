/******************************************              
CreatedBy:Vinish            
CreatedDate:2023-03-12 12:10:13.510
purpos:Get Form Master Deatils           
[dbo].[USP_GetFormDetails]            
SELECT * FROM MST_Form          
EXEC [dbo].[USP_GetFormDetails] 0,10,1,'',''            
****************************************************/            
CREATE PROCEDURE [dbo].[USP_SvcGetFormDetails]          
 (          
 @iPK_FormId              BIGINT,           
 @iRowperPage             BIGINT,          
 @iCurrentPage            BIGINT,          
 @cSearchBy               NVARCHAR(50),            
 @cSearchValue            NVARCHAR(50)              
 )           
AS              
BEGIN TRY              
         SELECT 1 [Message_Id],'Success' [Message];
		 
         SELECT          
		 ROW_NUMBER() OVER(ORDER BY frm.PK_FormId DESC) SrNo, 
         ISNULL(frm.PK_FormId,0)PK_ID,          
         ISNULL(frm.FormName, '')FormName,         
         ISNULL(form.FormName,'NA') AS ParentForm,          
         ISNULL(frm.ControllerName, '') ComponentName,        
         ISNULL(frm.ClassName,'') ClassName,         
         ISNULL(frm.Area, '') Area,        
         ISNULL(frm.FK_ParentId,0)   ParentId,       
         ISNULL(frm.ActionName, '')ActionName,         
         --ISNULL(frm.FK_SolutionId,0) 
		 @iPK_FormId FK_SolutionId,         
         --ISNULL(sol.SolutionName,'NA')
		 'NA' SolutionName,          
         ISNULL(frm.IsActive,0)As IsActive,          
         ISNULL(frm.FK_MainId,0) FK_MainId,          
         ISNULL(frm.LevelId,0) LevelId,          
         ISNULL(frm.SortId,0)  SortId,          
         ISNULL(frm.[Image],'') [Image],          
         CASE WHEN frm.IsActive = 1 THEN 'Active' ELSE 'Inactive' END [Status],          
         ISNULL(FORMAT(frm.CreatedDate,'dd/MM/yyyy HH:mm'),'') CreatedDateTime,
		 ISNULL(frm.FormFor,'') As PlatFormType,
		 ISNULL(frm.SPA_ComponentHref,'') As ComponentPath
         FROM  [dbo].[MST_Form]  (NOLOCK) frm           
         --INNER JOIN  [dbo].[MST_Solution] (NOLOCK) sol          
         --ON frm.FK_SolutionId =sol.PK_SolutionId          
         LEFT JOIN [dbo].[MST_Form] (NOLOCK) form          
         ON form.PK_FormId=frm.FK_ParentId          
         where  Isnull(frm.IsDeleted,0)=0  AND         
         frm.Pk_FormId = CASE WHEN @iPK_FormId=0 THEN frm.Pk_FormId  ELSE   @iPK_FormId END        
         
        and  
    (            
    (case when CONVERT(CHAR(1),ISNULL(frm.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
    CASE                   
      WHEN                     
       (                  
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
       )                   
      THEN @cSearchValue  
      ELSE  (case when CONVERT(CHAR(1),ISNULL(frm.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
    END            
    )      
      AND    
      convert(varchar(10),concat(isnull(month(frm.CreatedDate),'0'),isnull(year(frm.CreatedDate),'0'))) in     
      (    
        Case When @cSearchBy <>''AND @cSearchBy = 'ThisMonth' AND @cSearchValue = ''      
     Then  convert(varchar(10),concat(month(getdate()),year(getdate())))   ELSE  convert(varchar(10),concat(isnull(month(frm.CreatedDate),'0'),isnull(year(frm.CreatedDate),'0'))) END      
      )    
         
           
         AND          
         ISNULL(frm.FormName,'') LIKE              
         CASE               
           WHEN                 
            (              
             @cSearchBy <> '' AND @cSearchBy = 'FormName' AND @cSearchValue <> ''              
            )               
           THEN '%'+@cSearchValue+'%'               
           ELSE  ISNULL(frm.FormName,'')             
         END           
         AND          
         ISNULL(frm.ControllerName,'') LIKE              
  CASE           
           WHEN                 
            (              
             @cSearchBy <> '' AND @cSearchBy = 'ControllerName' AND @cSearchValue <> ''              
   )               
           THEN '%'+@cSearchValue+'%'               
           ELSE  ISNULL(frm.ControllerName,'')             
         END             
            
         AND    
         ISNULL(frm.Area,'') LIKE              
         CASE               
           WHEN                 
            (              
             @cSearchBy <> '' AND @cSearchBy = 'Area' AND @cSearchValue <> ''   
            )               
           THEN '%'+@cSearchValue+'%'               
           ELSE  ISNULL(frm.Area,'')             
         END             
         AND          
         ISNULL(frm.ActionName,'') LIKE              
         CASE               
           WHEN                 
            (              
             @cSearchBy <> '' AND @cSearchBy = 'ActionName' AND @cSearchValue <> ''              
            )               
          THEN '%'+@cSearchValue+'%'               
          ELSE  ISNULL(frm.ActionName,'')             
          END            
          
          ORDER BY frm.CreatedDate DESC              
          OFFSET (@iCurrentPage-1)*@iRowperPage ROWS               
          FETCH NEXT @iRowperPage ROWS ONLY      
  
/***********************Start Pagination **********************************/             
             
                    SELECT       
         ISNULL(COUNT (1),0)  AS TotalItem,      
         (      
      SELECT       
         ISNULL(SUM (      
      CASE       
      WHEN YEAR(frm.CreatedDate)=YEAR(GETDATE()) AND MONTH(frm.CreatedDate)=MONTH(GETDATE())       
    THEN 1       
    ELSE 0 END),0      
      )      
         ) AS TotalCurrentMonth,       
         ISNULL(SUM(CASE WHEN frm.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,      
         ISNULL(SUM(CASE WHEN frm.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive           
          FROM  [dbo].[MST_Form]  (NOLOCK) frm           
          --INNER JOIN  [dbo].[MST_Solution] (NOLOCK) sol          
          --ON frm.FK_SolutionId =sol.PK_SolutionId          
          LEFT JOIN [dbo].[MST_Form] (NOLOCK) form          
          ON form.PK_FormId=frm.FK_ParentId          
          where Isnull(frm.IsDeleted,0)=0  AND         
          frm.Pk_FormId = CASE WHEN @iPK_FormId=0 THEN frm.Pk_FormId  ELSE   @iPK_FormId END       
          
   
	  and  
    (            
    (case when CONVERT(CHAR(1),ISNULL(frm.IsActive,'')) = '1' then 'Active' else 'Inactive' end ) like                 
    CASE                   
      WHEN                     
       (                  
        @cSearchBy <> '' AND @cSearchBy = 'Status' AND LTRIM(RTRIM(@cSearchValue)) <> ''                  
       )                   
      THEN @cSearchValue  
      ELSE  (case when CONVERT(CHAR(1),ISNULL(frm.IsActive,'')) = '1' then 'Active' else 'Inactive' end )                
    END            
    )    

      AND    
      convert(varchar(10),concat(isnull(month(frm.CreatedDate),'0'),isnull(year(frm.CreatedDate),'0'))) in     
      (    
        Case When @cSearchBy <>''AND @cSearchBy = 'ThisMonth' AND @cSearchValue = ''      
     Then  convert(varchar(10),concat(month(getdate()),year(getdate())))   ELSE  convert(varchar(10),concat(isnull(month(frm.CreatedDate),'0'),isnull(year(frm.CreatedDate),'0'))) END      
      )    
          AND          
          ISNULL(frm.FormName,'') LIKE              
          CASE               
           WHEN                 
           (              
              @cSearchBy <> '' AND @cSearchBy = 'FormName' AND @cSearchValue <> ''              
             )               
            THEN '%'+@cSearchValue+'%'               
            ELSE  ISNULL(frm.FormName,'')             
          END     
          AND       
    ISNULL(frm.ControllerName,'') LIKE              
          CASE               
            WHEN                 
             (              
              @cSearchBy <> '' AND @cSearchBy = 'ControllerName' AND @cSearchValue <> ''              
             )           
            THEN '%'+@cSearchValue+'%'               
            ELSE  ISNULL(frm.ControllerName,'')             
          END             
              
          AND          
          ISNULL(frm.Area,'') LIKE              
          CASE               
            WHEN                 
             (              
              @cSearchBy <> '' AND @cSearchBy = 'Area' AND @cSearchValue <> ''              
        )               
 THEN '%'+@cSearchValue+'%'               
ELSE  ISNULL(frm.Area,'')             
          END             
         AND          
         ISNULL(frm.ActionName,'') LIKE              
          CASE               
            WHEN                 
             (              
              @cSearchBy <> '' AND @cSearchBy = 'ActionName' AND @cSearchValue <> ''              
             )               
            THEN '%'+@cSearchValue+'%'               
            ELSE  ISNULL(frm.ActionName,'')             
           END            
/***********************End Pagination **********************************/  

SELECT
'PK_ID' PK_ID,
'#' SrNo,
'FormName' FormName,
'Component Name' ComponentName,
'Area' Area,
'Landing Component' ActionName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'FORM_MASTER'

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
