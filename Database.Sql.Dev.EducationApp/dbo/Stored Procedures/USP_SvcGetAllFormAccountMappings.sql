/*****************************************************************  
Created By: Vinish
Created Date: 2023-03-18 15:31:57.520
Purpose: Get Account Form Mapping With FormId And AccountId
EXEC [dbo].[USP_GetAllFormAccountMappings] 0,0
*******************************************************************/  
CREATE PROCEDURE [dbo].[USP_SvcGetAllFormAccountMappings]  
(  
	@iPK_AccountId BIGINT, 
	@iPK_FormId  BIGINT
)  
AS   
BEGIN TRY  
	DECLARE @CategoryId BIGINT = (SELECT TOP 1 FK_CategoryId FROM DBO.MST_Account(NOLOCK) WHERE PK_AccountId = @iPK_AccountId);
	/*Select status*/
	SELECT 1 AS Message_Id, 'Success' AS Message   
	
	/*Select mapping column*/
	SELECT
		'All' [All],
		'View' CanView,
		'Add' CanAdd,
		'Edit' CanEdit,
		'Delete' CanDelete,
		'Export' CanExport
	/*Select and join stored temp form account mappings and form Account mappings */
	
	;WITH FormList AS      
		(   
			/*Select all active forms*/
			SELECT  PK_FormId, FormName,FK_ParentId,LevelId,SortId
			FROM MST_Form(NOLOCK) where ISNULL(FK_ParentId,0) =0     
			and PK_FormId=@iPK_FormId AND isActive=1  AND (UPPER(ISNULL(FormFor,'ALL'))='WEB'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' ) 
			UNION ALL      
			/*Select all active parent forms*/
			SELECT  a.PK_FormId, a.FormName, a.FK_ParentId ,a.LevelId,a.SortId      
			FROM MST_Form a      
			--JOIN FormList b on a.FK_ParentId=b.PK_FormId      
			WHERE a.FK_ParentId =@iPK_FormId AND ISNULL(a.isActive,0)=1   AND (UPPER(ISNULL(FormFor,'ALL'))='WEB'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )   
		)      
		SELECT  
		FRMCMP.PK_FormAccountId FormAccountId,
		@iPK_AccountId as AccountId,  
		@CategoryId CategoryId,
		FRMLIST.PK_FormId AS FormId,   
		FRMLIST.FormName,  
		FRMLIST.FK_ParentId ParentId,  
		FRMLIST.LevelId,  
		FRMLIST.SortId,  
		ISNULL(FRMCMP.CanAdd   ,0)CanAdd,  
		ISNULL(FRMCMP.CanDelete,0)CanDelete,  
		ISNULL(FRMCMP.CanView  ,0)CanView,  
		ISNULL(FRMCMP.CanEdit ,0)CanEdit,
		ISNULL(FRMCMP.CanExport ,0)CanExport,
		ISNULL(FRMCMP.IsActive ,0)IsActive,
		ISNULL(FRMCMP.CreatedBy ,0)CreatedBy
		FROM  FormList FRMLIST      
		LEFT JOIN Map_FormAccount(NOLOCK) FRMCMP   
		ON FRMLIST.PK_FormId=FRMCMP.FK_FormId
		AND 
		1=
		(
			CASE 
				WHEN ISNULL(FRMCMP.FK_AccountId,0)=@iPK_AccountId
				THEN 1		 
				ELSE 0 
			END
		)
		WHERE ISNULL(@iPK_AccountId,0) <> 0
		ORDER BY FK_ParentId ASC
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
