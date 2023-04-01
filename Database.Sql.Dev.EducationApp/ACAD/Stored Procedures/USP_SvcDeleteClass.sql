/******************************************    
CreatedBy:Vinish  
CreatedDate:04-12-2019  
purpos:Delete  Class
[ACAD].[USP_DeleteClass]      
EXEC [ACAD].[USP_DeleteClass] 3
********** ******************************************/  
CREATE PROCEDURE [ACAD].[USP_SvcDeleteClass]        
   (
	@iPK_ClassId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  DECLARE @iClassSubjectExist INT,@iClassTeacherExist INT;
	  SET @iClassSubjectExist = 
	  (
	  	SELECT COUNT(1) FROM [ACAD].[MAP_AssignClassSubject](NOLOCK) 
	  	WHERE FK_ClassId =@iPK_ClassId AND 
	  	IsActive=1 AND 
	  	ISNULL(IsDeleted,0)=0
	  )
	  SET @iClassTeacherExist = 
	  (
	  	SELECT COUNT(1) FROM [ACAD].[MAP_AssignClassSubject](NOLOCK) 
	  	WHERE FK_ClassId =@iPK_ClassId AND 
	  	IsActive=1 AND 
	  	ISNULL(IsDeleted,0)=0
	  )
	  IF(@iClassSubjectExist=0 OR @iClassTeacherExist=0)     
	    BEGIN            
             UPDATE [ACAD].[MST_Class]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_ClassId=@iPK_ClassId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	    END
       ELSE
	     BEGIN
		  SELECT 0 AS Message_Id,'Failed! You cannot delete class as mapping aleady exist!' AS Message 

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