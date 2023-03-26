/******************************************                
CreatedBy:sandeep Kumar               
CreatedDate:28-11-2019              
purpos:Get Category Master Details              
ModifiedBy: Vinish            
ModifiedDate: 2019-12-11 15:41:55.200            
purpos: Some fields are missing to mapping at the time of CURD            
[dbo].[USP_GetCategoryDetails]                 
SELECT * FROM [dbo].[MST_Category]               
EXEC [dbo].[USP_AddEditMapFormLanguage] 0,1,'english1','employeeDetails',1,1,1              
select * from Map_FormLanguage              
****************************************************/                
CREATE PROCEDURE [dbo].[USP_AddEditMapFormLanguage]              
(             
@iPK_FormLanguageId     bigint,              
@iFK_FormId             bigint,              
@cTranslatedFormName          nvarchar(100),              
@iFK_LanguageId                      bigint,              
@bIsActive              bit,                      
@iUserId                bigint ,           
@iFK_AccountID bigint    ,        
@iFK_CustomerID bigint            
)              
AS                          
 BEGIN TRY                          
 IF(@iPK_FormLanguageId=0)                  
 BEGIN                               
  IF NOT EXISTS(SELECT 1 FROM [dbo].[Map_FormLanguage](NOLOCK) WHERE FK_FormId=@iFK_FormId AND FK_LanguageId = @IFK_LanguageId AND IsActive =1            
     AND CreatedBy = @iUserId-- and FK_CompanyID  = @iFK_CompanyID            
     )                  
     BEGIN                                                         
     INSERT INTO [dbo].[Map_FormLanguage]                         
     (               
     FK_FormId,              
     TranslatedFormName,              
     FK_LanguageId,              
     IsActive,                       
     CreatedBy,              
     CreatedDateTime            
     ,FK_AccountID               
	 ,FK_CustomerID               
     )                          
     VALUES                          
     (                
     @iFK_FormId,              
     rtrim(ltrim(@cTranslatedFormName)),              
     @iFK_LanguageId,              
     @bIsActive,              
     @iUserId,              
     GETDATE()              
     ,@iFK_AccountID               
	 ,@iFK_CustomerID
     )              
     SELECT 1 AS Message_Id,'Form Language Mapping Inserted Successfully.' As Message                      
     END                   
     ELSE                        
     BEGIN                       
     SELECT 3 AS Message_Id,'This Form Language Mapping Already Exists.' AS Message                       
     END                              
 END              
 ELSE  --Update Start                    
 BEGIN                              
  IF not EXISTS(SELECT 1 FROM [dbo].[Map_FormLanguage](NOLOCK) WHERE  FK_FormId=@iFK_FormId And FK_LanguageId = @IFK_LanguageId and PK_FormLanguageId<>@iPK_FormLanguageId AND IsActive =1 
  and CreatedBy = @iUserId
     )                  
     begin            
      UPDATE  [dbo].[Map_FormLanguage]     SET                 
      FK_FormId         = @iFK_FormId,              
      TranslatedFormName      = rtrim(ltrim(@cTranslatedFormName)),              
      FK_LanguageId          = @iFK_LanguageId,              
      IsActive          = @bIsActive,                          
      UpdatedBy         = @iUserId,                        
      UpdatedDatetime   = GETDATE()  
	  ,FK_AccountID = @iFK_AccountID               
	 ,FK_CustomerID = @iFK_CustomerID                        
      WHERE PK_FormLanguageId=@iPK_FormLanguageId                  
      SELECT 2 AS Message_Id,'Form Language Mapping Updated Successfully.' AS Message                    
     END                  
     ELSE                  
     BEGIN                  
   SELECT 3 AS Message_Id,'This Form Language Mapping Already Exists.' AS Message       
     END         
 end --Update End                    
  END TRY                          
  BEGIN CATCH                          
      SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                          
  END CATCH 






