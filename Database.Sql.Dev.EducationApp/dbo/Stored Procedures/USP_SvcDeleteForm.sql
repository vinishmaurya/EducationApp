/******************************************    
CreatedBy:sandeep Kumar   
CreatedDate:12-12-2019  
purpos:Get Delete Form
[dbo].[USP_DeleteForm]      
EXEC [dbo].[USP_DeleteForm] 2,1
********** ******************************************/  
CREATE Procedure [dbo].[USP_SvcDeleteForm] 
  (
	@iPK_FormId	  BIGINT,
	@iUserId      BIGINT  
   )
    AS  
BEGIN TRY         
	DECLARE @FormName VARCHAR(500) = (SELECT TOP 1 FormName from [MST_Form](NOLOCK) WHERE PK_FormId = @iPK_FormId);
	IF(ISNULL(@FormName,'') = '')
	BEGIN
		SELECT 0 AS Message_Id,'Deletion Failed, Invalid form details was supplied!' AS Message 
		RETURN
	END
    UPDATE [dbo].[MST_Form]
    SET 
	IsActive=0, 
    IsDeleted=1,  
    DeletedBy=@iUserId,  
    DeletedDateTime=GETDATE() 
    WHERE   
    PK_FormId=@iPK_FormId 
    SELECT 1 AS Message_Id,'Form ("'+@FormName+'") Deleted Successfully.' AS Message 
END TRY  
BEGIN CATCH  
      SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message  
END CATCH  
