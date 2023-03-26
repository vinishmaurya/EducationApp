/******************************************    
CreatedBy:Vinish
CreatedDate:2023-03-17 00:22:10.323 
select * from mst_role  
purpos:Get Role Details By Optional Conditions  
[dbo].[USP_GetAllRoleList] '',0,0,0	
****************************************************/    
CREATE Procedure [dbo].[USP_SvcGetAllRoleList]
(  
	@cRoleName       NVARCHAR(50)='',  
	@iFK_CategoryId   BIGINT  =0,  
	@iFK_AccountId   BIGINT  =0,  
	@iFK_CustomerId   BIGINT  =0  
)  
AS  
BEGIN TRY
	SELECT 1 Message_Id, 'Success' Message
     SELECT   
        ISNULL(PK_RoleId,0)PK_RoleId,  
        ISNULL(RoleName,'')RoleName 
        From MST_Role(NOLOCK)  
        Where  
     ISNULL(IsDeleted,0)=0 AND    ISNULL(IsActive,0)=1  and
        RoleName LIKE '%'+LTRIM(RTRIM(ISNULL(@cRoleName,'')))+'%'  
        AND  
        FK_CategoryId = CASE WHEN @iFK_CategoryId <> 0 THEN @iFK_CategoryId ELSE FK_CategoryId END  
         
        AND  
        FK_AccountId = CASE WHEN @iFK_AccountId <> 0 THEN @iFK_AccountId ELSE FK_AccountId END  
     AND  
        ISNULL(FK_CustomerId,0) = @iFK_CustomerId
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
