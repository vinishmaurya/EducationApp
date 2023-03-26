 /******************************************                  
CREATED BY:Vinish
CREATED DATE:02 January 2020                  
PURPOSE:To Add Edit Form Column      
select * from MST_FormColumn               
EXEC [dbo].[usp_AddEditFormColumn] 0,1,1,'Account','Coumn Name',1          
****************************************************/       
CREATE PROCEDURE [dbo].[USP_SvcAddEditFormColumn]                  
(                  
 @iPK_FormColumnId                   BIGINT,         
 @iFK_FormId                         BIGINT,   
 @iFK_AccountId                      BIGINT,            
 @cFormName                          NVARCHAR(50),                 
 @cColumnName                        NVARCHAR(50),               
 @iUserId                            BIT =1            
)                  
AS                  
BEGIN TRY                  
 IF(@iPK_FormColumnId =0)          
 BEGIN        
    IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_FormColumn](NOLOCK) WHERE Form_Name=LTRIM(RTRIM(@cFormName))AND Column_Name=LTRIM(RTRIM(@cColumnName)) )            
               BEGIN            
               INSERT INTO [dbo].[MST_FormColumn]                   
               (       
                FK_FormId,                
                Form_Name,  
                FK_AccountId,                  
                Column_Name,  
                CreatedDateTime,  
                CreatedBy ,
		        IsActive
		  
               )                  
               VALUES         
               (       
                @iFK_FormId,             
                @cFormName,  
                @iFK_AccountId,              
                @cColumnName ,  
                GETDATE(),  
                @iUserId ,
			    1         
                )       
                SELECT 1 AS Message_Id,'Form Column Added Successfully.' As Message                
                END          
          ELSE            
             BEGIN          
                 SELECT 0 AS Message_Id,'Same Form Column Already Exists.' AS Message                    
               END         
      END             
   ELSE                    
                 BEGIN                        
                    IF NOT EXISTS(SELECT 1 FROM [dbo].[MST_FormColumn](NOLOCK) WHERE Form_Name=LTRIM(RTRIM(@cFormName))AND Column_Name=LTRIM(RTRIM(@cColumnName)) And PK_FormColumnId<>@iPK_FormColumnId )           
                    BEGIN            
                    UPDATE  [dbo].[MST_FormColumn] SET       
                    FK_FormId       =  @iFK_FormId,             
                    Form_Name       =  @cFormName,   
                    FK_AccountId    =  @iFK_AccountId,                    
                    Column_Name     =  @cColumnName,  
                    UpdatedDateTime =  GETDATE(),  
                    UpdatedBy       =@iUserId     
                    WHERE PK_FormColumnId=@iPK_FormColumnId           
                    SELECT 2 AS Message_Id,'Form Column Updated Successfully.' AS Message              
                    END            
                    ELSE            
                    BEGIN            
                        SELECT 0 AS Message_Id,'Same Form Column Already Exists.' AS Message             
                    END            
              END         
  END TRY                  
  BEGIN CATCH                  
      SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                  
  END CATCH 






