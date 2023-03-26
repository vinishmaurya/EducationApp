
/******************************************    
CreatedBy:Vinish
CreatedDate:2019-12-12 12:24:01.227
purpos: Delete 
[dbo].[USP_DeleteUser]      
EXEC [dbo].[USP_DeleteCategory] 2,1
********** ******************************************/  

CREATE PROCEDURE [dbo].[USP_DeleteMapFormLanguage]
   (
	@iPK_FormLanguageId	  bigint,
	@iUserId       bigint  
	--,@iFK_CompanyID bigint 
   )
  AS  
  BEGIN TRY  
	  
      UPDATE [dbo].[Map_FormLanguage]
      SET  
      --IsActive=0,  sandeep
      IsDeleted=1,  
      DeletedBy=@iUserId,  
      DeletedDateTime=GETDATE() 
      WHERE   
      PK_FormLanguageId=@iPK_FormLanguageId
  
      SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message   
	          
  END TRY  
       BEGIN CATCH  
             SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message  
       END CATCH  
  



