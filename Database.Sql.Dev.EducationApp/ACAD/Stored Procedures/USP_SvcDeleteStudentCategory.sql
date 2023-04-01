/******************************************    
CreatedBy:Vinish  
CreatedDate:04-12-2019  
purpos:Delete  StudentCategory
[ACAD].[USP_DeleteStudentCategory]      
EXEC [ACAD].[USP_DeleteStudentCategory] 3
********** ******************************************/  
CREATE PROCEDURE [ACAD].[USP_SvcDeleteStudentCategory]        
   (
	@iPK_StudentCategoryId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  
      DECLARE @iStudentCategoryExist INT
	  SET @iStudentCategoryExist = (SELECT COUNT(*) FROM [ACAD].[MST_Student](NOLOCK) WHERE FK_StudentCategoryId =@iPK_StudentCategoryId) 
	  IF(ISNULL(@iStudentCategoryExist,0)=0) 
	    BEGIN            
             UPDATE [ACAD].[MST_StudentCategory]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_StudentCategoryId=@iPK_StudentCategoryId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	    END
       ELSE
	     BEGIN
		  SELECT 0 AS Message_Id,'Failed! You cannot delete student category as mapping aleady exist!' AS Message 

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