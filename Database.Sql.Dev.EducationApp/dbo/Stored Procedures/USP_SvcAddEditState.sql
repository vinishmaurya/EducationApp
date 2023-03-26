/******************************************    
CreatedBy:Vinish
CreatedDate:28-11-2019  
purpose:Add edit State Master  
[dbo].[USP_AddEditState] 
select * from MST_State     
EXEC [dbo].[USP_AddEditState] 1,1,1,'UP',1,1,1
****************************************************/        
CREATE PROCEDURE [dbo].[USP_SvcAddEditState]          
   (   
    @iPK_StateId                 BIGINT,   
	@iFK_CountryId               BIGINT,       
    @cStateName                  NVARCHAR(50),    
    @bIsActive                   BIT,      
    @iUserId                     BIGINT    
	)          
 AS          
 BEGIN TRY          
 IF(@iPK_StateId=0)  
    BEGIN    
         IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_State](NOLOCK) WHERE StateName=LTRIM(RTRIM(@cStateName)) AND FK_CountryId = @iFK_CountryId AND IsActive =1 AND  ISNULL(IsDeleted,0)=0 )  
            BEGIN       
            INSERT INTO [dbo].[MST_State]
			(          
				StateName, 
				FK_CountryId,         
				IsActive,          
				CreatedBy,          
				CreatedDatetime    
            )          
            VALUES 
			(
				@cStateName,    
				@iFK_CountryId,     
				@bIsActive,          
				@iUserId,         
				GETDATE()       
	        ) 
			 SELECT 1 AS Message_Id,'State Added Successfully.' As Message      
          END   
         ELSE        
            BEGIN       
              SELECT 0 AS Message_Id,'State Name Already Exists In Selected Country.' AS Message      
            END                
        
     END       
 ELSE    
     BEGIN        
	      DECLARE @iStateExist INT
          SET @iStateExist = (SELECT COUNT(*) FROM [dbo].[MST_City](NOLOCK) WHERE FK_StateId =@iPK_StateId  AND IsActive=1 AND ISNULL(IsDeleted,0)=0)
	      IF(@iStateExist=0)
             BEGIN              
                  IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_State](NOLOCK) WHERE  StateName=LTRIM(RTRIM(@cStateName)) And PK_StateId<>@iPK_StateId AND  FK_CountryId = @iFK_CountryId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
                    BEGIN  
				        UPDATE  [dbo].[MST_State] SET  
				        StateName       = @cStateName,   
				        FK_CountryId    = @iFK_CountryId,
				        IsActive        = @bIsActive,    
				        UpdatedBy       = @iUserId,   
				        UpdatedDatetime = GETDATE()
				        WHERE PK_StateId= @iPK_StateId  
                        SELECT 1 AS Message_Id,'State Details Updated Successfully.' AS Message    
                    END  
                  ELSE  
                     BEGIN  
                        SELECT 0 AS Message_Id,'State Name Already Exists In Selected Country.' AS Message    
                      END   
             END  
	   
	      ELSE
            BEGIN
		       IF(@bIsActive<>0)
		          BEGIN
		               IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_State](NOLOCK) WHERE  StateName=LTRIM(RTRIM(@cStateName)) And PK_StateId<>@iPK_StateId AND  FK_CountryId = @iFK_CountryId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
                          BEGIN 	  
                             UPDATE  [dbo].[MST_State] SET  
				             StateName       = @cStateName,   
				             FK_CountryId    = @iFK_CountryId,
				             IsActive        = @bIsActive,    
				             UpdatedBy       = @iUserId,   
				             UpdatedDatetime = GETDATE()
				             WHERE PK_StateId= @iPK_StateId  
                             SELECT 1 AS Message_Id,'State Details Updated Successfully.' AS Message       
                          END  
	                  ELSE
		       	          BEGIN
                              SELECT 0 AS Message_Id,'State Name Already Exists In Selected Country.' AS Message    
				          END	
	
                  END
	           ELSE
		          BEGIN
			          SELECT 0 AS Message_Id, 'City Exists For this State, So You Cannot Make State InActive' AS Message
			      END 
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
