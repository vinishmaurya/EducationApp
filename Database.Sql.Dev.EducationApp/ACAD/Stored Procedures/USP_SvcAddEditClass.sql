/******************************************      
CreatedBy:Vinish
CreatedDate: 2023-03-28 00:00:37.650
purpos:Add edit Class Master    
[ACAD].[USP_AddEditClass]  
SELECT * FROM MST_Class      
EXEC [ACAD].[USP_AddEditClass] 1,'japan1',0,1
****************************************************/          
CREATE PROCEDURE [ACAD].[USP_SvcAddEditClass]            
(         
	@iPK_ClassId			BIGINT,   
	@iMediumId				INT,
	@cClassName				NVARCHAR(50),      
	@iSectionIds			NVARCHAR(50),
	@bIsActive				BIT,     
	@iUserId				BIGINT
)            
AS            
BEGIN TRY   
DECLARE @iClassSubjectExist INT,@iClassTeacherExist INT;
IF(@iPK_ClassId=0)    
BEGIN         
	INSERT INTO [ACAD].[MST_Class]
	(            
		FK_MediumId,				
		ClassName,			
		FK_SectionIds,        
		IsActive,                 
		CreatedBy,            
		CreatedDatetime      
	)            
	VALUES            
	(       
		LTRIM(RTRIM(ISNULL(@iMediumId				,''))),
		LTRIM(RTRIM(ISNULL(@cClassName			,''))),
		LTRIM(RTRIM(ISNULL(@iSectionIds			,''))),
		ISNULL(@bIsActive				,0),                          
		ISNULL(@iUserId					,0),                  
		GETDATE()         
	 )            
	SELECT 1 AS Message_Id,'Class Added Successfully.' As Message        
END 
ELSE
BEGIN        
	SET @iClassSubjectExist = 
	(
		SELECT COUNT(1) FROM [ACAD].[MAP_AssignClassSubject](NOLOCK) 
		WHERE FK_ClassId =@iPK_ClassId AND 
		IsActive=1 AND 
		ISNULL(IsDeleted,0)=0
	)
	SET @iClassTeacherExist = 
	(
		SELECT COUNT(1) FROM [ACAD].[MAP_AssignClassSubject](NOLOCK) 
		WHERE FK_ClassId =@iPK_ClassId AND 
		IsActive=1 AND 
		ISNULL(IsDeleted,0)=0
	)
	IF(@iClassSubjectExist=0 OR @iClassTeacherExist=0)
	BEGIN           
		IF NOT EXISTS
		(
			SELECT 1 FROM [ACAD].[MST_Class](NOLOCK) 
			WHERE ClassName=LTRIM(RTRIM(@cClassName)) And 
			PK_ClassId<>@iPK_ClassId AND 
			IsActive =1 AND 
			ISNULL(IsDeleted,0)=0
		)  
		BEGIN 
			UPDATE  [ACAD].[MST_Class]     SET   
			FK_MediumId			= LTRIM(RTRIM(ISNULL(@iMediumId				,''))),		
			ClassName			= LTRIM(RTRIM(ISNULL(@cClassName			,''))),	
			FK_SectionIds			= LTRIM(RTRIM(ISNULL(@iSectionIds			,''))),
			IsActive				= @bIsActive,      
			UpdatedBy			= @iUserId,          
			UpdatedDatetime		= GETDATE()                    
			WHERE PK_ClassId=@iPK_ClassId  
			SELECT 1 AS Message_Id,'Class Updated successfully.' AS Message     
		END  
		ELSE
		BEGIN
			SELECT 0 AS Message_Id,'Class Name Already Exists' AS Message 
		END	
	END
	ELSE
	BEGIN
		SELECT 0 AS Message_Id, 'Faile! Can''t make changes due to data already mapped with this Class to class subject or class teacher!' AS Message
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