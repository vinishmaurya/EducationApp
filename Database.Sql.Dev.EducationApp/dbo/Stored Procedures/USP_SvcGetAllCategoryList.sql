/******************************************  
CreatedBy:Vinish
CreatedDate:2020-05-01 15:54:20.423
purpos:Get All Category List

EXEC [dbo].[USP_GetAllCategoryList] 
****************************************************/  
CREATE PROCEDURE [dbo].[USP_SvcGetAllCategoryList]          
AS
BEGIN TRY
	SELECT 1 AS Message_Id,'Success!' AS Message   
	SELECT
	ISNULL(PK_CategoryId,0)PK_CategoryId,
	ISNULL(CategoryName,'')CategoryName
    FROM MST_Category(NOLOCK)
	WHERE 
	ISNULL(IsDeleted,0)=0 and ISNULL(IsActive,0)=1
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
