/******************************************      
CreatedBy:Vinish
CreatedDate: 2023-03-28 00:00:37.650
purpos:Add edit Section Master    
[ACAD].[USP_AddEditSection]  
SELECT * FROM MST_Section      
EXEC [ACAD].[USP_SvcAddEditSection] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [ACAD].[USP_SvcAddEditSection]            
   (         
    @iPK_SectionId               BIGINT,       
    @cSectionName                NVARCHAR(50),      
    @bIsActive                   BIT,     
    @iUserId                     BIGINT
   )            
 AS            
 BEGIN TRY            
 IF(@iPK_SectionId=0)    
    BEGIN  
         IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Section](NOLOCK) WHERE SectionName=LTRIM(RTRIM(@cSectionName)) AND IsActive =1 AND  ISNULL(IsDeleted,0)=0 )    
           BEGIN         
            INSERT INTO [ACAD].[MST_Section]
            (            
            SectionName,            
            IsActive,                 
            CreatedBy,            
            CreatedDatetime      
            )            
            VALUES            
           (       
            @cSectionName,       
            @bIsActive,                          
            @iUserId,                  
            GETDATE()         
            )            
            SELECT 1 AS Message_Id,'Section Added Successfully.' As Message        
          END     
         ELSE          
           BEGIN         
             SELECT 0 AS Message_Id,'Section Name Already Exists.' AS Message        
           END                  
       
    END         
 ELSE            
       BEGIN        
	     DECLARE @iSectionExist INT
         SET @iSectionExist = (SELECT COUNT(*) FROM [ACAD].[MST_Class](NOLOCK) WHERE FK_SectionId =@iPK_SectionId  AND IsActive=1 AND ISNULL(IsDeleted,0)=0)
	     IF(@iSectionExist=0)
              BEGIN           
                 IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Section](NOLOCK) WHERE  SectionName=LTRIM(RTRIM(@cSectionName)) And PK_SectionId<>@iPK_SectionId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
				   BEGIN 
					   UPDATE  [ACAD].[MST_Section]     SET   
					   SectionName       =      @cSectionName,   
					   IsActive          =      @bIsActive,      
					   UpdatedBy         =      @iUserId,          
					   UpdatedDatetime   =      GETDATE()             
					   WHERE PK_SectionId=@iPK_SectionId    
					   SELECT 1 AS Message_Id,'Section Updated Successfully.' AS Message      
                   END
				ELSE    
                    BEGIN    
                       SELECT 0 AS Message_Id,'Section Name Already Exists.' AS Message     
                    END 
              END
         ELSE
            BEGIN
		       IF(@bIsActive<>0)
		          BEGIN
		               IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Section](NOLOCK) WHERE  SectionName=LTRIM(RTRIM(@cSectionName)) And PK_SectionId<>@iPK_SectionId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
                          BEGIN 	  
                          UPDATE  [ACAD].[MST_Section]     SET   
					      SectionName       =      @cSectionName,   
					      IsActive          =      @bIsActive,      
					      UpdatedBy         =      @iUserId,          
					      UpdatedDatetime   =      GETDATE()             
					      WHERE PK_SectionId=@iPK_SectionId  
					         SELECT 1 AS Message_Id,'Section Updated successfully.' AS Message     
                          END  
	                   ELSE
		       	          BEGIN
						    SELECT 0 AS Message_Id,'Section Name Already Exists' AS Message 
				          END	
	
                  END
	           ELSE
		          BEGIN
			        SELECT 0 AS Message_Id, 'Faile! Can''t make changes due to data already mapped with this section!' AS Message
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