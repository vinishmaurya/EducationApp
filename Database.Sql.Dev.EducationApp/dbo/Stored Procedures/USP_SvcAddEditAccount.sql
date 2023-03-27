/*******************************************************************              
CreatedBy:Vinish
CreatedDate: 2023-02-28 01:04:02.400
Purpos:Add edit Account Master            
********************************************************************/                  
CREATE PROCEDURE [dbo].[USP_SvcAddEditAccount]                    
(                 
   @iPK_AccountId               BIGINT,    
   @StepCompleted				NVARCHAR(500)='',
   @NextStep					NVARCHAR(500)='',
   --AccountDetails
   @cAccountName                NVARCHAR(30) = '',              
   @iFK_CategoryId              BIGINT = 0,                        
   @iParentAccountId            BIGINT = 0,     
   @cContactPerson              NVARCHAR(30) = '',         
   @cMobileNo                   NVARCHAR(20) = '',            
   @cAlternateMobileNo          NVARCHAR(30) = '',                
   @cEmailId                    NVARCHAR(200) = '',             
   @cAlternateEmailId           NVARCHAR(200) = '', 
   @CreatedBy                   BIGINT = 0,   
   
   --Additional Info
   @cAccountAddress             NVARCHAR(30) = '',               
   @cZipCode                    NVARCHAR(30) = '',                 
   @iFK_CountryId               BIGINT = 0,                 
   @iFK_StateId                 BIGINT = 0,                 
   @iFK_CityId                  BIGINT = 0,     
   @cAccountLogo                NVARCHAR(max) = '',   
   
   --Credentials
   @bIsActive                   BIT = 1        
  ,@Username                   nvarchar(100) = ''          
  ,@Password                   nvarchar(20) = ''

  --Todo
  ,@UserLimit                  int  =0        
  ,@ShareVia varchar(50) = 0
)                    
AS                    
BEGIN TRY    
	--All Declearation
	DECLARE @cAccountLogo_BeforeUpdate VARCHAR(MAX) = '';
	DECLARE @FK_RoleId BIGINT = 0;
	DECLARE @cRoleName NVARCHAR(250)='' 
	IF 
	(
		@iPK_AccountId = 1
	)
	BEGIN
		SELECT 0 AS Message_Id,'Opps! You Not permitted to update super admin account details!' AS Message;
		RETURN
	END
	IF(@StepCompleted = 'AdditionalInfo') OR (@StepCompleted = 'Credentials')
	BEGIN
		IF(ISNULL(@iPK_AccountId,0) <= 0) OR NOT EXISTS(SELECT 1 FROM [dbo].[MST_Account](NOLOCK) WHERE PK_AccountId=ISNULL(@iPK_AccountId,0) AND CreatedBy = @CreatedBy)           
		BEGIN    
			SELECT 0 AS Message_Id,'Failed, (AccountId) parameter must be a valid id!' AS Message   
			RETURN;
		END
	END
	
	IF(@StepCompleted = 'AccountDetails')
	BEGIN
		--Validations
		IF EXISTS(SELECT 1 FROM [dbo].[MST_Account] (NOLOCK) WHERE AccountName=LTRIM(RTRIM(@cAccountName)) AND IsActive =1 AND CreatedBy = @CreatedBy AND PK_AccountId != ISNULL(@iPK_AccountId,0))            
		BEGIN    
			SELECT 0 AS Message_Id,'Failed, Account Name already exists!' AS Message   
			RETURN;
		END
		IF EXISTS(SELECT 1 FROM [dbo].[MST_Account](NOLOCK) WHERE MobileNo=@cMobileNo  AND IsActive=1 and CreatedBy = @CreatedBy AND PK_AccountId != ISNULL(@iPK_AccountId,0))                    
		BEGIN  
			SELECT 0 AS Message_Id,'Failed, Mobile No. already in use!' AS Message 
			RETURN;
		END
		IF EXISTS(SELECT 1 FROM [dbo].[MST_Account](NOLOCK) WHERE EmailId=@cEmailId  AND IsActive=1 and CreatedBy = @CreatedBy AND PK_AccountId != ISNULL(@iPK_AccountId,0))                    
		BEGIN   
			SELECT 0 AS Message_Id,'Failed, EmailId already in use!' AS Message  
			RETURN;
		END
		
		IF(ISNULL(@iPK_AccountId,0) <= 0)
		BEGIN  
			--After Validation
			INSERT INTO [dbo].[MST_Account]
			(                    
				AccountName, 
				FK_CategoryId,                                          
				ParentAccountId,      
				ContactPerson,     
				MobileNo, 
				AlternateMobileNo,
				EmailId,            
				AlternateEmailId,  
				CreatedBy,                       
				CreatedDatetime,
				StepCompleted,
				NextStep,
				IsActive
			)               
			VALUES                    
			(               
				RTRIM(LTRIM(@cAccountName)),               
				@iFK_CategoryId,                       
				@iParentAccountId,   
				RTRIM(LTRIM(@cContactPerson)),
				RTRIM(LTRIM(@cMobileNo)),            
				RTRIM(LTRIM(@cAlternateMobileNo)),                  
				RTRIM(LTRIM(@cEmailId)),            
				RTRIM(LTRIM(@cAlternateEmailId)),   
				@CreatedBy,                        
				GETDATE(),
				@StepCompleted,
				@NextStep,
				1
			)              
			SET @iPK_AccountId = @@IDENTITY;  
			SELECT 1 AS Message_Id,'A new account details created successfully, please complete all the steps!' As Message;  
			SELECT @iPK_AccountId CreatedAccountId;
		END
		ELSE
		BEGIN  
			UPDATE [dbo].[MST_Account] SET
			AccountName		 = RTRIM(LTRIM(@cAccountName)),           
			FK_CategoryId    = @iFK_CategoryId,                                                          
			ParentAccountId  = @iParentAccountId,    
			ContactPerson    = RTRIM(LTRIM(@cContactPerson)),
			MobileNo 		 = RTRIM(LTRIM(@cMobileNo)),            
			AlternateMobileNo= RTRIM(LTRIM(@cAlternateMobileNo)),     
			EmailId          = RTRIM(LTRIM(@cEmailId)),            
			AlternateEmailId = RTRIM(LTRIM(@cAlternateEmailId)),   
			UpdatedBy        = @CreatedBy,                                    
			UpdatedDatetime	 = GETDATE() ,
			NextStep		 = @NextStep,
			StepCompleted	 = @StepCompleted
			WHERE PK_AccountId=@iPK_AccountId     
			SELECT 1 AS Message_Id,'Account details step updated successfully, please complete all the steps!' As Message; 
			SELECT @iPK_AccountId CreatedAccountId;
		END
	END
	ELSE IF(@StepCompleted = 'AdditionalInfo')
	BEGIN
		SET @cAccountLogo_BeforeUpdate = 
		(
			SELECT ISNULL(AccountLogo,'') FROM [dbo].[MST_Account](NOLOCK)
			WHERE PK_AccountId=@iPK_AccountId   
		)
		UPDATE  [dbo].[MST_Account]     SET          
	    AccountAddress	=  rtrim(ltrim(@cAccountAddress)),                  
	    ZipCode			=  ISNULL(@cZipCode,0),                        
	    FK_CountryId	=  ISNULL(@iFK_CountryId,0),                  
	    FK_StateId		=  ISNULL(@iFK_StateId,0),                    
	    FK_CityId		=  ISNULL(@iFK_CityId,0),         
	    AccountLogo		=  IIF(RTRIM(LTRIM(@cAccountLogo)) <> '',RTRIM(LTRIM(@cAccountLogo)),AccountLogo),       
	    UpdatedBy		=  ISNULL(@CreatedBy,0),                      
	    UpdatedDatetime	=  GETDATE(),
		NextStep		=  ISNULL(@NextStep,''),
		StepCompleted	=  ISNULL(@StepCompleted,'')
	    WHERE PK_AccountId=@iPK_AccountId       
		SELECT 1 AS Message_Id,'Additional info step updated successfully, for (Account Id = '+CONVERT(VARCHAR(10),@iPK_AccountId)+')!' As Message;
		SELECT @cAccountLogo_BeforeUpdate AccountLogoBeforeUpdate;
	END
	ELSE IF(@StepCompleted = 'Credentials')
	BEGIN  
		IF EXISTS 
		(
			SELECT * FROM MST_User(NOLOCK) 
			WHERE rtrim(ltrim(UserName)) = rtrim(ltrim(@Username)) and 
			isnull(IsDeleted,0) = 0 AND IsActive=1 AND 
			PK_UserId != 
			(
				SELECT TOP 1 ISNULL(FK_UserId,0) FROM [dbo].[MST_Account]
				WHERE PK_AccountId = ISNULL(@iPK_AccountId,0)
			)
		)
		BEGIN  
			SELECT 0 AS Message_Id,'Failed, User Name already exist!' As Message 
			RETURN;
		END
		DECLARE @UserId bigint = 0;  
		SELECT 
		@iFK_CategoryId = FK_CategoryId,
		@iFK_CountryId = FK_CountryId,
		@iFK_StateId = FK_StateId,
		@iFK_CityId = FK_CityId,
		@cMobileNo = MobileNo,
		@cEmailId = EmailId
		FROM [dbo].[MST_Account](NOLOCK) WHERE PK_AccountId = @iPK_AccountId;
		
		IF(SELECT TOP 1 ISNULL(FK_UserId,0) FROM [dbo].[MST_Account] WHERE IsActive=1 AND PK_AccountId = ISNULL(@iPK_AccountId,0)) = 0
		BEGIN
			/*Setup User Credentials*/
			
			INSERT INTO [dbo].[MST_Role] (RoleName,FK_CategoryId,FK_AccountId,IsActive,HomePage,CreatedBy,CreatedDateTime)   
			VALUES ('Admin',@iFK_CategoryId,@iPK_AccountId,1,1,@CreatedBy,GETDATE());  
			SET @FK_RoleId = @@IDENTITY;  
			INSERT INTO [dbo].[MST_User]
			(
				FullName,UserName,UserPassword,FK_RoleId,FK_CategoryId,FK_AccountId,FK_CountryId,FK_StateId,
				FK_CityId,IsActive,IsDeleted,CreatedBy,CreatedDateTime,MobileNo,EmailId
			)           
			VALUES
			(
				RTRIM(LTRIM(@Username)),RTRIM(LTRIM(@Username)),RTRIM(LTRIM(@Password)),@FK_RoleId,@iFK_CategoryId,@iPK_AccountId ,@iFK_CountryId,@iFK_StateId,
				@iFK_CityId,1,0,@CreatedBy,GETDATE(),@cMobileNo,@cEmailId
			);          
			SET @UserId = @@IDENTITY;  
			INSERT INTO [dbo].[MAP_UserAccount] (FK_UserId,FK_AccountId,IsActive,IsDeleted,CreatedBy,CreatedDateTime) VALUES(@UserId,@iPK_AccountId,1,0,@CreatedBy,GETDATE())                        
			UPDATE [dbo].[MST_Account] SET FK_UserId = @UserId where PK_AccountId = @iPK_AccountId;   
	
			IF(ISNULL(@iPK_AccountId,0)<>0 AND ISNULL(@iFK_CategoryId,0)<>0)  
			BEGIN
				INSERT INTO Map_FormRole   
				(  
					FK_FormId,  
					FK_RoleId,   
					CanAdd,    
					CanEdit,  
					CanDelete,  
					CanView,  
					IsActive,  
					CreatedBy,  
					CreatedDateTime,  
					InsertionMode  
				)
				SELECT  
					DISTINCT  
					PK_FormId FK_FormId,  
					@iPK_AccountId FK_RoleId,
					1 CanAdd,
					1 CanEdit,
					1 CanDelete,
					1 CanView,
					1 IsActive,  
					1 CreatedBy,  
					GETDATE() CreatedDateTime,  
					'While Account Creation Default Mapping'   
				FROM [dbo].[MST_Form](NOLOCK) form  
				WHERE 
				form.IsActive = 1
				AND form.PK_FormId NOT IN  
				(  
					SELECT FK_FormId FROM Map_FormRole(NOLOCK) WHERE FK_RoleId = @iPK_AccountId  
				)  
				AND LTRIM(RTRIM(form.FormName))  IN  
				(  
					SELECT LTRIM(RTRIM(ISNULL(F.FormName,''))) FROM [dbo].MAP_DefaultCategoryForm(NOLOCK) M
					INNER JOIN [DBO].MST_Form(NOLOCK) F ON F.PK_FormId = M.FK_FormId
					WHERE  M.FK_CategoryId = @iFK_CategoryId AND 
					M.IsActive = 1	
				)  
		
				INSERT INTO MAP_FormAccount  
				(   
					FK_FormId,   
					FK_AccountId,   
					FK_CategoryId,   
					IsActive,   
					IsDeleted,   
					CreatedBy,   
					CreatedDateTime,
					InsertionMode,  
					CanAdd,  
					CanDelete,  
					CanView,  
					CanEdit  
				)  
				  
				SELECT  
					DISTINCT  
					formNew.PK_FormId FK_FormId,  
					ISNULL(@iPK_AccountId,0) FK_AccountId,  
					@iFK_CategoryId FK_CategoryId,
					1 IsActive,  
					0 IsDeleted,  
					@CreatedBy CreatedBy,  
					GETDATE() CreatedDateTime,
					'While Account Creation Default Mapping', 
					1 CanAdd,  
					1 CanDelete,  
					1 CanView,  
					1 CanEdit  
				FROM [dbo].[MST_Form](NOLOCK) formNew  
				WHERE   
				LTRIM(RTRIM(formNew.FormName))  IN  
				(  
					SELECT LTRIM(RTRIM(ISNULL(F.FormName,''))) FROM [dbo].MAP_DefaultCategoryForm(NOLOCK) M
					INNER JOIN [DBO].MST_Form(NOLOCK) F ON F.PK_FormId = M.FK_FormId
					WHERE  M.FK_CategoryId = @iFK_CategoryId AND 
					M.IsActive = 1	
				) AND  
				formNew.PK_FormId NOT IN   
				(  
					SELECT FormsAlready.FK_FormId FROM MAP_FormAccount(NOLOCK) FormsAlready   
					WHERE ISNULL(FormsAlready.FK_AccountId,0) = ISNULL(@iPK_AccountId,0)  AND FormsAlready.IsActive = 1  
				)  
			END 
		END
		ELSE
		BEGIN
			UPDATE  [dbo].[MST_User] SET             
			UpdatedBy		=  @CreatedBy,                      
			UpdatedDatetime	=  GETDATE(),
			Username		= IIF(ISNULL(@Username,'') <> '',@Username,Username),
			UserPassword	= IIF(ISNULL(@Password,'') <> '',@Password,UserPassword)
			WHERE PK_UserId=(SELECT TOP 1 ISNULL(FK_UserId,0) FROM [dbo].[MST_Account] WHERE IsActive=1 AND PK_AccountId = ISNULL(@iPK_AccountId,0))
		END
		UPDATE  [dbo].[MST_Account]     SET             
	    UpdatedBy		=  @CreatedBy,                      
	    UpdatedDatetime	=  GETDATE(),
		NextStep		= @NextStep,
		StepCompleted	= @StepCompleted,
		IsActive		= @bIsActive,
		FK_UserId		= IIF(ISNULL(@UserId,0) <> 0,@UserId,FK_UserId)
	    WHERE PK_AccountId=@iPK_AccountId 
		SELECT 1 AS Message_Id,'Credentials step updated successfully, for (Account Id = '+CONVERT(VARCHAR(10),@iPK_AccountId)+')!' As Message;
	END    
	ELSE
	BEGIN
		SELECT 0 AS Message_Id,'Failed, Invalid completed step was found!' AS Message   
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
	SELECT 0 AS Message_Id,ERROR_MESSAGE() +', Error Line: '+ CONVERT(VARCHAR(100),ERROR_LINE()) AS Message                    
END CATCH  
