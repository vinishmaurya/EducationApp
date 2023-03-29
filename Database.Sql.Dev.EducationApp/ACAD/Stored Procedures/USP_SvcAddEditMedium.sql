/******************************************      
CreatedBy:Vinish
CreatedDate: 2023-03-28 00:00:37.650
purpos:Add edit Medium Master    
[ACAD].[USP_AddEditMedium]  
SELECT * FROM MST_Medium      
EXEC [ACAD].[USP_AddEditMedium] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [ACAD].[USP_SvcAddEditMedium]            
   (         
    @iPK_MediumId               BIGINT,       
    @cMediumName                NVARCHAR(50),      
    @bIsActive                   BIT,     
    @iUserId                     BIGINT
   )            
 AS            
 BEGIN TRY            
 IF(@iPK_MediumId=0)    
    BEGIN  
         IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Medium](NOLOCK) WHERE MediumName=LTRIM(RTRIM(@cMediumName)) AND IsActive =1 AND  ISNULL(IsDeleted,0)=0 )    
           BEGIN         
            INSERT INTO [ACAD].[MST_Medium]
            (            
            MediumName,            
            IsActive,                 
            CreatedBy,            
            CreatedDatetime      
            )            
            VALUES            
           (       
            @cMediumName,       
            @bIsActive,                          
            @iUserId,                  
            GETDATE()         
            )            
            SELECT 1 AS Message_Id,'Medium Added Successfully.' As Message        
          END     
         ELSE          
           BEGIN         
             SELECT 0 AS Message_Id,'Medium Name Already Exists.' AS Message        
           END                  
       
    END         
 ELSE            
       BEGIN        
	     DECLARE @iMediumExist INT
         SET @iMediumExist = (SELECT COUNT(*) FROM [ACAD].[MST_Subject](NOLOCK) WHERE FK_MediumId =@iPK_MediumId  AND IsActive=1 AND ISNULL(IsDeleted,0)=0)
	     IF(@iMediumExist=0)
              BEGIN           
                 IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Medium](NOLOCK) WHERE  MediumName=LTRIM(RTRIM(@cMediumName)) And PK_MediumId<>@iPK_MediumId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
				   BEGIN 
					   UPDATE  [ACAD].[MST_Medium]     SET   
					   MediumName       =      @cMediumName,   
					   IsActive          =      @bIsActive,      
					   UpdatedBy         =      @iUserId,          
					   UpdatedDatetime   =      GETDATE()             
					   WHERE PK_MediumId=@iPK_MediumId    
					   SELECT 1 AS Message_Id,'Medium Updated Successfully.' AS Message      
                   END
				ELSE    
                    BEGIN    
                       SELECT 0 AS Message_Id,'Medium Name Already Exists.' AS Message     
                    END 
              END
         ELSE
            BEGIN
		       IF(@bIsActive<>0)
		          BEGIN
		               IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Medium](NOLOCK) WHERE  MediumName=LTRIM(RTRIM(@cMediumName)) And PK_MediumId<>@iPK_MediumId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
                          BEGIN 	  
                          UPDATE  [ACAD].[MST_Medium]     SET   
					      MediumName       =      @cMediumName,   
					      IsActive          =      @bIsActive,      
					      UpdatedBy         =      @iUserId,          
					      UpdatedDatetime   =      GETDATE()             
					      WHERE PK_MediumId=@iPK_MediumId  
					         SELECT 1 AS Message_Id,'Medium Updated successfully.' AS Message     
                          END  
	                   ELSE
		       	          BEGIN
						    SELECT 0 AS Message_Id,'Medium Name Already Exists' AS Message 
				          END	
	
                  END
	           ELSE
		          BEGIN
			        SELECT 0 AS Message_Id, 'Faile! Can''t make changes due to data already mapped with this medium!' AS Message
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