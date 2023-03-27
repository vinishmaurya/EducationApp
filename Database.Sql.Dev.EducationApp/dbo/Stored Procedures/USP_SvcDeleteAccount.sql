/******************************************    
CreatedBy:Vinish  
CreatedDate:2023-03-13 01:39:46.550
purpos:Delete Account Master  Deatils 
[dbo].[USP_DeleteAccount]      
EXEC [dbo].[USP_DeleteAccount] 2,1
********** ******************************************/  
CREATE PROCEDURE [dbo].[USP_SvcDeleteAccount]        
   (
	@iPK_AccountId	  bigint,
	@iDeletedId       bigint  
   )
  AS  
  BEGIN TRY
	DECLARE @AccountName VARCHAR(500) = (SELECT TOP 1 AccountName from [MST_Account](NOLOCK) WHERE PK_AccountId = @iPK_AccountId);
	IF NOT EXISTS(SELECT TOP 1 1 FROM dbo.MST_User(nolock) where PK_UserId = @iDeletedId and IsActive = 1 and isnull(IsDeleted,0) = 0)
	BEGIN
      SELECT 0 AS Message_Id,'Invalid deleted? deleted by must be valid user Id' AS Message  
	  return
	END

	  if NOT EXISTS((select AccountName from MST_Account WHERE PK_AccountId = @iPK_AccountId AND AccountName IN ('Super Admin Account','Admin Account'))) 
	  begin
		 if not exists (select PK_AccountId from [MST_Account](NOLOCK) WHERE ParentAccountId = @iPK_AccountId AND ISNULL(IsActive,0) = 1 AND ISNULL(IsDeleted,0) = 0)
		begin
		
	     UPDATE [dbo].[MST_Account]
         SET 
	     IsActive=0, 
         IsDeleted=1,  
         DeletedBy=@iDeletedId,  
         DeletedDateTime=GETDATE() 
         WHERE   
         PK_AccountId=@iPK_AccountId 	
	     
	     UPDATE MST_USER 
	     SET 
	     IsActive=0,
	     IsDeleted=1,  
         DeletedBy=@iDeletedId,  
         DeletedDateTime=GETDATE()  WHERE FK_AccountId = @iPK_AccountId 	
	     
	     UPDATE MST_ROLE
	     SET 
	     IsActive=0,
	     IsDeleted=1,  
         DeletedBy=@iDeletedId,  
         DeletedDateTime=GETDATE()  WHERE FK_AccountId = @iPK_AccountId 	
		 SELECT 1 AS Message_Id,'Account ("'+@AccountName+'") Deleted Successfully.' AS Message 
		 end--Can''t delete due to some childs exists
		 else
		 begin
			SELECT 0 AS Message_Id,'Can''t delete due to some childs exists' AS Message   
		 end
	  end
	  else
	  begin
		
      SELECT 0 AS Message_Id,'Opps! You are not authorized to delete admin accounts.' AS Message   
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

