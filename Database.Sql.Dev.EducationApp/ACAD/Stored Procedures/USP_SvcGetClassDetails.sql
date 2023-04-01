/******************************************    
CreatedBy:Vinish
CreatedDate:11-12-2019  
purpos: TO BIND Class GRID
EXEC [ACAD].[USP_SvcGetClassDetails]
 @iPK_ClassId   = 0
,@cSearchBy       = ''
,@cSearchValue    = ''
,@iRowperPage     = 10
,@iCurrentPage    = 1
,@iUserId         = 0
****************************************************/    
CREATE PROCEDURE [ACAD].[USP_SvcGetClassDetails]
(
	@iPK_ClassId   BIGINT,
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
		  ROW_NUMBER() OVER(ORDER BY CT.PK_ClassId DESC) SrNo, 
	      ISNULL(CT.PK_ClassId,0)PK_ID,
		  ISNULL(CT.FK_MediumId			,'') MediumId,			
		  ISNULL(CT.ClassName			,'') ClassName,			
		  ISNULL(M.MediumName			,'') MediumName,			
		  ISNULL(CT.FK_SectionIds,'') SectionIds,
		  STUFF
		  (
		  	(
		  		SELECT ', ' + ISNULL(B.SectionName,'') from [dbo].SplitString(ISNULL(CT.FK_SectionIds,''),',') A
				INNER JOIN [ACAD].MST_Section(NOLOCK) B ON A.Item = B.PK_SectionId AND B.IsActive = 1 AND ISNULL(B.IsDeleted,0) = 0
		  		FOR XML PATH(''), TYPE
		  	).value('.','NVARCHAR(MAX)'),1,2,' '
		  ) SectionNames,
	      ISNULL(CT.IsActive,0)IsActive,
	      CASE WHEN CT.IsActive = 1 THEN 'Active' ELSE 'InActive' END [Status], 
	      ISNULL(FORMAT(CT.CreatedDateTime,'dd/MM/yyyy HH:mm'),'')CreatedDateTime
          FROM [ACAD].MST_Class(NOLOCK) CT
		  LEFT JOIN [ACAD].MST_Medium(NOLOCK) M ON CT.FK_MediumId = M.PK_MediumId
	      WHERE 
	      ISNULL(CT.IsDeleted,0)=0 AND
	      CT.PK_ClassId = CASE WHEN @iPK_ClassId <> 0 THEN @iPK_ClassId ELSE CT.PK_ClassId END
	      --AND CT.CreatedBy=@iUserId
	      AND
	      ISNULL(CT.ClassName,'') LIKE    
          CASE     
              WHEN       
               (    
                @cSearchBy <> '' AND @cSearchBy = 'ClassName' AND @cSearchValue <> ''    
               )     
              THEN '%'+@cSearchValue+'%'     
              ELSE  ISNULL(CT.ClassName,'')   
          END   
	      
	      
	       ORDER BY   CT.PK_ClassId DESC
	      
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
   
           FROM MST_Class(NOLOCK) CT
	       WHERE 
           ISNULL(CT.IsDeleted,0)=0 AND
	       CT.PK_ClassId = CASE WHEN @iPK_ClassId <> 0 THEN @iPK_ClassId ELSE CT.PK_ClassId END
	      
	       --AND CT.CreatedBy=@iUserId
	       AND
	       ISNULL(CT.ClassName,'') LIKE    
           CASE     
               WHEN       
                (    
                 @cSearchBy <> '' AND @cSearchBy = 'ClassName' AND @cSearchValue <> ''    
                )     
               THEN '%'+@cSearchValue+'%'     
               ELSE  ISNULL(CT.ClassName,'')   
           END   

		   
SELECT
'PK_ID' PK_ID,
'#' SrNo,
'Class Name' ClassName,
'Medium Name' MediumName,
'Section' SectionNames,
'Class Type' ClassType,
'Class Code' ClassCode,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM [ACAD].MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'CLASS_MASTER'
	      
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