/*****************************************************************  
Created By: Vinish
Created Date: 2023-03-18 15:31:57.520
Purpose: Get Role Form Mapping With FormId And RoleId
EXEC [dbo].[USP_GetAllFormRoleMappings] 39,26,'WebApp',1
*******************************************************************/  
CREATE PROCEDURE [dbo].[USP_SvcGetAllFormRoleMappings]  
(  
	@iPK_RoleId BIGINT, 
	@iPK_FormId  BIGINT ,
	@cMappingFor VARCHAR(20),
	@iAccountId BIGINT=0
)  
AS   
BEGIN TRY  
	/*Declare vaiables*/
	set @iAccountId = (SELECT FK_AccountId FROM MST_Role(NOLOCK) acc WHERE PK_RoleId =  @iPK_RoleId )
	/*Select status*/
	SELECT 1 AS Message_Id, 'Success' AS Message   
	/*
	-------------------
	Web app mappings
	*/
	IF(UPPER(@cMappingFor)='WebApp')  
	BEGIN
	/*Select mappings by account*/
	IF NOT EXISTS
	(
		SELECT 1 
		FROM MST_Account(NOLOCK) acc 
		INNER JOIN MST_Category(NOLOCK) cat 
		ON cat.PK_CategoryId=acc.FK_CategoryId 
		AND acc.PK_AccountId=@iAccountId			
	)
	BEGIN
		/*Select form account mappings and store into temp*/
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
		@iAccountId as CompanyId,  
		--ISNULL(FRMCMP.FK_CompanyId,0),  
		--0 AS PK_FormRoleId,   
		FRMLIST.PK_FormId AS FormId,   
		FRMLIST.FormName,  
		FRMLIST.FK_ParentId,  
		FRMLIST.LevelId,  
		FRMLIST.SortId,  
		ISNULL(FRMCMP.CanAdd   ,0)CanAdd,  
		ISNULL(FRMCMP.CanDelete,0)CanDelete,  
		ISNULL(FRMCMP.CanView  ,0)CanView,  
		ISNULL(FRMCMP.CanEdit ,0)CanEdit,
		ISNULL(FRMCMP.CanExport ,0)CanExport,--,
		ISNULL(FRMCMP.IsActive ,0)IsActive,
		ISNULL(FRMCMP.CreatedBy ,0)CreatedBy
		--ISNULL(FRMROLE.PK_FormRoleId,0)PK_FormRoleId
		INTO #TEMPFormCompany
		FROM  FormList FRMLIST      
		LEFT JOIN Map_FormAccount(NOLOCK) FRMCMP   
		ON FRMLIST.PK_FormId=FRMCMP.FK_FormId
		AND 
		1=
		(
			CASE 
				WHEN ISNULL(FRMCMP.FK_AccountId,0)=@iAccountId 
				THEN 1		 
				ELSE 0 
			END
		)
		WHERE  
		(
			FRMCMP.CanAdd=1 OR FRMCMP.CanDelete=1 OR FRMCMP.CanEdit=1 OR FRMCMP.CanView=1
		)
		ORDER BY FK_ParentId ASC
		/*Select form role mappings and store into temp*/
		;WITH FormList1 AS      
		(      
			/*Select all active forms*/
			SELECT  PK_FormId, FormName,FK_ParentId,LevelId,SortId
			FROM MST_Form(NOLOCK) where FK_ParentId =0     
			and PK_FormId=@iPK_FormId AND isActive=1   AND (UPPER(ISNULL(FormFor,'ALL'))='WEB'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )    
			UNION ALL    
			/*Select all active parent forms*/
			SELECT  a.PK_FormId, a.FormName, a.FK_ParentId ,a.LevelId,a.SortId      
			FROM MST_Form a      
			--JOIN FormList b on a.FK_ParentId=b.PK_FormId      
		    WHERE a.FK_ParentId =@iPK_FormId AND a.isActive=1     AND (UPPER(ISNULL(FormFor,'ALL'))='WEB'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' ) 
		)
		SELECT  
		@iAccountId as CompanyId,  
		FRMRLE.FK_RoleId,   
		FRMLIST1.PK_FormId AS FormId,   
		FRMLIST1.FormName,  
		FRMLIST1.FK_ParentId,  
		FRMLIST1.LevelId,  
		FRMLIST1.SortId,  
		ISNULL(FRMRLE.CanAdd   ,0)CanAdd,  
		ISNULL(FRMRLE.CanDelete,0)CanDelete,  
		ISNULL(FRMRLE.CanView  ,0)CanView,  
		ISNULL(FRMRLE.CanEdit ,0)CanEdit,
		ISNULL(FRMRLE.CanExport ,0)CanExport,
		ISNULL(FRMRLE.PK_FormRoleId,0) FormRoleId,
		ISNULL(FRMRLE.IsActive ,0)IsActive,
		ISNULL(FRMRLE.CreatedBy ,0)CreatedBy
		INTO #TEMPFormRole
		FROM  FormList1 FRMLIST1      
		LEFT JOIN MAP_FormRole (NOLOCK) FRMRLE   
		ON FRMLIST1.PK_FormId=FRMRLE.FK_FormId
		AND FRMRLE.FK_RoleId=@iPK_RoleId
		WHERE  
		(
			FRMRLE.CanAdd=1 OR FRMRLE.CanDelete=1 OR FRMRLE.CanEdit=1 OR FRMRLE.CanView=1
		)
		
		ORDER BY FK_ParentId ASC 
		/*Select mapping column*/
		SELECT
		'All' [All],
		'View' CanView,
		'Add' CanAdd,
		'Edit' CanEdit,
		'Delete' CanDelete,
		'Export' CanExport
		/*Select and join stored temp form account mappings and form role mappings */
		SELECT
		ISNULL(FRMROLE.FormRoleId,0)AS FormRoleId,
		@iPK_RoleId AS RoleId,
		FRMCOMP.FormId as FormId,
		ISNULL(FRMCOMP.FK_ParentId,0)AS ParentId,
		ISNULL(FRMCOMP.FormName,'')AS FormName,
		ISNULL(FRMCOMP.LevelId ,0)AS LevelId,
		ISNULL(FRMCOMP.SortId  ,0)AS SortId,
		ISNULL(FRMROLE.CanAdd,0) CanAdd,
		ISNULL(FRMROLE.CanEdit,0) CanEdit,
		ISNULL(FRMROLE.CanExport ,0)CanExport,
		ISNULL(FRMROLE.CanView,0) CanView,
		ISNULL(FRMROLE.CanDelete,0) CanDelete,
		ISNULL(FRMROLE.IsActive ,0)IsActive,
		ISNULL(FRMROLE.CreatedBy ,0)CreatedBy,
		UPPER(@cMappingFor) MappingFor
		FROM #TEMPFormCompany FRMCOMP
		INNER JOIN #TEMPFormRole FRMROLE
		ON FRMROLE.FormId=FRMCOMP.FormId
		/*Drop temp table*/
		DROP TABLE #TEMPFormCompany
		DROP TABLE #TEMPFormRole
	END
	ELSE
	BEGIN
		/*Select mapping column*/
		SELECT
		'All' [All],
		'View' CanView,
		'Add' CanAdd,
		'Edit' CanEdit,
		'Delete' CanDelete,
		'Export' CanExport;
		/*Select form role mappings */
		;WITH FormList      
		AS      
		(      
			/*Select all active forms*/
			SELECT  PK_FormId, FormName,FK_ParentId,LevelId,SortId   
			FROM MST_Form(NOLOCK) where ISNULL(FK_ParentId,0) =0     
			and PK_FormId=@iPK_FormId AND ISNULL(IsDeleted,0)=0  AND (UPPER(ISNULL(FormFor,'ALL'))='WEB'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )      
			UNION ALL      
			/*Select all active parent forms*/
			SELECT  a.PK_FormId, a.FormName, a.FK_ParentId ,a.LevelId,a.SortId      
			FROM MST_Form a      
			WHERE a.FK_ParentId =@iPK_FormId AND ISNULL(IsDeleted,0)=0    AND (UPPER(ISNULL(FormFor,'ALL'))='WEB'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' ) 
		)
		SELECT
		@iPK_RoleId AS RoleId,
		ISNULL(FRMCMP.PK_FormRoleId,0)FormRoleId, 
		FRMLIST.PK_FormId AS FormId, 
		ISNULL(FRMLIST.FormName,'')FormName,
		ISNULL(FRMLIST.FK_ParentId,0)AS ParentId,
		ISNULL(FRMLIST.LevelId,0)AS LevelId,
		ISNULL(FRMLIST.SortId,0) AS SortId,
		ISNULL(FRMCMP.CanAdd   ,0)CanAdd,
		ISNULL(FRMCMP.CanDelete,0)CanDelete,
		ISNULL(FRMCMP.CanView  ,0)CanView,
		ISNULL(FRMCMP.CanEdit	,0)CanEdit,
		ISNULL(FRMCMP.CanExport ,0)CanExport,
		ISNULL(FRMCMP.IsActive ,0)IsActive,
		ISNULL(FRMCMP.CreatedBy ,0)CreatedBy,
		UPPER(@cMappingFor) MappingFor
		FROM  FormList FRMLIST    
		LEFT JOIN MAP_FormRole(NOLOCK) FRMCMP 
		ON FRMLIST.PK_FormId=FRMCMP.FK_FormId
		AND FK_RoleId=@iPK_RoleId
		order by FK_ParentId, PK_FormId;
		END
	END
	/*
	-------------------
	Mobile app mappings
	*/
	ELSE IF(UPPER(@cMappingFor)='MobileApp')  
	BEGIN
		/*Select mappings by account*/
		IF NOT EXISTS
		(
			SELECT 1 
			FROM MST_Account(NOLOCK) acc 
			INNER JOIN MST_Category(NOLOCK) cat 
			ON cat.PK_CategoryId=acc.FK_CategoryId 
			AND acc.PK_AccountId=@iAccountId
		)
		BEGIN
			/*Select mapping column*/
			SELECT
			'All' [All],
			'View' CanView,
			'Add' CanAdd,
			'Edit' CanEdit,
			'Delete' CanDelete,
			'Export' CanExport
			/*Select form account mappings and store into temp*/
			;WITH FormList AS      
			(      
			  /*Select all active forms*/
			  SELECT  PK_FormId, FormName,FK_ParentId,LevelId,SortId 
			  FROM MST_Form(NOLOCK) where FK_ParentId =0     
			  and PK_FormId=@iPK_FormId AND isActive=1     AND (UPPER(ISNULL(FormFor,'ALL'))='MOBILE'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )  
			  UNION ALL      
			  /*Select all active parent forms*/
			  SELECT  a.PK_FormId, a.FormName, a.FK_ParentId ,a.LevelId,a.SortId      
			  FROM MST_Form a      
			  --JOIN FormList b on a.FK_ParentId=b.PK_FormId      
			  WHERE a.FK_ParentId =@iPK_FormId AND a.isActive=1    AND (UPPER(ISNULL(FormFor,'ALL'))='MOBILE'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )  
			)      
			SELECT  
			@iAccountId as CompanyId,  
			--ISNULL(FRMCMP.FK_CompanyId,0),  
			--0 AS PK_FormRoleId,   
			FRMLIST.PK_FormId AS FormId,   
			ISNULL(FRMLIST.FormName,  '')AS FormName,
			ISNULL(FRMLIST.FK_ParentId, 0)AS ParentId,  
			ISNULL(FRMLIST.LevelId,  0)AS LevelId,
			ISNULL(FRMLIST.SortId,  	0)AS SortId,
			ISNULL(FRMCMP.CanAdd   ,0)CanAdd,  
			ISNULL(FRMCMP.CanDelete,0)CanDelete,  
			ISNULL(FRMCMP.CanView  ,0)CanView,  
			ISNULL(FRMCMP.CanEdit ,0)CanEdit,
			ISNULL(FRMCMP.CanExport ,0)CanExport,
			ISNULL(FRMCMP.IsActive ,0)IsActive,
			ISNULL(FRMCMP.CreatedBy ,0)CreatedBy
			--ISNULL(FRMROLE.PK_FormRoleId,0)PK_FormRoleId
			INTO #TEMPFormCompany1
			FROM  FormList FRMLIST      
			LEFT JOIN Map_FormAccount(NOLOCK) FRMCMP   
			ON FRMLIST.PK_FormId=FRMCMP.FK_FormId
			AND 
			1=
			(
				CASE 
					WHEN ISNULL(FRMCMP.FK_AccountId,0)=@iAccountId THEN 1			 
					ELSE 0 
				END
			)
			WHERE  
			(
				FRMCMP.CanAdd=1 OR FRMCMP.CanDelete=1 OR FRMCMP.CanEdit=1 OR FRMCMP.CanView=1
			)
			ORDER BY FK_ParentId ASC
			/*Select form role mappings and store into temp*/
			;WITH FormList1 AS      
			(      
				/*Select all active forms*/
			    SELECT  PK_FormId, FormName,FK_ParentId,LevelId,SortId
			    FROM MST_Form(NOLOCK) where FK_ParentId =0     
			    and PK_FormId=@iPK_FormId AND isActive=1  AND (UPPER(ISNULL(FormFor,'ALL'))='MOBILE'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )     
			    UNION ALL      
				/*Select all active parent forms*/
			    SELECT  a.PK_FormId, a.FormName, a.FK_ParentId ,a.LevelId,a.SortId      
			    FROM MST_Form a      
			    --JOIN FormList b on a.FK_ParentId=b.PK_FormId      
			    WHERE a.FK_ParentId =@iPK_FormId AND a.isActive=1     AND (UPPER(ISNULL(FormFor,'ALL'))='MOBILE'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' ) 
			)
			SELECT  
			@iAccountId as CompanyId,  
			--ISNULL(FRMCMP.FK_CompanyId,0),  
			--0 AS PK_FormRoleId,
			FRMRLE.FK_RoleId RoleId,   
			FRMLIST1.PK_FormId AS FormId,   
			FRMLIST1.FormName,  
			FRMLIST1.FK_ParentId FK_ParentId,  
			FRMLIST1.LevelId,  
			FRMLIST1.SortId,  
			ISNULL(FRMRLE.CanAdd   ,0)CanAdd,  
			ISNULL(FRMRLE.CanDelete,0)CanDelete,  
			ISNULL(FRMRLE.CanView  ,0)CanView,  
			ISNULL(FRMRLE.CanEdit ,0)CanEdit,
			ISNULL(FRMRLE.CanExport ,0)CanExport,
			ISNULL(FRMRLE.PK_FormRoleId,0) FormRoleId,
			ISNULL(FRMRLE.IsActive ,0)IsActive,
			ISNULL(FRMRLE.CreatedBy ,0)CreatedBy
			INTO #TEMPFormRole1
			FROM  FormList1 FRMLIST1      
			LEFT JOIN MAP_FormRole_MobileApp (NOLOCK) FRMRLE   
			ON FRMLIST1.PK_FormId=FRMRLE.FK_FormId
			AND FRMRLE.FK_RoleId=@iPK_RoleId
			WHERE  
			(
				FRMRLE.CanAdd=1 OR FRMRLE.CanDelete=1 OR FRMRLE.CanEdit=1 OR FRMRLE.CanView=1
			)
			ORDER BY FK_ParentId ASC 
			/*Select and join stored temp form account mappings and form role mappings */
			SELECT
			ISNULL(FRMROLE.RoleId,0) AS FK_RoleId,
			--FRMCOMP.*,
			FRMCOMP.CompanyId,
			FRMCOMP.FormId,
			ISNULL(FRMCOMP.ParentId,0)AS FK_ParentId,
			ISNULL(FRMCOMP.FormName,'')AS FormName,
			ISNULL(FRMCOMP.LevelId,0)AS LevelId,
			ISNULL(FRMCOMP.SortId, 0)AS SortId,
			ISNULL(FRMROLE.CanAdd,0) CanAdd,
			ISNULL(FRMROLE.CanEdit,0) CanEdit,
			ISNULL(FRMROLE.CanExport ,0)CanExport,
			ISNULL(FRMROLE.CanView,0) CanView,
			ISNULL(FRMROLE.CanDelete,0) CanDelete,
			ISNULL(FRMROLE.FormRoleId,0)AS FormRoleId,
			ISNULL(FRMROLE.IsActive ,0)IsActive,
			ISNULL(FRMROLE.CreatedBy ,0)CreatedBy,
			UPPER(@cMappingFor) MappingFor
			FROM #TEMPFormCompany1 FRMCOMP
			LEFT JOIN #TEMPFormRole1 FRMROLE
			ON FRMROLE.FormId=FRMCOMP.FormId
			DROP TABLE #TEMPFormCompany1
			DROP TABLE #TEMPFormRole1
		END
		ELSE
		BEGIN
			/*Select mapping column*/
			SELECT
			'All' [All],
			'View' CanView,
			'Add' CanAdd,
			'Edit' CanEdit,
			'Delete' CanDelete,
			'Export' CanExport;
			/*Select form role mappings */
			;WITH FormList AS      
			(      
				SELECT  PK_FormId, FormName,FK_ParentId,LevelId,SortId   
				FROM MST_Form(NOLOCK) where ISNULL(FK_ParentId,0) =0     
				and PK_FormId=@iPK_FormId AND ISNULL(IsDeleted,0)=0  AND (UPPER(ISNULL(FormFor,'ALL'))='MOBILE'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' )      
				UNION ALL      
				SELECT  a.PK_FormId, a.FormName, a.FK_ParentId ,a.LevelId,a.SortId      
				FROM MST_Form a      
				WHERE a.FK_ParentId =@iPK_FormId AND ISNULL(IsDeleted,0)=0    AND (UPPER(ISNULL(FormFor,'ALL'))='MOBILE'  OR  UPPER(ISNULL(FormFor,'ALL'))='ALL' ) 
			)
			SELECT
			@iPK_RoleId AS RoleId,
			ISNULL(FRMCMP.PK_FormRoleId,0)FormRoleId, 
			FRMLIST.PK_FormId AS FormId, 
			ISNULL(FRMLIST.FormName,'')FormName,
			ISNULL(FRMLIST.FK_ParentId,0)AS ParentId,
			ISNULL(FRMLIST.LevelId,0)AS LevelId,
			ISNULL(FRMLIST.SortId,0) AS SortId,
			ISNULL(FRMCMP.CanAdd   ,0)CanAdd,
			ISNULL(FRMCMP.CanDelete,0)CanDelete,
			ISNULL(FRMCMP.CanView  ,0)CanView,
			ISNULL(FRMCMP.CanEdit	,0)CanEdit,
			ISNULL(FRMCMP.CanExport ,0)CanExport,
			ISNULL(FRMCMP.IsActive ,0)IsActive,
			ISNULL(FRMCMP.CreatedBy ,0)CreatedBy,
			UPPER(@cMappingFor) MappingFor
			FROM  FormList FRMLIST    
			LEFT JOIN MAP_FormRole_MobileApp (NOLOCK) FRMCMP 
			ON FRMLIST.PK_FormId=FRMCMP.FK_FormId
			AND FK_RoleId=@iPK_RoleId
			ORDER BY FK_ParentId, PK_FormId
		END
	END	
END TRY                
BEGIN CATCH                 
 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;
