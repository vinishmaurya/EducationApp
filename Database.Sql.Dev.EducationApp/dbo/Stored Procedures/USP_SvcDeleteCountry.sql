/****** Object:  StoredProcedure [dbo].[USP_DeleteCountry]    Script Date: 12/23/2019 6:08:25 PM ******/

/******************************************    
CreatedBy:sandeep Kumar   
CreatedDate:04-12-2019  
purpos:Delete  Country
[dbo].[USP_DeleteCountry]      
EXEC [dbo].[USP_DeleteCountry] 3
********** ******************************************/  

CREATE PROCEDURE [dbo].[USP_SvcDeleteCountry]        
   (
	@iPK_CountryId	  BIGINT,
	@iUserId          BIGINT  
   )
  AS  
  BEGIN TRY 
  
      DECLARE @iCountryExist INT
	  SET @iCountryExist = (SELECT COUNT(*) FROM [dbo].[MST_State](NOLOCK) WHERE FK_CountryId =@iPK_CountryId) 
	  IF(ISNULL(@iCountryExist,0)=0) 
	    BEGIN            
             UPDATE [dbo].[MST_Country]
             SET 
			   IsActive=0, 
               IsDeleted=1,  
               DeletedBy=@iUserId,  
               DeletedDateTime=GETDATE() 
               WHERE   
               PK_CountryId=@iPK_CountryId	  
               SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message 
	    END
       ELSE
	     BEGIN
		  SELECT 0 AS Message_Id,'You Cannot Delete Country As it Exists in state master.' AS Message 

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
		ERROR_STATE(),
		ERROR_PROCEDURE(),
		ERROR_LINE(),
		ERROR_MESSAGE(),
		GETDATE()
	)
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;  
  




