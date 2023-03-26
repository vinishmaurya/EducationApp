/******************************************                
CreatedBy:Vinish            
CreatedDate:2023-03-16 23:12:08.887
purpos:Add edit User Master              
[dbo].[USP_AddEditUser]            
select * from [dbo].[MST_User]                
EXEC [dbo].[USP_AddEditUser]  42,'SHYAM_CUST41','email',1,1,1,1,'sintde@123','9852147197','stsie7d@1231',          
'ssi7id@129731','sestid@1231','M','2018-01-23','NDLS','3456',1,1,1,1,1,'abhishek'             
****************************************************/                    
CREATE PROCEDURE [dbo].[USP_SvcAddEditUser]                      
(                   
    @iPK_UserId            BIGINT = 0,                 
    @cUserName             NVARCHAR(30) = '',           
    @cShareBy              NVARCHAR(250) = '',           
    @iFK_CategoryId        BIGINT = '',                   
    @iFK_RoleId            BIGINT = 0,                   
    @iFK_CustomerId         BIGINT = 0,                   
    @iFK_AccountId         BIGINT = '',                 
    @cUserPassword         NVARCHAR(30) = '',                    
    @cMobileNo             NVARCHAR(20) = '',                    
    @iAlternateMobileNo    NVARCHAR (20) = '',                   
    @cEmailId              NVARCHAR (30) = '',                   
    @cAlternateEmailId     NVARCHAR (30) = '',                   
    @bGender               NVARCHAR(10) = '',                    
    @cDateOfBirth          nvarchar(50) = '',                   
    @cUserAddress          NVARCHAR(100) = '',                    
    @cZipCode              NVARCHAR(30) = '',                    
    @iFK_CountryId         BIGINT = 0,                   
    @iFK_StateId           BIGINT = 0,                   
    @iFK_CityId            BIGINT = 0,                   
    @bIsActive             BIT = 0,             
    @CreatedBy             BIGINT = 0,          
    @cFullName             NVARCHAR(250) = '',    
	@bIsVehicleSpecific    BIT = 0,      --Added By Meenakshi Jha (20-Feb-2020)    
	@cUnEncryptedPassword  NVARCHAR(500) = '', --USED TO SHARE PASSWORD VIA EMAIL, FOR THAT UNECRYPTED PASSWORD IS NEEDED. :: BY TARIQ : 28th FEB 20   ,
	@StepCompleted		   NVARCHAR(500) = '',
	@NextStep			   NVARCHAR(500) = '',
	@cUserLogo			   NVARCHAR(500) = ''
)                      
AS                      
BEGIN TRY    
--All Declearation
DECLARE @cUserLogo_BeforeUpdate VARCHAR(MAX) = '';
IF EXISTS(SELECT 1 FROM [dbo].[MST_User](NOLOCK) WHERE UserName=LTRIM(RTRIM(@cUserName)) AND IsActive =1)  
BEGIN
	SELECT 0 AS Message_Id,'Same user name already exists!' AS Message  
END
IF(@StepCompleted = 'AdditionalInfo') OR (@StepCompleted = 'Credentials')
BEGIN
	IF(ISNULL(@iPK_UserId,0) <= 0) OR NOT EXISTS(SELECT 1 FROM [dbo].[MST_User](NOLOCK) WHERE PK_UserId=ISNULL(@iPK_UserId,0) AND CreatedBy = @CreatedBy)           
	BEGIN    
		SELECT 0 AS Message_Id,'Failed, (UserId) parameter must be a valid id!' AS Message   
		RETURN;
	END	
