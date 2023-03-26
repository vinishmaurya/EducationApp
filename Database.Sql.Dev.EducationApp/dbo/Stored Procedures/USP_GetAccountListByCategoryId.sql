/******************************************      
CreatedBy:sandeep Kumar     
CreatedDate:12-12-2019    
purpos:Get All Account Name by Category Id  
[dbo].[USP_GetAccountListByCategoryId]        
EXEC [dbo].[USP_GetAccountListByCategoryId] 1  
****************************************************/    
CREATE PROCEDURE [dbo].[USP_GetAccountListByCategoryId]      
(    
 @iFK_CategoryId BIGINT = 0    
)            
AS    
BEGIN     
SELECT 1 AS Message_Id,'Success' AS Message     
    SELECT     
    PK_AccountId,    
    AccountName    
    FROM MST_Account(NOLOCK)    
    WHERE FK_CategoryId=@iFK_CategoryId    
    AND isnull(IsActive,0) = 1  AND isnull(IsDeleted,0) <> 1  
END




