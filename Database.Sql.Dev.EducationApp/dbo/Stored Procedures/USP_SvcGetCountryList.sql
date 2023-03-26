/******************************************    
CreatedBy:Vinish
CreatedDate:2023-03-14 16:15:49.300
purpos: TO BIND COUNTRY DROPDOWN
EXEC [dbo].[USP_GetCountryList] 
****************************************************/    
CREATE PROCEDURE [dbo].[USP_SvcGetCountryList]
AS
BEGIN TRY  
SELECT 1 AS Message_Id,'Success' AS Message   
	SELECT 
	ISNULL(PK_CountryId, 0)CountryId,
	ISNULL(CountryName,'')CountryName
	
    FROM MST_Country(NOLOCK) CT
	WHERE 
	ISNULL(CT.IsDeleted,0)=0 
	AND 
	ISNULL(CT.IsActive,0)=1
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
