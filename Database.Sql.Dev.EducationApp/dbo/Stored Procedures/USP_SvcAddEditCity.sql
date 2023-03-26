/******************************************    
CreatedBy:Vinish
CreatedDate:2023-03-25 16:58:21.643
purpos:Add edit city Master  
****************************************************/        
CREATE PROCEDURE [dbo].[USP_SvcAddEditCity]          
   (   
		@iPK_CityId                  bigint, 
		@iFK_CountryId               bigint,
		@iFK_StateId                 bigint,       
		@cCityName                   nvarchar(50),    
		@bIsActive                   bit,       
		@iUserId                     bigint    
	)          
 AS          
 BEGIN TRY          
 IF(@iPK_CityId =0)  
    BEGIN          
       BEGIN      
         IF NOT EXISTS
		    (
			SELECT 1 FROM [dbo].[MST_City](NOLOCK) 
			WHERE CityName=LTRIM(RTRIM(@cCityName)) AND IsActive =1
			AND FK_CountryId = @iFK_CountryId
			AND FK_StateId = @iFK_StateId	
		    )  
       BEGIN       
            INSERT INTO [dbo].[MST_City]
			 (          
				CityName, 
				FK_CountryId,
				FK_StateId,         
				IsActive,          
				CreatedBy,          
				CreatedDatetime    
              )          
             VALUES 
			  (
				@cCityName,    
				@iFK_CountryId,
				@iFK_StateId,     
				@bIsActive,          	    
				@iUserId,         
				GETDATE()       
	           ) 
			 SELECT 1 AS Message_Id,'City Added Successfully.' As Message      
        END   
   ELSE        
        BEGIN       
             SELECT 0 AS Message_Id,'City Name Already Exists.' AS Message      
        END                
     END   
   END       
 ELSE          
       BEGIN
                 IF NOT EXISTS
				 (
					SELECT 1 FROM [dbo].[MST_City](NOLOCK) 
					WHERE CityName=LTRIM(RTRIM(@cCityName)) 
					AND FK_CountryId = @iFK_CountryId
					AND FK_StateId = @iFK_StateId	
					AND PK_CityId <> @iPK_CityId AND IsActive =1
				 )  
                
				 BEGIN
					  UPDATE  [dbo].[MST_City]     SET  
					  CityName        = @cCityName,   
					  FK_CountryId    = @iFK_CountryId,
					  FK_StateId      = @iFK_StateId,
					  IsActive        = @bIsActive,    
					  UpdatedBy       = @iUserId,   
					  UpdatedDatetime = GETDATE()
					  WHERE PK_CityId=@iPK_CityId  
					  SELECT 1 AS Message_Id,'City Details Updated Successfully.' AS Message 
				END  
				ELSE  
                BEGIN  
                    SELECT 0 AS Message_Id,'City Name Already Exists.' AS Message   
                END   
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
