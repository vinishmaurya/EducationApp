/******************************************    
CreatedBy:Vinish
CreatedDate:11-12-2019  
purpos:Get State Details 
****************************************************/    
CREATE PROCEDURE [dbo].[USP_SvcGetStateDetails]  
(
	@iPK_StateId BIGINT,
	@cSearchBy NVARCHAR(50)='',
	@cSearchValue NVARCHAR(50)='',
	@iRowperPage  INT  ,  
	@iCurrentPage  INT,
	@iUserId       BIGINT   =0 
)    
AS
BEGIN TRY
SELECT 1 AS Message_Id, 'SUCCESS' AS Message
SELECT 
ROW_NUMBER() OVER(ORDER BY st.PK_StateId DESC) SrNo, 
ISNULL(st.PK_StateId,0)PK_ID,
ISNULL(st.StateName,'')StateName,
ISNULL(st.IsActive,0)IsActive,
ISNULL(st.FK_CountryId,0) CountryId,
CASE WHEN st.IsActive = 1 THEN 'Active' ELSE 'InActive' END [Status], 
FORMAT(st.CreatedDateTime,'dd/MM/yyyy HH:mm') CreatedDateTime,
ISNULL(cntry.CountryName,'')CountryName
FROM MST_State(NOLOCK) st 
INNER JOIN MST_Country(NOLOCK) cntry
ON st.FK_CountryId = cntry.PK_CountryId
WHERE 
ISNULL(st.IsDeleted,0)=0 AND
--st.IsActive = 1
--AND 
st.PK_StateId = CASE WHEN @iPK_StateId <> 0 THEN @iPK_StateId ELSE st.PK_StateId END
--AND st.CreatedBy=@iUserId
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

 ORDER BY st.PK_StateId DESC 
 OFFSET (@iCurrentPage-1)*@iRowperPage ROWS     
 FETCH NEXT @iRowperPage ROWS ONLY		
 SELECT 
 ISNULL(COUNT (1),0)  AS TotalItem,
 (      
      SELECT       
         ISNULL(SUM (      
      CASE       
      WHEN YEAR(st.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(st.CreatedDateTime)=MONTH(GETDATE())       
    THEN 1       
    ELSE 0 END),0      
      )      
         ) AS TotalCurrentMonth,       
         ISNULL(SUM(CASE WHEN st.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,      
         ISNULL(SUM(CASE WHEN st.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive          

 FROM MST_State(NOLOCK) st 
 INNER JOIN MST_Country(NOLOCK) cntry
 ON st.FK_CountryId = cntry.PK_CountryId
 WHERE 
 ISNULL(st.IsDeleted,0)=0 AND
 --st.IsActive = 1
 --AND 
 st.PK_StateId = CASE WHEN @iPK_StateId <> 0 THEN @iPK_StateId ELSE st.PK_StateId END
 --AND st.CreatedBy=@iUserId
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
 
SELECT
'PK_ID' PK_ID,
'#' SrNo,
'State Name' StateName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'STATE_MASTER'
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

