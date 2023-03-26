
/*****************************************************************          
Created By: Vinish      
Created Date:12-12-2019         
Purpose: Deleted User Account Mapping        
EXEC [dbo].[usp_DeleteUserAccountMapping] 1        
*******************************************************************/      
    
CREATE PROCEDURE [dbo].[usp_DeleteUserAccountMapping]      
(      
--declare    
 @iPK_UserAccountId BIGINT ,  
 @iUserId BIGINT  
)      
AS      
BEGIN TRY      
 UPDATE MAP_UserAccount    
 SET
 
 IsActive=0,
 IsDeleted=1,
 DeletedBy=@iUserId,
 DeletedDateTime=GETDATE()
 WHERE PK_UserAccountId=@iPK_UserAccountId    
    
SELECT 1 AS Message_Id, 'User Account Mapping Deleted Successfully.' AS Message     
    
END TRY      
      
BEGIN CATCH      
 SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message      
END CATCH



