/******************************************    
CreatedBy:Vinish
CreatedDate:11-12-2019  
purpos: TO BIND Subject GRID
EXEC [ACAD].[USP_GetSubjectDetails]
 @iPK_SubjectId   = 0
,@cSearchBy       = ''
,@cSearchValue    = ''
,@iRowperPage     = 10
,@iCurrentPage    = 1
,@iUserId         = 0
****************************************************/    
CREATE PROCEDURE [ACAD].[USP_SvcGetSubjectDetails]
(
	@iPK_SubjectId   BIGINT,
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
		  ROW_NUMBER() OVER(ORDER BY CT.PK_SubjectId DESC) SrNo, 
	      ISNULL(CT.PK_SubjectId,0)PK_ID,
		  ISNULL(CT.FK_MediumId			,'') MediumId,			
		  ISNULL(CT.SubjectName			,'') SubjectName,			
		  ISNULL(M.MediumName			,'') MediumName,			
		  ISNULL(CT.SubjectType			,'') SubjectType,			
		  ISNULL(CT.SubjectCode			,'') SubjectCode,			
		  ISNULL(CT.BackgroundColorCode	,'') BackgroundColorCode	,
		  ISNULL(CT.SubjectImageUrl		,'') SubjectImageUrl		,
	      ISNULL(CT.IsActive,0)IsActive,
	      CASE WHEN CT.IsActive = 1 THEN 'Active' ELSE 'InActive' END [Status], 
	      ISNULL(FORMAT(CT.CreatedDateTime,'dd/MM/yyyy HH:mm'),'')CreatedDateTime
          FROM [ACAD].MST_Subject(NOLOCK) CT
		  LEFT JOIN [ACAD].MST_Medium(NOLOCK) M ON CT.FK_MediumId = M.PK_MediumId
	      WHERE 
	      ISNULL(CT.IsDeleted,0)=0 AND
	      CT.PK_SubjectId = CASE WHEN @iPK_SubjectId <> 0 THEN @iPK_SubjectId ELSE CT.PK_SubjectId END
	      --AND CT.CreatedBy=@iUserId
	      AND
	      ISNULL(CT.SubjectName,'') LIKE    
          CASE     
              WHEN       
               (    
                @cSearchBy <> '' AND @cSearchBy = 'SubjectName' AND @cSearchValue <> ''    
               )     
              THEN '%'+@cSearchValue+'%'     
              ELSE  ISNULL(CT.SubjectName,'')   
          END   
	      
	      
	       ORDER BY   CT.PK_SubjectId DESC
	      
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
   
           FROM MST_Subject(NOLOCK) CT
	       WHERE 
           ISNULL(CT.IsDeleted,0)=0 AND
	       CT.PK_SubjectId = CASE WHEN @iPK_SubjectId <> 0 THEN @iPK_SubjectId ELSE CT.PK_SubjectId END
	      
	       --AND CT.CreatedBy=@iUserId
	       AND
	       ISNULL(CT.SubjectName,'') LIKE    
           CASE     
               WHEN       
                (    
                 @cSearchBy <> '' AND @cSearchBy = 'SubjectName' AND @cSearchValue <> ''    
                )     
               THEN '%'+@cSearchValue+'%'     
               ELSE  ISNULL(CT.SubjectName,'')   
           END   

		   
SELECT
'PK_ID' PK_ID,
'#' SrNo,
'Subject Name' SubjectName,
'Medium Name' MediumName,
'Subject Type' SubjectType,
'Subject Code' SubjectCode,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM [ACAD].MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'SUBJECT_MASTER'
	      
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