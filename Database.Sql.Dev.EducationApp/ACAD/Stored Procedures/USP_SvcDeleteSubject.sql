/******************************************    
CreatedBy:Vinish  
CreatedDate:04-12-2019  
purpos:Delete  Subject
[ACAD].[USP_DeleteSubject]      
EXEC [ACAD].[USP_DeleteSubject] 3
********** ******************************************/  
CREATE PROCEDURE [ACAD].[USP_SvcDeleteSubject]        
   (
	@iPK_SubjectId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  
      DECLARE @iSubjectExist INT
	  SET @iSubjectExist = (SELECT COUNT(*) FROM [ACAD].MAP_AssignClassSubject(NOLOCK) WHERE FK_SubjectId =@iPK_SubjectId) 
	  IF(ISNULL(@iSubjectExist,0)=0) 
	    BEGIN            
             UPDATE [ACAD].[MST_Subject]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_SubjectId=@iPK_SubjectId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	    END
       ELSE
	     BEGIN
		  SELECT 0 AS Message_Id,'Failed! You cannot delete Subject as mapping aleady exist!' AS Message 

		 END
	 	    
              
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