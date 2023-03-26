/******************************************    
CreatedBy:Vinish  
CreatedDate:2023-03-13 01:39:46.550
purpos:Delete RoleName Master  Deatils
select * from mst_role 
[dbo].[USP_DeleteRoleName]      
EXEC [dbo].[USP_DeleteRoleName] 3,1
********** ******************************************/  
CREATE PROCEDURE  [dbo].[USP_SvcDeleteRole]        
   (
	@iPK_RoleId  	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
	DECLARE @RoleName VARCHAR(500) = (SELECT TOP 1 RoleName from [MST_Role](NOLOCK) WHERE PK_RoleId = @iPK_RoleId);
           IF NOT EXISTS(SELECT 1 FROM Mst_Role (NOLOCK) Rol WHERE Rol.RoleName IN ('Super Admin','Admin')  and  PK_RoleId=@iPK_RoleId)
	       BEGIN      
           UPDATE [dbo].[MST_Role]
           SET
		   IsActive=0,
		   IsDeleted=1,  
           DeletedBy=@iUserId,  
           DeletedDateTime=GETDATE() 
           WHERE   
           PK_RoleId=@iPK_RoleId	 	  
           SELECT 1 AS Message_Id,'Role ("'+@RoleName +'") Deleted Successfully.' AS Message
	       END  
	       ELSE      
           BEGIN    
           SELECT 0 AS Message_Id,'You are not authorized to delete admin role.' AS Message              
           END     
  END TRY  
       BEGIN CATCH  
             SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message  
       END CATCH  
