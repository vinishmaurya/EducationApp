/******************************************                
CREATED BY:Vinish
CREATED DATE:2023-03-14 00:36:45.170
PURPOSE:To Add Form Details           
select * from MST_Form             
EXEC [dbo].[usp_AddEditForm]         
****************************************************/            
CREATE PROCEDURE [dbo].[USP_SvcAddEditForm]                  
(             
	@iPK_FormId            BIGINT,        
	@cFormName             NVARCHAR(100),          
	@cControllerName       NVARCHAR(100),    
	@cSPA_ComponentHref	NVARCHAR(500),    
	@cActionName           NVARCHAR(30),          
	@iFK_ParentId          BIGINT,       
	    
	--@iFK_MainId   INT,    
	--@iLevelId    INT,    
	--@iSortId    INT,    
	    
	       
	@iFK_SolutionId        BIGINT = 0,          
	@cClassName            NVARCHAR(30),                
	@cArea                 NVARCHAR(30),           
	@bIsActive             BIT,                
	@iUserId               BIGINT   ,        
	@cImageName            NVARCHAR(200)  ='' ,
	@cPlatFormType         NVARCHAR(30)
)                  
AS           
BEGIN TRY                    
IF(IsNull(@iPK_FormId,0)=0)            
BEGIN            
	DECLARE @isortid_ bigint          
	SET @isortid_=(SELECT MAX(ISNULL(SortId,0)) FROM dbo.MST_Form(NOLOCK) WHERE ISNULL(FK_ParentId,0) = ISNULL(@iFK_ParentId,0))+1            
	IF NOT EXISTS (SELECT 1 FROM dbo.MST_Form(NOLOCK) WHERE ISNuLL(Area,'') =ISNULL(@cArea,'') AND FormName=@cFormName  AND IsActive=1)            
	BEGIN            
		INSERT INTO [dbo].[MST_Form]            
		(          
			FK_SolutionId,    
			FormName,    
			ControllerName,    
			ActionName, 
			SPA_ComponentHref,
			FK_ParentId,    
			FK_MainId,    
			LevelId,    
			SortId,    
			[Image],    
			IsActive,    
			CreatedBy,    
			CreatedDate,          
			ClassName,    
			Area ,
			FormFor    
		)                    
		VALUES                    
		(                   
			ISNULL(@iFK_SolutionId,0),     
			ISNULL(LTRIM(RTRIM( @cFormName)),''),                      
			LTRIM(RTRIM(ISNULL(@cControllerName,''))),  
			LTRIM(RTRIM(ISNULL(@cSPA_ComponentHref,''))),  
			LTRIM(RTRIM(ISNULL(@cActionName,''))),                    
			ISNULL(@iFK_ParentId,0),      
			ISNULL(@iFK_ParentId,0),    
			1,    
			ISNULL(@isortid_,0),    
			LTRIM(RTRIM(ISNULL(@cImageName,''))),    
			ISNULL(@bIsActive,0),                
			ISNULL(@iUserId,0),        
			GETDATE(),        
			LTRIM(RTRIM(ISNULL(@cClassName,''))),               
			LTRIM(RTRIM(ISNULL(@cArea,''))),
			LTRIM(RTRIM(ISNULL(@cPlatFormType,'')))
		)                 
		SELECT 1 AS Message_Id,'Form ("'+ISNULL(LTRIM(RTRIM( @cFormName)),'')+'") Added Successfully.' As Message                
	END            
	ELSE            
	BEGIN            
		SELECT 0 AS Message_Id, 'Failed ? Form Name ("'+ISNULL(LTRIM(RTRIM( @cFormName)),'')+'") Already Exists.' As Message              
	END             
END                   
ELSE             
IF NOT EXISTS(SELECT 1 FROM dbo.MST_Form(NOLOCK) WHERE ISNuLL(Area,'') =ISNULL(@cArea,'') AND FormName=@cFormName AND IsActive=1 And PK_FormId<>@iPK_FormId)               
BEGIN                 
	UPDATE [dbo].[MST_Form]                     
	SET                  
	FK_SolutionId		= LTRIM(RTRIM(ISNULL(@iFK_SolutionId,0))),    
	FormName			= LTRIM(RTRIM(ISNULL(@cFormName,''))),     
	ControllerName		= LTRIM(RTRIM(ISNULL(@cControllerName,''))), 
	SPA_ComponentHref	= LTRIM(RTRIM(ISNULL(@cSPA_ComponentHref,''))),  
	ActionName			= LTRIM(RTRIM(ISNULL(@cActionName,''))),    
	FK_ParentId			= LTRIM(RTRIM(ISNULL(@iFK_ParentId,0))),    
	FK_MainId			= LTRIM(RTRIM(ISNULL(@iFK_ParentId,0))),    
	LevelId				= 1,    
	[Image]				= LTRIM(RTRIM(ISNULL(@cImageName,''))),    
	IsActive			= LTRIM(RTRIM(ISNULL(@bIsActive,0))),    
	ClassName			= LTRIM(RTRIM(ISNULL(@cClassName,''))),    
	Area				= LTRIM(RTRIM(ISNULL(@cArea,''))),
	FormFor				= LTRIM(RTRIM(ISNULL(@cPlatFormType,'')))
	WHERE PK_FormId=@iPK_FormId            
	SELECT 1 AS Message_Id,'Form Details ("'+ISNULL(LTRIM(RTRIM( @cFormName)),'')+'") Updated Successfully.' AS Message                    
END         
ELSE        
BEGIN        
	SELECT 0 AS Message_Id,'Form Name ("'+ISNULL(LTRIM(RTRIM( @cFormName)),'')+'") Already Exists.' AS Message        
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
