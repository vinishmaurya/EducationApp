/******************************************    
CreatedBy:Vinish
CreatedDate:11-12-2019  
purpos: TO BIND Section GRID
EXEC [ACAD].[USP_SvcGetSectionDetails]
 @iPK_SectionId   = 0
,@cSearchBy       = ''
,@cSearchValue    = ''
,@iRowperPage     = 10
,@iCurrentPage    = 1
,@iUserId         = 0
****************************************************/    
CREATE PROCEDURE [ACAD].[USP_SvcGetSectionDetails]
(
	@iPK_SectionId   BIGINT,
	@cSearchBy       NVARCHAR(50)='',
	@cSearchValue    NVARCHAR(50)='',
	@iRowperPage     INT  ,  
	@iCurrentPage    INT  ,
	@iUserId         BIGINT   = 0
)
AS
BEGIN  TRY  
	      SELECT 1 AS Message_Id, 'SUCCESS' AS Message
	      SELECT 
		  ROW_NUMBER() OVER(ORDER BY CT.PK_SectionId DESC) SrNo, 
	      ISNULL(CT.PK_SectionId,0)PK_ID,
	      ISNULL(CT.SectionName,'')SectionName,
	      ISNULL(CT.IsActive,0)IsActive,
	      CASE WHEN CT.IsActive = 1 THEN 'Active' ELSE 'InActive' END [Status], 
	      ISNULL(FORMAT(CT.CreatedDateTime,'dd/MM/yyyy HH:mm'),'')CreatedDateTime
          FROM MST_Section(NOLOCK) CT
	      WHERE 
	      ISNULL(CT.IsDeleted,0)=0 AND
	      CT.PK_SectionId = CASE WHEN @iPK_SectionId <> 0 THEN @iPK_SectionId ELSE CT.PK_SectionId END
	      --AND CT.CreatedBy=@iUserId
	      AND
	      ISNULL(CT.SectionName,'') LIKE    
          CASE     
              WHEN       
               (    
                @cSearchBy <> '' AND @cSearchBy = 'SectionName' AND @cSearchValue <> ''    
               )     
              THEN '%'+@cSearchValue+'%'     
              ELSE  ISNULL(CT.SectionName,'')   
          END   
	      
	      
	       ORDER BY   CT.PK_SectionId DESC
	      
	       OFFSET (@iCurrentPage-1)*@iRowperPage ROWS     
           FETCH NEXT @iRowperPage ROWS ONLY		
           SELECT 
           ISNULL(COUNT (1),0)  AS TotalItem,
 (      
      SELECT       
         ISNULL(SUM (      
      CASE       
      WHEN YEAR(CT.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(CT.CreatedDateTime)=MONTH(GETDATE())       
    THEN 1       
    ELSE 0 END),0      
      )      
         ) AS TotalCurrentMonth,       
         ISNULL(SUM(CASE WHEN CT.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,      
         ISNULL(SUM(CASE WHEN CT.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive  
   
           FROM MST_Section(NOLOCK) CT
	       WHERE 
           ISNULL(CT.IsDeleted,0)=0 AND
	       CT.PK_SectionId = CASE WHEN @iPK_SectionId <> 0 THEN @iPK_SectionId ELSE CT.PK_SectionId END
	      
	       --AND CT.CreatedBy=@iUserId
	       AND
	       ISNULL(CT.SectionName,'') LIKE    
           CASE     
               WHEN       
                (    
                 @cSearchBy <> '' AND @cSearchBy = 'SectionName' AND @cSearchValue <> ''    
                )     
               THEN '%'+@cSearchValue+'%'     
               ELSE  ISNULL(CT.SectionName,'')   
           END   

		   
SELECT
'PK_ID' PK_ID,
'#' SrNo,
'Section Name' SectionName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM [ACAD].MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'SECTION_MASTER'
	      
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