END
IF(@StepCompleted = 'UserDetails')
BEGIN
	IF(ISNULL(@iPK_UserId,0) <= 0)
	BEGIN 
		INSERT INTO [dbo].[MST_User]                     
		(                         
			FullName,            
			MobileNo,                      
			EmailId,
			FK_RoleId,
			FK_AccountId,
			FK_CategoryId,
			IsActive, 
			IsDeleted, 
			CreatedBy,             
			CreatedDateTime,
			NextStep,
			StepCompleted
		)                      
		VALUES                  
		(                           
			@cFullName,                      
			@cMobileNo, 
			@cEmailId,  
			@iFK_RoleId,                       
			@iFK_AccountId,
			@iFK_CategoryId,
		    @bIsActive,
			0,
		    @CreatedBy,          
		    GETDATE(),
			@NextStep,
			@StepCompleted
		)
		DECLARE @UserId bigint = @@IDENTITY;  
		SELECT 1 AS Message_Id,'A new user ('+@cFullName+') details created successfully, please complete all the steps!' As Message;  
		SELECT @UserId CreatedUserId;
	END
	ELSE
	BEGIN
		UPDATE [dbo].[MST_User] SET
		FullName		 = @cFullName, 
		MobileNo		 = @cMobileNo, 
		EmailId			 = @cEmailId,  
		FK_RoleId		 = @iFK_RoleId,
		FK_AccountId	 = @iFK_AccountId, 
		FK_CategoryId	 = @iFK_CategoryId,
		IsActive		 = IIF(ISNULL(IsActive,0) <> 0, IsActive,@bIsActive),                 
		UpdatedBy        = @CreatedBy,                                    
		UpdatedDatetime	 = GETDATE(),
		NextStep		 = @NextStep,
		StepCompleted	 = @StepCompleted
		WHERE PK_UserId=@iPK_UserId     
		SELECT 1 AS Message_Id,'User details step updated successfully, please complete all the steps!' As Message; 
		SELECT @iPK_UserId CreatedUserId;
	END
    SELECT 1 AS Message_Id,'User ('+@cUserName+') created successfully.' As Message   
END
ELSE IF(@StepCompleted = 'AdditionalInfo')
BEGIN
	SET @cUserLogo_BeforeUpdate = 
	(
		SELECT ISNULL(AccountLogo,'') FROM [dbo].[MST_Account](NOLOCK)
		WHERE PK_AccountId=@iPK_UserId   
	)
	UPDATE  [dbo].[MST_User]     SET          
	Gender	=  rtrim(ltrim(@bGender)),
	DateOfBirth			=  ISNULL(@cDateOfBirth,''),
	AlternateEmailId  = rtrim(ltrim(@cAlternateEmailId)),
	AlternateMobileNo = rtrim(ltrim(@iAlternateMobileNo)),
	FK_CountryId	=  ISNULL(@iFK_CountryId,0),                  
	FK_StateId		=  ISNULL(@iFK_StateId,0),                    
	FK_CityId		=  ISNULL(@iFK_CityId,0),       
	ZipCode			=  ISNULL(@cZipCode,0),    
	UserAddress			=  ISNULL(@cUserAddress,0),         
	UpdatedBy		=  ISNULL(@UserId,0),                      
	UpdatedDatetime	=  GETDATE(),
	NextStep		=  ISNULL(@NextStep,''),
	StepCompleted	=  ISNULL(@StepCompleted,''),
	UserLogo		 = @cUserLogo
	WHERE PK_UserId=@iPK_UserId       
	SELECT 1 AS Message_Id,'Additional info step updated successfully, for (name = '+(SELECT TOP 1 ISNULL(FullName,'') FROM [dbo].[MST_User](NOLOCK) WHERE PK_UserId = @iPK_UserId)+')!' As Message
	SELECT @cUserLogo_BeforeUpdate UserLogoBeforeUpdate;
END   
ELSE IF(@StepCompleted = 'Credentials')
BEGIN
	IF EXISTS 
	(
		SELECT * FROM MST_User(NOLOCK) 
		WHERE rtrim(ltrim(UserName)) = rtrim(ltrim(@cUserName)) and 
		isnull(IsDeleted,0) = 0 AND IsActive=1
	)
	BEGIN  
		SELECT 0 AS Message_Id,'Failed, User Name already exist!' As Message 
		RETURN;
	END
	UPDATE  [dbo].[MST_User]     SET  
	UserName		= @cUserName,
	UserPassword	= @cUserPassword,
	UpdatedBy		=  @UserId,                      
	UpdatedDatetime	=  GETDATE(),
	NextStep		= @NextStep,
	StepCompleted	= @StepCompleted,
	IsActive		= @bIsActive
	WHERE PK_UserId=@iPK_UserId    
	SELECT 1 AS Message_Id,'Credentials step updated successfully, for (name = '+(SELECT TOP 1 ISNULL(FullName,'') FROM [dbo].[MST_User](NOLOCK) WHERE PK_UserId = @iPK_UserId)+')!' As Message;
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
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;    
