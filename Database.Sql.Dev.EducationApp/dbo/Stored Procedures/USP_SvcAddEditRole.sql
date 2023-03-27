/******************************************        
CREATED BY:Vinish      
CREATED DATE: 2023-03-18 18:23:33.157
PURPOSE:To AddEditAlertDetails   
select * from mst_role(nolock)      
EXEC [dbo].[USP_AddEditRole] 0,'asd',3,1,1,1,1,1
****************************************************/  
CREATE PROCEDURE [dbo].[USP_SvcAddEditRole]        
   (     
    @iPK_RoleId	                  BIGINT,	  
    @cRoleName	                  NVARCHAR(30),  
    @iFK_CategoryId               BIGINT = 0,
	@iFK_AccountId	              BIGINT = 0,
	@iHomePage                    BIGINT,
	@bIsActive                    BIT, 
    @iUserId	                  BIGINT ,
	@iFK_CustomerId				  BIGINT = 0 
   )        
AS        
BEGIN TRY        
 IF(ISNULL(@iPK_RoleId,0)	=0)
                 BEGIN    
                      IF NOT  EXISTS(SELECT 1 FROM [dbo].[MST_Role](NOLOCK) 
										WHERE RoleName=LTRIM(RTRIM(@cRoleName))  
										AND  FK_CustomerId=@iFK_CustomerId	 
										AND FK_AccountId=@iFK_AccountId 
										AND ISNULL(IsActive,0)=1
									)
			                    BEGIN     
							          INSERT INTO [dbo].[MST_Role]       
								     (        
									  RoleName,	     
									  FK_CategoryId,  
									  FK_AccountId,	 
									  HomePage,       
									  IsActive,        
									  CreatedBy,	      
									  CreatedDatetime,
									  FK_CustomerId
								      )        
							         VALUES        
								     (   
									  LTRIM(RTRIM(@cRoleName)),	            
									  @iFK_CategoryId,         
									  @iFK_AccountId,	          
									  @iHomePage,              
									  @bIsActive,              
									  @iUserId,	           
									  GETDATE()	,
									  @iFK_CustomerId
								      )        
						
					                 SELECT 1 AS Message_Id,'Role("'+LTRIM(RTRIM(@cRoleName))+'") Added Successfully.' As Message  
									 SELECT @@IDENTITY RoleId;
					              END        
		              ELSE      
			          BEGIN     
			            	SELECT 0 AS Message_Id,'Role Already Exists.' AS Message    
			          END              
                 END 	   
    
   ELSE        
  	   BEGIN 		
	    IF 
		(
			@iPK_RoleId = 1
		)
		BEGIN
			SELECT 0 AS Message_Id,'Opps! You Not permitted to update super admin role details!' AS Message;
			RETURN
		END
			IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Role](NOLOCK) 
										WHERE RoleName=LTRIM(RTRIM(@cRoleName))  
										AND  FK_CustomerId=@iFK_CustomerId	 
										AND FK_AccountId=@iFK_AccountId 
										AND ISNULL(IsActive,0)=1
										AND PK_RoleId<>@iPK_RoleId
						  )
				 BEGIN
				 UPDATE  [dbo].[MST_Role]     SET 
				 RoleName	            =  LTRIM(RTRIM(@cRoleName)),	                
				 FK_CategoryId          =  @iFK_CategoryId,           
				 FK_AccountId	        =  @iFK_AccountId,	           
				 HomePage               =  @iHomePage,             
				 IsActive               =  @bIsActive,                   
		         UpdatedBy   	        =  @iUserId,	     
				 UpdatedDatetime 		=  GETDATE(),
				 FK_CustomerId			=  @iFK_CustomerId	
				 WHERE PK_RoleId=@iPK_RoleId
			     SELECT 1 AS Message_Id,'Role ("'+LTRIM(RTRIM(@cRoleName))+'") Updated Successfully.' AS Message 
				 SELECT @iPK_RoleId RoleId;
				 END
		  ELSE
		  BEGIN
		      SELECT 0 AS Message_Id,'Role Already Exists.' AS Message 
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
