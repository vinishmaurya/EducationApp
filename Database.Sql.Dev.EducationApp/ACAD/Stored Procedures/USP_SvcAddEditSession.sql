/******************************************      
CreatedBy:Vinish
CreatedDate: 2023-03-28 00:00:37.650
purpos:Add edit Session Master    
[ACAD].[USP_AddEditSession]  USP_SvcAddEditSession
SELECT * FROM MST_Session      
EXEC [ACAD].[USP_AddEditSession] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [ACAD].[USP_SvcAddEditSession]            
   (         
    @iPK_SessionId               BIGINT,       
    @cSessionName                NVARCHAR(50),      
	@cStartDate                  NVARCHAR(20),      
	@cEndDate                    NVARCHAR(20),      
    @bIsActive                   BIT,     
    @iUserId                     BIGINT
   )            
 AS            
 BEGIN TRY            
 IF(@iPK_SessionId=0)    
    BEGIN  
         IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Session](NOLOCK) WHERE SessionName=LTRIM(RTRIM(@cSessionName)) AND IsActive =1 AND  ISNULL(IsDeleted,0)=0 )    
           BEGIN         
            INSERT INTO [ACAD].[MST_Session]
            (            
            SessionName,        
			StartDate,
			EndDate,
            IsActive,                 
            CreatedBy,            
            CreatedDatetime      
            )            
            VALUES            
           (       
            @cSessionName,  
			@cStartDate,
			@cEndDate,
            @bIsActive,                          
            @iUserId,                  
            GETDATE()         
            )            
            SELECT 1 AS Message_Id,'Session Added Successfully.' As Message        
          END     
         ELSE          
           BEGIN         
             SELECT 0 AS Message_Id,'Session Name Already Exists.' AS Message        
           END                  
       
    END         
 ELSE            
       BEGIN        
	     --DECLARE @iSessionExist INT
      --   SET @iSessionExist = (SELECT COUNT(*) FROM [ACAD].[MST_Subject](NOLOCK) WHERE FK_SessionId =@iPK_SessionId  AND IsActive=1 AND ISNULL(IsDeleted,0)=0)
	     --IF(@iSessionExist=0)
      --        BEGIN           
                 IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Session](NOLOCK) WHERE  SessionName=LTRIM(RTRIM(@cSessionName)) And PK_SessionId<>@iPK_SessionId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
				   BEGIN 
					   UPDATE  [ACAD].[MST_Session]     SET   
					   SessionName       =      @cSessionName, 
					   StartDate         =      @cStartDate, 
					   EndDate	         =      @cEndDate, 
					   IsActive          =      @bIsActive,      
					   UpdatedBy         =      @iUserId,          
					   UpdatedDatetime   =      GETDATE()             
					   WHERE PK_SessionId=@iPK_SessionId    
					   SELECT 1 AS Message_Id,'Session Updated Successfully.' AS Message      
                   END
				ELSE    
                    BEGIN    
                       SELECT 0 AS Message_Id,'Session Name Already Exists.' AS Message     
                    END 
              END
       --  ELSE
       --     BEGIN
		     --  IF(@bIsActive<>0)
		     --     BEGIN
		     --          IF NOT EXISTS(SELECT 1 FROM [ACAD].[MST_Session](NOLOCK) WHERE  SessionName=LTRIM(RTRIM(@cSessionName)) And PK_SessionId<>@iPK_SessionId AND IsActive =1 AND ISNULL(IsDeleted,0)=0)  
       --                   BEGIN 	  
       --                   UPDATE  [ACAD].[MST_Session]     SET   
					  --    SessionName       =      @cSessionName,   
					  --    IsActive          =      @bIsActive,      
					  --    UpdatedBy         =      @iUserId,          
					  --    UpdatedDatetime   =      GETDATE()             
					  --    WHERE PK_SessionId=@iPK_SessionId  
					  --       SELECT 1 AS Message_Id,'Session Updated successfully.' AS Message     
       --                   END  
	      --             ELSE
		     --  	          BEGIN
						 --   SELECT 0 AS Message_Id,'Session Name Already Exists' AS Message 
				   --       END	
	
       --           END
	      --     ELSE
		     --     BEGIN
			    --    SELECT 0 AS Message_Id, 'Faile! Can''t make changes due to data already mapped with this Session!' AS Message
			    --   END 
	      --  END
       --END

               
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