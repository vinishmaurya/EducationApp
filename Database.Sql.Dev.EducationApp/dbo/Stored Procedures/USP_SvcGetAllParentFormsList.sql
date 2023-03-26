/******************************************        
CreatedBy: Vinish
CreatedDate: 2023-03-14 16:14:17.563     
purpos: GetParentId DROPDOWN    
EXEC [dbo].[USP_GetAllParentFormsList]     
****************************************************/        
CREATE PROCEDURE [dbo].[USP_SvcGetAllParentFormsList]    
AS    
BEGIN TRY 
	SELECT 1 AS Message_Id,'Success' AS Message        
	SELECT     
    ISNULL(Pk_FormId,0) FormId,
    ISNULL(FormName ,'') FormName  
    FROM MST_Form(NOLOCK)     
    WHERE IsActive = 1 AND ISNULL(FK_ParentId,0) = 0 
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
