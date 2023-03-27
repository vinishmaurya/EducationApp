/******************************************    
CreatedBy:sandeep Kumar   
CreatedDate:28-11-2019  
purpos:Get User Master  Deatils 
[dbo].[USP_DeleteUser] 
SELECT * FROM MST_User     
EXEC [dbo].[USP_DeleteUser] 3,1100
********** ******************************************/  
CREATE PROCEDURE [dbo].[USP_SvcDeleteUser]        
(
	@iPK_UserId bigint,
	@iUserId    bigint  
)
AS  
BEGIN TRY     
DECLARE @UserName VARCHAR(500) = (SELECT TOP 1 UserName from MST_USER(NOLOCK) WHERE PK_UserId = @iPK_UserId);
IF(ISNULL(@UserName,'') = '')
BEGIN
	SELECT 1 AS Message_Id,'Deletion Failed, Invalid user details was supplied!' AS Message 
RETURN;
END
if (@iPK_UserId != 1)
begin
	UPDATE [dbo].[MST_User]
	SET 
	IsActive=0, 
	IsDeleted=1,  
	DeletedBy=@iUserId,  
	DeletedDateTime=GETDATE() 
	WHERE   
	PK_UserId=@iPK_UserId  
	SELECT 1 AS Message_Id,'User ("'+@UserName+'") Deleted Successfully.' AS Message 
end
else
begin
	SELECT 0 AS Message_Id,'Opps! You Not permitted to delete super admin user details!' AS Message   
end              
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
