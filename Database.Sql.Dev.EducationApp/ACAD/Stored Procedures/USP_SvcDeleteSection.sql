/******************************************    
CreatedBy:Vinish  
CreatedDate:04-12-2019  
purpos:Delete  Section
[ACAD].[USP_DeleteSection]      
EXEC [ACAD].[USP_DeleteSection] 3
********** ******************************************/  
CREATE PROCEDURE [ACAD].[USP_SvcDeleteSection]        
   (
	@iPK_SectionId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  
      DECLARE @iSectionExist INT
	  SET @iSectionExist = (SELECT COUNT(*) FROM [ACAD].[MST_Class](NOLOCK) WHERE FK_SectionId =@iPK_SectionId) 
	  IF(ISNULL(@iSectionExist,0)=0) 
	    BEGIN            
             UPDATE [ACAD].[MST_Section]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_SectionId=@iPK_SectionId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	    END
       ELSE
	     BEGIN
		  SELECT 0 AS Message_Id,'Failed! You cannot delete Section as mapping aleady exist!' AS Message 

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