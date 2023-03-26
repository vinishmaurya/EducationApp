/******************************************          
CreatedBy:Vinish  
CreatedDate:28-11-2019        
purpos:Add edit Category Master       
select * from mst_category       
[dbo].[USP_AddEditCategory]            
EXEC [dbo].[USP_AddEditCategory] 0,'Company2',1,1    
****************************************************/              
CREATE PROCEDURE [dbo].[USP_AddEditCategory]      
(             
 @iPK_CategoryId              BIGINT,           
 @cCategoryName               NVARCHAR(30),         
 @bIsActive                   BIT,         
 @iUserId                     BIGINT        
)                
 AS                
 BEGIN TRY                
 IF(@iPK_CategoryId=0)        
    BEGIN                
       BEGIN            
         IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Category](NOLOCK) WHERE CategoryName=LTRIM(RTRIM(@cCategoryName)) AND Isnull(IsDeleted,0) =0 )        
           BEGIN             
            INSERT INTO [dbo].[MST_Category]               
            (            
             CategoryName,         
             IsActive,               
             CreatedBy,              
             CreatedDatetime,  
    FK_CompanyId                     
            )                
            VALUES                
           (                  
             @cCategoryName,                   
             @bIsActive,                        
             @iUserId,                   
             GETDATE(),  
    1            
          )                
             SELECT 1 AS Message_Id,'Account Category Added Successfully.' As Message            
       END         
  ELSE              
      BEGIN             
         SELECT 0 AS Message_Id,'Account Category Name Already Exists.' AS Message            
      END                      
          END         
   END       
               
 ELSE                
 BEGIN             
 IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_Category](NOLOCK) WHERE CategoryName=LTRIM(RTRIM(@cCategoryName)) And PK_CategoryId<>@iPK_CategoryId AND Isnull(IsDeleted,0) =0 )        
         BEGIN      
         UPDATE  [dbo].[MST_Category]     SET             
         CategoryName          =        @cCategoryName,        
         IsActive              =        @bIsActive,                     
         UpdatedBy             =        @iUserId,              
         UpdatedDatetime       =        GETDATE(),  
   FK_CompanyId          =        1    
         WHERE PK_CategoryId=@iPK_CategoryId        
         SELECT 2 AS Message_Id,'Account Category Updated Successfully.' AS Message          
         END      
   ELSE        
       BEGIN        
            SELECT 0 AS Message_Id,'Account Category Name Already Exists.' AS Message         
       END      
 END            
END TRY                
BEGIN CATCH                
    SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                
END CATCH



