/******************************************      
CreatedBy:Vinish
CreatedDate: 2023-03-28 00:00:37.650
purpos:Add edit Subject Master    
[ACAD].[USP_AddEditSubject]  
SELECT * FROM MST_Subject      
EXEC [ACAD].[USP_AddEditSubject] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [ACAD].[USP_SvcAddEditSubject]            
(         
	@iPK_SubjectId			BIGINT,   
	@iMediumId				INT,
	@cSubjectName			NVARCHAR(50),      
	@cSubjectType			NVARCHAR(50),      
	@cSubjectCode			NVARCHAR(50),      
	@cBackgroundColorCode	NVARCHAR(50),  
	@cSubjectImageUrl		NVARCHAR(500),  
	@bIsActive				BIT,     
	@iUserId				BIGINT
)            
AS            
BEGIN TRY   
DECLARE @cSubjectImageUrl_BeforeUpdate VARCHAR(MAX) = '';
DECLARE @iSubjectExist INT
IF(@iPK_SubjectId=0)    
BEGIN         
	INSERT INTO [ACAD].[MST_Subject]
	(            
		FK_MediumId,				
		SubjectName,			
		SubjectType,			
		SubjectCode,			
		BackgroundColorCode,
		SubjectImageUrl,         
		IsActive,                 
		CreatedBy,            
		CreatedDatetime      
	)            
	VALUES            
	(       
		LTRIM(RTRIM(ISNULL(@iMediumId				,''))),
		LTRIM(RTRIM(ISNULL(@cSubjectName			,''))),
		LTRIM(RTRIM(ISNULL(@cSubjectType			,''))),
		LTRIM(RTRIM(ISNULL(@cSubjectCode			,''))),
		LTRIM(RTRIM(ISNULL(@cBackgroundColorCode	,''))),
		LTRIM(RTRIM(ISNULL(@cSubjectImageUrl		,''))),  
		ISNULL(@bIsActive				,0),                          
		ISNULL(@iUserId					,0),                  
		GETDATE()         
	 )            
	SELECT 1 AS Message_Id,'Subject Added Successfully.' As Message        
END 
ELSE
BEGIN        
	SET @iSubjectExist = 
	(
		SELECT COUNT(1) FROM [ACAD].[MAP_AssignClassSubject](NOLOCK) 
		WHERE FK_SubjectId =@iPK_SubjectId AND 
		IsActive=1 AND 
		ISNULL(IsDeleted,0)=0
	)
	IF(@iSubjectExist=0)
	BEGIN           
		IF NOT EXISTS
		(
			SELECT 1 FROM [ACAD].[MST_Subject](NOLOCK) 
			WHERE SubjectName=LTRIM(RTRIM(@cSubjectName)) And 
			PK_SubjectId<>@iPK_SubjectId AND 
			IsActive =1 AND 
			ISNULL(IsDeleted,0)=0
		)  
		BEGIN 
			SET @cSubjectImageUrl_BeforeUpdate = 
			(
				SELECT ISNULL(SubjectImageUrl,'') FROM [ACAD].[MST_Subject](NOLOCK)
				WHERE PK_SubjectId=@iPK_SubjectId   
			)
			UPDATE  [ACAD].[MST_Subject]     SET   
			FK_MediumId			= LTRIM(RTRIM(ISNULL(@iMediumId				,''))),		
			SubjectName			= LTRIM(RTRIM(ISNULL(@cSubjectName			,''))),	
			SubjectType			= LTRIM(RTRIM(ISNULL(@cSubjectType			,''))),	
			SubjectCode			= LTRIM(RTRIM(ISNULL(@cSubjectCode			,''))),	
			BackgroundColorCode	= LTRIM(RTRIM(ISNULL(@cBackgroundColorCode	,''))),
			SubjectImageUrl		= IIF(LTRIM(RTRIM(ISNULL(@cSubjectImageUrl,''))) <> '', LTRIM(RTRIM(ISNULL(@cSubjectImageUrl,''))),SubjectImageUrl),
			IsActive				= @bIsActive,      
			UpdatedBy			= @iUserId,          
			UpdatedDatetime		= GETDATE()                    
			WHERE PK_SubjectId=@iPK_SubjectId  
			SELECT 1 AS Message_Id,'Subject Updated successfully.' AS Message     
			SELECT @cSubjectImageUrl_BeforeUpdate SubjectImageBeforeUpdate;
		END  
		ELSE
		BEGIN
			SELECT 0 AS Message_Id,'Subject Name Already Exists' AS Message 
		END	
	END
	ELSE
	BEGIN
		SELECT 0 AS Message_Id, 'Faile! Can''t make changes due to data already mapped with this Subject!' AS Message
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