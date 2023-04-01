/******************************************    
CreatedBy:Vinish  
CreatedDate:04-12-2019  
purpos:Delete  Session
[ACAD].[USP_DeleteSession]      
EXEC [ACAD].[USP_DeleteSession] 3
********** ******************************************/  
CREATE PROCEDURE [ACAD].[USP_SvcDeleteSession]        
   (
	@iPK_SessionId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  
   --   DECLARE @iSessionExist INT
	  --SET @iSessionExist = (SELECT COUNT(*) FROM [ACAD].[MST_Subject](NOLOCK) WHERE FK_SessionId =@iPK_SessionId) 
	  --IF(ISNULL(@iSessionExist,0)=0) 
	  --  BEGIN            
             UPDATE [ACAD].[MST_Session]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_SessionId=@iPK_SessionId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	  --  END
   --    ELSE
	  --   BEGIN
		 -- SELECT 0 AS Message_Id,'Failed! You cannot delete Session as mapping aleady exist!' AS Message 

		 --END
	 	    
              
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
		ERROR_State(),
		ERROR_PROCEDURE(),
		ERROR_LINE(),
		ERROR_MESSAGE(),
		GETDATE()
	)
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;