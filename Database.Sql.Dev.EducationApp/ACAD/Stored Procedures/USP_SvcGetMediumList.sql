/******************************************    
CreatedBy:Vinish
CreatedDate:2023-03-14 16:15:49.300
purpos: TO BIND Medium DROPDOWN
EXEC [ACAD].[USP_SvcGetMediumList] 
****************************************************/    
CREATE PROCEDURE [ACAD].[USP_SvcGetMediumList]
AS
BEGIN TRY  
SELECT 1 AS Message_Id,'Success' AS Message   
	SELECT 
	ISNULL(PK_MediumId, 0)MediumId,
	ISNULL(MediumName,'')MediumName
	
    FROM [ACAD].MST_Medium(NOLOCK) CT
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