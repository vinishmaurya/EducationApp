/******************************************    
CreatedBy:Vinish   
CreatedDate:04-12-2019  
purpos:Delete  form column
[dbo].[USP_DeleteSim]   
select * from [dbo].[MST_FormColumn]   
EXEC [dbo].[USP_DeleteFormColumn] 1,1
********** ******************************************/  

CREATE PROCEDURE [dbo].[USP_SvcDeleteFormColumn]       
   (
	@iPK_FormColumnId	      BIGINT,
	@iUserId                  BIGINT  
   )
  AS  
  BEGIN TRY             
           UPDATE [dbo].[MST_FormColumn]
           SET  
		   IsActive=0,
           IsDeleted=1,  
           DeletedBy=@iUserId ,
           DeletedDateTime=GETDATE() 
           WHERE   
           PK_FormColumnId=@iPK_FormColumnId 
           SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message      
  END TRY  
  BEGIN CATCH  
        SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message  
  END CATCH  
  



