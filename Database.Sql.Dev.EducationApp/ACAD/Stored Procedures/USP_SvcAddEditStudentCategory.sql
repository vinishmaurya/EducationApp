/******************************************      
CreatedBy:Vinish
CreatedDate: 2023-03-28 00:00:37.650
purpos:Add edit StudentCategory Master    
[ACAD].[USP_AddEditStudentCategory]  
SELECT * FROM MST_StudentCategory      
EXEC [ACAD].[USP_AddEditStudentCategory] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [ACAD].[USP_SvcAddEditStudentCategory]            
   (         
    @iPK_StudentCategoryId               BIGINT,       
    @cStudentCategoryName                NVARCHAR(50),      
    @bIsActive                   BIT,     
    @iUserId                     BIGINT
   )            
 AS            
 BEGIN TRY            
 IF(@iPK_StudentCategoryId=0)    
    BEGIN  
         IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_StudentCategory](NOLOCK) WHERE StudentCategoryName=LTRIM(RTRIM(@cStudentCategoryName)) AND IsActive =1 AND  ISNULL(IsDeleted,0)=0 )    
           BEGIN         
            INSERT INTO [ACAD].[MST_StudentCategory]
            (            
            StudentCategoryName,            
            IsActive,                 
            CreatedBy,            
            CreatedDatetime      
            )            
            VALUES            
           (       
            @cStudentCategoryName,       
            @bIsActive,                          
            @iUserId,                  
            GETDATE()         
            )            
            SELECT 1 AS Message_Id,'StudentCategory Added Successfully.' As Message        
          END     
         ELSE          
           BEGIN         
             SELECT 0 AS Message_Id,'StudentCategory Name Already Exists.' AS Message        
           END                  
       
    END         
 ELSE            
       BEGIN        
	     DECLARE @iStudentCategoryExist INT
         SET @iStudentCategoryExist = (SELECT COUNT(*) FROM [ACAD].[MST_Student](NOLOCK) WHERE FK_StudentCategoryId =@iPK_StudentCategoryId  AND IsActive=1 AND ISNULL(IsDeleted,0)=0)
	     IF(@iStudentCategoryExist=0)
              BEGIN           
                 IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_StudentCategory](NOLOCK) WHERE  StudentCategoryName=LTRIM(RTRIM(@cStudentCategoryName)) And PK_StudentCategoryId<>@iPK_StudentCategoryId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
				   BEGIN 
					   UPDATE  [ACAD].[MST_StudentCategory]     SET   
					   StudentCategoryName       =      @cStudentCategoryName,   
					   IsActive          =      @bIsActive,      
					   UpdatedBy         =      @iUserId,          
					   UpdatedDatetime   =      GETDATE()             
					   WHERE PK_StudentCategoryId=@iPK_StudentCategoryId    
					   SELECT 1 AS Message_Id,'StudentCategory Updated Successfully.' AS Message      
                   END
				ELSE    
                    BEGIN    
                       SELECT 0 AS Message_Id,'StudentCategory Name Already Exists.' AS Message     
                    END 
              END
         ELSE
            BEGIN
		       IF(@bIsActive<>0)
		          BEGIN
		               IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_StudentCategory](NOLOCK) WHERE  StudentCategoryName=LTRIM(RTRIM(@cStudentCategoryName)) And PK_StudentCategoryId<>@iPK_StudentCategoryId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
                          BEGIN 	  
                          UPDATE  [ACAD].[MST_StudentCategory]     SET   
					      StudentCategoryName       =      @cStudentCategoryName,   
					      IsActive          =      @bIsActive,      
					      UpdatedBy         =      @iUserId,          
					      UpdatedDatetime   =      GETDATE()             
					      WHERE PK_StudentCategoryId=@iPK_StudentCategoryId  
					         SELECT 1 AS Message_Id,'StudentCategory Updated successfully.' AS Message     
                          END  
	                   ELSE
		       	          BEGIN
						    SELECT 0 AS Message_Id,'StudentCategory Name Already Exists' AS Message 
				          END	
	
                  END
	           ELSE
		          BEGIN
			        SELECT 0 AS Message_Id, 'Faile! Can''t make changes due to data already mapped with this student category!' AS Message
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