/******************************************    
CreatedBy:Vinish  
CreatedDate:04-12-2019  
purpos:Delete  Medium
[ACAD].[USP_DeleteMedium]      
EXEC [ACAD].[USP_DeleteMedium] 3
********** ******************************************/  
CREATE PROCEDURE [ACAD].[USP_SvcDeleteMedium]        
   (
	@iPK_MediumId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  
      DECLARE @iMediumExist INT
	  SET @iMediumExist = (SELECT COUNT(*) FROM [ACAD].[MST_Subject](NOLOCK) WHERE FK_MediumId =@iPK_MediumId) 
	  IF(ISNULL(@iMediumExist,0)=0) 
	    BEGIN            
             UPDATE [ACAD].[MST_Medium]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_MediumId=@iPK_MediumId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	    END
       ELSE
	     BEGIN
		  SELECT 0 AS Message_Id,'Failed! You cannot delete medium as mapping aleady exist!' AS Message 

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