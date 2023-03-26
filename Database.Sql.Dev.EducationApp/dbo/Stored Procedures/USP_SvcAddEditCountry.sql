/******************************************      
CreatedBy:sandeep Kumar     
CreatedDate:28-11-2019    
purpos:Add edit Category Master    
[dbo].[USP_AddEditCountry]  
SELECT * FROM MST_COUNTRY      
EXEC [dbo].[USP_AddEditCountry] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcAddEditCountry]            
   (         
    @iPK_CountryId               BIGINT,       
    @cCountryName                NVARCHAR(50),      
    @bIsActive                   BIT,     
    @iUserId                     BIGINT
   )            
 AS            
 BEGIN TRY            
 IF(@iPK_CountryId=0)    
    BEGIN  
         IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Country](NOLOCK) WHERE CountryName=LTRIM(RTRIM(@cCountryName)) AND IsActive =1 AND  ISNULL(IsDeleted,0)=0 )    
           BEGIN         
            INSERT INTO [dbo].[MST_Country]           
            (            
            CountryName,            
            IsActive,                 
            CreatedBy,            
            CreatedDatetime      
            )            
            VALUES            
           (       
            @cCountryName,       
            @bIsActive,                          
            @iUserId,                  
            GETDATE()         
            )            
            SELECT 1 AS Message_Id,'Country Added Successfully.' As Message        
          END     
         ELSE          
           BEGIN         
             SELECT 0 AS Message_Id,'Country Name Already Exists.' AS Message        
           END                  
       
    END         
 ELSE            
       BEGIN        
	     DECLARE @iCountryExist INT
         SET @iCountryExist = (SELECT COUNT(*) FROM [dbo].[MST_State](NOLOCK) WHERE FK_CountryId =@iPK_CountryId  AND IsActive=1 AND ISNULL(IsDeleted,0)=0)
	     IF(@iCountryExist=0)
              BEGIN           
                 IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Country](NOLOCK) WHERE  CountryName=LTRIM(RTRIM(@cCountryName)) And PK_CountryId<>@iPK_CountryId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
				   BEGIN 
					   UPDATE  [dbo].[MST_Country]     SET   
					   CountryName       =      @cCountryName,   
					   IsActive          =      @bIsActive,      
					   UpdatedBy         =      @iUserId,          
					   UpdatedDatetime   =      GETDATE()             
					   WHERE PK_CountryId=@iPK_CountryId    
					   SELECT 1 AS Message_Id,'Country Updated Successfully.' AS Message      
                   END
				ELSE    
                    BEGIN    
                       SELECT 0 AS Message_Id,'Country Name Already Exists.' AS Message     
                    END 
              END
         ELSE
            BEGIN
		       IF(@bIsActive<>0)
		          BEGIN
		               IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Country](NOLOCK) WHERE  CountryName=LTRIM(RTRIM(@cCountryName)) And PK_CountryId<>@iPK_CountryId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
                          BEGIN 	  
                          UPDATE  [dbo].[MST_Country]     SET   
					      CountryName       =      @cCountryName,   
					      IsActive          =      @bIsActive,      
					      UpdatedBy         =      @iUserId,          
					      UpdatedDatetime   =      GETDATE()             
					      WHERE PK_CountryId=@iPK_CountryId  
					         SELECT 1 AS Message_Id,'Country Updated successfully.' AS Message     
                          END  
	                   ELSE
		       	          BEGIN
						    SELECT 0 AS Message_Id,'Country Name Already Exists' AS Message 
				          END	
	
                  END
	           ELSE
		          BEGIN
			        SELECT 0 AS Message_Id, 'State  Exists For this Country, So You Cannot Make Country InActive' AS Message
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
