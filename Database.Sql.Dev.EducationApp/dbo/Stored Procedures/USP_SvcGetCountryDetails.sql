/******************************************    
CreatedBy:Vinish
CreatedDate:11-12-2019  
purpos: TO BIND COUNTRY GRID
EXEC [dbo].[USP_GetCountryDetails]
 @iPK_CountryId   = 0
,@cSearchBy       = ''
,@cSearchValue    = ''
,@iRowperPage     = 10
,@iCurrentPage    = 1
,@iUserId         = 0
****************************************************/    
CREATE PROCEDURE [dbo].[USP_SvcGetCountryDetails]
(
	@iPK_CountryId   BIGINT,
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
		  ROW_NUMBER() OVER(ORDER BY CT.PK_CountryId DESC) SrNo, 
	      ISNULL(CT.PK_CountryId,0)PK_ID,
	      ISNULL(CT.CountryName,'')CountryName,
	      ISNULL(CT.IsActive,0)IsActive,
	      CASE WHEN CT.IsActive = 1 THEN 'Active' ELSE 'InActive' END [Status], 
	      ISNULL(FORMAT(CT.CreatedDateTime,'dd/MM/yyyy HH:mm'),'')CreatedDateTime
          FROM MST_Country(NOLOCK) CT
	      WHERE 
	      ISNULL(CT.IsDeleted,0)=0 AND
	      CT.PK_CountryId = CASE WHEN @iPK_CountryId <> 0 THEN @iPK_CountryId ELSE CT.PK_CountryId END
	      --AND CT.CreatedBy=@iUserId
	      AND
	      ISNULL(CT.CountryName,'') LIKE    
          CASE     
              WHEN       
               (    
                @cSearchBy <> '' AND @cSearchBy = 'CountryName' AND @cSearchValue <> ''    
               )     
              THEN '%'+@cSearchValue+'%'     
              ELSE  ISNULL(CT.CountryName,'')   
          END   
	      
	      
	       ORDER BY   CT.PK_CountryId DESC
	      
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
   
           FROM MST_Country(NOLOCK) CT
	       WHERE 
           ISNULL(CT.IsDeleted,0)=0 AND
	       CT.PK_CountryId = CASE WHEN @iPK_CountryId <> 0 THEN @iPK_CountryId ELSE CT.PK_CountryId END
	      
	       --AND CT.CreatedBy=@iUserId
	       AND
	       ISNULL(CT.CountryName,'') LIKE    
           CASE     
               WHEN       
                (    
                 @cSearchBy <> '' AND @cSearchBy = 'CountryName' AND @cSearchValue <> ''    
                )     
               THEN '%'+@cSearchValue+'%'     
               ELSE  ISNULL(CT.CountryName,'')   
           END   

		   
SELECT
'PK_ID' PK_ID,
'#' SrNo,
'Country Name' CountryName,
'Created Datetime' CreatedDateTime,
'Status' [Status],
'Action' [Action]

SELECT SearchByText,SearchByValue,ISNULL(IsDefaultSelection,'') IsDefaultSelection FROM MST_SearchTerms(NOLOCK) 
WHERE FormCode = 'COUNTRY_MASTER'
	      
END TRY

BEGIN CATCH
	SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message

END CATCH
