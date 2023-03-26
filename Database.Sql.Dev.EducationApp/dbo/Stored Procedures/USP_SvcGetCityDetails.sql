/******************************************    
CreatedBy:Vinish 
CreatedDate:05-12-2019  
purpos:Get City Master  
****************************************************/        
CREATE PROCEDURE [dbo].[USP_SvcGetCityDetails]  
(
	@iPK_CityId BIGINT,	
	@cSearchBy NVARCHAR(50)='',
	@cSearchValue NVARCHAR(50)='',
	@iRowperPage  INT  ,  
	@iCurrentPage  INT   ,
	@iUserId       BIGINT   = 0 
)        
AS
BEGIN TRY
	   SELECT	1 AS Message_Id,'Success' AS Message 
       SELECT 
	   ROW_NUMBER() OVER(ORDER BY ct.PK_CityId DESC) SrNo, 
	   ISNULL(ct.PK_CityId, 0)PK_ID,
	   ISNULL(cont.CountryName, '')CountryName,
       ISNULL(st.StateName,'')StateName,
	   ISNULL(ct.CityName,'')CityName,
	   ISNULL(ct.CreatedBy,0)CreatedBy,
	   ISNULL(ct.FK_CountryId,0)CountryId,
	   ISNULL(ct.FK_StateId,0)StateId,
	   ISNULL(ct.IsActive,0)IsActive,
	   CASE WHEN ct.IsActive = 1 THEN 'Active' ELSE 'InActive' END [Status],
	   FORMAT(st.CreatedDateTime,'dd/MM/yyyy HH:mm') CreatedDateTime
       FROM MST_City(NOLOCK) ct
       INNER JOIN MST_State st		ON ct.FK_StateId = st.PK_StateId
       INNER JOIN MST_Country cont	ON cont.PK_CountryId = st.FK_CountryId
	   WHERE 
	   Isnull(ct.IsDeleted,0)=0 AND
	   ct.PK_CityId = CASE WHEN @iPK_CityId <> 0 THEN @iPK_CityId ELSE ct.PK_CityId END
	   --AND CT.CreatedBy=@iUserId
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
	   ISNULL(cont.CountryName,'') LIKE    
         CASE     
           WHEN       
            (    
             @cSearchBy <> '' AND @cSearchBy = 'CountryName' AND @cSearchValue <> ''    
            )     
           THEN '%'+@cSearchValue+'%'     
           ELSE  ISNULL(cont.CountryName,'')   
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

		 ORDER BY ct.PK_CityId DESC 
		 OFFSET (@iCurrentPage-1)*@iRowperPage ROWS     
		 FETCH NEXT @iRowperPage ROWS ONLY
		       SELECT 
         ISNULL(COUNT (1),0)  AS TotalItem,
 (      
      SELECT       
         ISNULL(SUM (      
      CASE       
      WHEN YEAR(ct.CreatedDateTime)=YEAR(GETDATE()) AND MONTH(ct.CreatedDateTime)=MONTH(GETDATE())       
    THEN 1       
    ELSE 0 END),0      
      )      
         ) AS TotalCurrentMonth,       
         ISNULL(SUM(CASE WHEN ct.IsActive =1 THEN 1 ELSE 0 END),0)AS TotalActive,      
         ISNULL(SUM(CASE WHEN ct.IsActive =0 THEN 1 ELSE 0 END),0)AS TotalInActive          

   
		 FROM MST_City(NOLOCK) ct
         INNER JOIN MST_State st		ON ct.FK_StateId = st.PK_StateId
         INNER JOIN MST_Country cont	ON cont.PK_CountryId = st.FK_CountryId
	     WHERE 
	     Isnull(ct.IsDeleted,0)=0 
		 --AND
	     --CT.CreatedBy=@iUserId
	     AND ct.PK_CityId = CASE WHEN @iPK_CityId <> 0 THEN @iPK_CityId ELSE ct.PK_CityId END

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
	    
	    ISNULL(cont.CountryName,'') LIKE    
         CASE     
           WHEN       
            (    
             @cSearchBy <> '' AND @cSearchBy = 'CountryName' AND @cSearchValue <> ''    
            )     
           THEN '%'+@cSearchValue+'%'     
           ELSE  ISNULL(cont.CountryName,'')   
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
'Country Name' CountryName,
'State Name' StateName,
'City Name' CityName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'CITY_MASTER'
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
