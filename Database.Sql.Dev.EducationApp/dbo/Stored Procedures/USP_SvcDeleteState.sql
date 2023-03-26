/******************************************    
CreatedBy:Vinish
CreatedDate:04-12-2019  
purpos:Delete  State
[dbo].[USP_DeleteState]      
EXEC [dbo].[USP_DeleteState] 2,1
********** ******************************************/  
CREATE PROCEDURE [dbo].[USP_SvcDeleteState]        
(
	@iPK_StateId	  bigint,
	@iUserId          bigint  
)
AS  
BEGIN TRY
DECLARE @iStateExist INT
SET @iStateExist = (SELECT COUNT(*) FROM [dbo].[MST_City](NOLOCK) WHERE FK_StateId =@iPK_StateId) 
IF(ISNULL(@iStateExist,0)=0) 
BEGIN             
	UPDATE [dbo].[MST_State]
	SET 
	IsActive=0, 
	IsDeleted=1,  
	DeletedBy=@iUserId,  
	DeletedDateTime=GETDATE() 
	WHERE   
	PK_StateId=@iPK_StateId	
	SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message
END
ELSE
BEGIN
	SELECT 0 AS Message_Id,'You Cannot Delete State As it Exists in City master.' AS Message 
END         
END TRY  
BEGIN CATCH  
      SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message  
END CATCH  
