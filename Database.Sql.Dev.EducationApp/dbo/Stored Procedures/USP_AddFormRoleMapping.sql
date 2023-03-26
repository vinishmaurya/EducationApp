/*******************************************
CREATED BY-sandeep kumar
Date-02-Dec-2019
EXEC  [dbo].[USP_AddFormRoleMapping]   3,3,3,1,1,1
******************************************/
CREATE PROCEDURE [dbo].[USP_AddFormRoleMapping]  
(
	@iRoleId		BIGINT,
	@iFormId		BIGINT,  
	@iFK_CategoryId BIGINT,
	@IsActive		BIT,
	@iCompanyId		BIGINT,
	@iUserId		BIGINT
)    
AS    
BEGIN TRY
	IF NOT EXISTS(SELECT 1 FROM MAP_FormRole (NOLOCK) frmrole WHERE frmrole.FK_FormId=@iFormId AND frmrole.FK_RoleId=@iRoleId AND frmrole.IsActive=1)
	BEGIN     
		IF(@iRoleId=0)
		BEGIN
			IF OBJECT_ID('tempdb..#tmpformrole') IS NOT NULL

			DROP TABLE #tmpformrole
			
			CREATE TABLE #tmpformrole
			(
				FK_RoleId INT
			) 
			  
			INSERT INTO #tmpformrole
			(
				FK_RoleId
			)

			SELECT			 
			PK_RoleId 
			FROM MST_Role(NOLOCK) roletb
			WHERE 
			roletb.FK_CategoryId IN (SELECT PK_CategoryId FROM MST_Category(NOLOCK) category WHERE 
			category.PK_CategoryId=@iFK_CategoryId OR category.FK_CompanyId=@iCompanyId) 
			AND PK_RoleId  NOT IN (Select  FK_RoleId from MAP_FormRole where FK_FormId=@iFormId)
			
			INSERT INTO MAP_FormRole
			(  
				FK_FormId, 
				FK_RoleId,
				CreatedBy,  
				IsActive,
				CanAdd,
				CanDelete,
				CanEdit,
				CanView,
				IsDeleted,
				CreatedDateTime 
			)  
			SELECT 
			DISTINCT  
			@iFormId,  
			Tmp.FK_RoleId,
			@iUserId,  
			@IsActive,
			0,
			0,
			0,
			1,
			0,
			GETDATE()
			FROM #tmpformrole Tmp
													
			SELECT 1 AS Message_Id,'Form Role Mapping Successfully Done.' As Message
		END

		ELSE
		BEGIN
			INSERT INTO  MAP_FormRole  
			(  
				FK_FormId, 
				FK_RoleId,
				CreatedBy,  
				IsActive,
				CanAdd,
				CanDelete,
				CanEdit,
				CanView,
				IsDeleted,
				CreatedDateTime 
			)  
			VALUES  
			(  
				@iFormId,  
				@iRoleId,
				@iUserId,  
				@IsActive,
				0,
				0,
				0,
				1,
				0,
				GETDATE()
			)    
			SELECT 1 AS Message_Id,'Form Role Mapping Successfully Done.' As Message    
		END
	END  
	ELSE      
	BEGIN      
		SELECT 0 AS Message_Id,'Form Is Already Mapped With Selected Role.' AS Message      
	END

END TRY

BEGIN CATCH
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message     
END CATCH




