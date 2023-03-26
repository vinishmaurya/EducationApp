/******************************************    
CreatedBy:sandeep Kumar   
CreatedDate:04-12-2019  
purpos:Delete  City
[dbo].[USP_DeleteCity]      
EXEC [dbo].[USP_DeleteCity] 1,1
********** ******************************************/  

CREATE PROCEDURE [dbo].[USP_SvcDeleteCity]        
   (
	@iPK_CityId	      bigint,
	@iUserId          bigint  
   )
  AS  
  BEGIN TRY             
      UPDATE [dbo].[MST_City]
      SET 
	  IsActive=0, 
      IsDeleted=1,  
      DeletedBy=@iUserId,  
      DeletedDateTime=GETDATE() 
      WHERE   
      PK_CityId=@iPK_CityId	  
  
      SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message   
              
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
  



