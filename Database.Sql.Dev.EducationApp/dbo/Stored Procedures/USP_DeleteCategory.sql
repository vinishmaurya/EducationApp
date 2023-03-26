/******************************************      
CreatedBy:sandeep Kumar     
CreatedDate:28-11-2019    
purpos:Get User Master  Deatils   
[dbo].[USP_DeleteUser]        
EXEC [dbo].[USP_DeleteCategory] 2,1  
********** ******************************************/    
  
CREATE PROCEDURE [dbo].[USP_DeleteCategory]          
   (  
 @iPK_CategoryId   BIGINT,  
 @iUserId          BIGINT    
   )  
  AS    
  BEGIN TRY     
   IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Account](NOLOCK) WHERE FK_CategoryId=@iPK_CategoryId AND Isnull(IsDeleted,0) =0  and IsActive=1)   
      BEGIN         
      UPDATE [dbo].[MST_Category]  
      SET    
   IsActive=0,  
      IsDeleted=1,    
      DeletedBy=@iUserId,    
      DeletedDateTime=GETDATE()   
      WHERE     
      PK_CategoryId=@iPK_CategoryId     
    
      SELECT 1 AS Message_Id,'Deleted Successfully.' AS Message   
   END    
       ELSE                
      BEGIN               
         SELECT 2 AS Message_Id,' Category Id Already Mapped With Account .' AS Message              
      END                        
                  
  END TRY    
       BEGIN CATCH    
             SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message    
       END CATCH    
    



