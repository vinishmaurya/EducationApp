/*****************************************************************  
Created By: Vinish
Created Date: 2023-03-18 15:31:57.520
Purpose: Add/Edit Mapping Form Role
EXEC [dbo].[USP_AddEditFormRoleMappings] 
@cJsonData = '[
    {
        "RoleId": "48",
        "FormRoleId": "0",
        "FormId": "1",
        "FormName": "Dashboard",
        "ParentId": "0",
        "LevelId": 1,
        "SortId": 1,
        "CanAdd": false,
        "CanDelete": false,
        "CanView": false,
        "CanEdit": false,
        "CanExport": false,
        "All": false
    }
]'
*******************************************************************/  
CREATE PROC [dbo].[USP_SvcAddEditFormRoleMappings]
@cJsonData NVARCHAR(MAX) = ''
AS 
BEGIN TRY  
	DECLARE @IsMappingExists BIT = 0,@cRoleName VARCHAR(500) = '';
	IF OBJECT_ID(N'tempdb..#temp_table') IS NOT NULL
	BEGIN
		DROP TABLE #temp_table
	END
	SELECT
	 Tbl_1.FormRoleId
    ,Tbl_1.FormId
    ,Tbl_1.RoleId
	,Tbl_1.CanAdd	
	,Tbl_1.CanEdit	
	,Tbl_1.CanDelete	
	,Tbl_1.CanView	
	,Tbl_1.CanExport	
	,Tbl_1.IsActive	
	,Tbl_1.CreatedBy
	,Tbl_1.MappingFor
	INTO #temp_table
	FROM OPENJSON(@cJsonData) WITH 
	(
		 FormRoleId	BIGINT
		,FormId		BIGINT
		,RoleId		BIGINT
		,CanAdd		BIT
		,CanEdit	BIT
		,CanDelete	BIT
		,CanView	BIT
		,CanExport	BIT
		,IsActive	BIT
		,CreatedBy	BIGINT
		,MappingFor VARCHAR(20)
	) AS Tbl_1 
	IF EXISTS
	(
		SELECT TOP 1 1 FROM #temp_table
		WHERE RoleId = 1 AND CreatedBy != 1
	)
	BEGIN
		SELECT 0 AS Message_Id,'Opps! You Not permitted  to update super admin form role mappings!' AS Message;
		RETURN
	END
	SET @IsMappingExists = 
	IIF
	(
		EXISTS
		(
			SELECT TOP 1 1 FROM [dbo].[Map_FormRole](NOLOCK)
			INNER JOIN #temp_table ON PK_FormRoleId = FormRoleId
		),
		1,
		0
	)
	/*Insert Update WebApp mappings*/
	MERGE INTO [dbo].[Map_FormRole] WITH (HOLDLOCK) AS target
	USING  (SELECT * FROM #temp_table WHERE UPPER(MappingFor) = 'WEBAPP')  AS source
		ON target.PK_FormRoleId	= source.FormRoleId
	WHEN MATCHED THEN 
	    UPDATE SET
		 target.FK_FormId			= source.FormId		
		,target.FK_RoleId			= source.RoleId		
		,target.CanAdd				= source.CanAdd		
		,target.CanEdit				= source.CanEdit		
		,target.CanDelete			= source.CanDelete	
		,target.CanView				= source.CanView	
		,target.CanExport			= source.CanExport
		,target.IsActive			= source.IsActive	
		,target.[IsDeleted]			= 0
		,target.UpdatedBy			= source.CreatedBy
		,target.[UpdatedDatetime] 	= GETDATE()
	WHEN NOT MATCHED BY TARGET THEN
    INSERT 
	(
		 FK_FormId			
		,FK_RoleId			
		,CanAdd				
		,CanEdit				
		,CanDelete			
		,CanView
		,CanExport			
		,[IsDeleted]		
		,[IsActive]			
		,[CreatedDatetime] 
		,CreatedBy
	)
    VALUES 
	(
		 source.FormId			
		,source.RoleId			
		,source.CanAdd				
		,source.CanEdit				
		,source.CanDelete			
		,source.CanView	
		,source.CanExport
		,0
		,1
		,GETDATE()
		,source.CreatedBy
	);
	
	/*Insert Update WebApp mappings*/
	MERGE INTO [dbo].[MAP_FormRole_MobileApp] WITH (HOLDLOCK) AS target
	USING (SELECT * FROM #temp_table WHERE UPPER(MappingFor) = 'MOBILEAPP') AS source
		ON target.PK_FormRoleId	= source.FormRoleId
	WHEN MATCHED THEN 
	    UPDATE SET
		 target.FK_FormId			= source.FormId		
		,target.FK_RoleId			= source.RoleId		
		,target.CanAdd				= source.CanAdd		
		,target.CanEdit				= source.CanEdit		
		,target.CanDelete			= source.CanDelete	
		,target.CanView				= source.CanView	
		,target.CanExport			= source.CanExport
		,target.IsActive			= source.IsActive	
		,target.[IsDeleted]			= 0
		,target.UpdatedBy			= source.CreatedBy
		,target.[UpdatedDatetime] 	= GETDATE()
	WHEN NOT MATCHED BY TARGET THEN
    INSERT 
	(
		 FK_FormId			
		,FK_RoleId			
		,CanAdd				
		,CanEdit				
		,CanDelete			
		,CanView
		,CanExport			
		,[IsDeleted]		
		,[IsActive]			
		,[CreatedDatetime] 
		,CreatedBy
	)
    VALUES 
	(
		 source.FormId			
		,source.RoleId			
		,source.CanAdd				
		,source.CanEdit				
		,source.CanDelete			
		,source.CanView	
		,source.CanExport
		,0
		,1
		,GETDATE()
		,source.CreatedBy
	);


	/*Select Output Values*/
	SET @cRoleName = (SELECT TOP 1 LTRIM(RTRIM(RoleName)) FROM [dbo].MST_Role(NOLOCK) WHERE PK_RoleId = (SELECT TOP 1 RoleId FROM #temp_table));
	--SELECT 1 Message_Id,'Mapping for ("'+@cRoleName+'") '+(IIF(@IsMappingExists = 1,'inserted','updated'))+' successfuly!' Message;
	SELECT 1 Message_Id,'Mappings for ("'+@cRoleName+'") updated successfuly!' Message;
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
