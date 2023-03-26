/*****************************************************************          
Created By:Vnish    
Created Date:12-12-2019         
Purpose: Get Save  User Account Mapping        
EXEC [dbo].[usp_SaveUserAccountMapping]   0,10,2,'',''        
*******************************************************************/      
    
CREATE PROCEDURE [dbo].[usp_SaveUserAccountMapping]      
(      
--declare 
 @iPK_Map_UserAccountId BIGINT=0,   
 @iFK_UserID BIGINT,--=2,
 @iFK_CategoryId BIGINT,--=2, 
 @bIsCustomerAccount BIT,--='false',  
 @bIsActive BIT ,  --='false'  
 @iUserId    BIGINT,                --=1
 @cAccountIDs  VARCHAR(MAX),
 @iFK_CustomerId BIGINT=0,
 @cLoginType  VARCHAR(MAX)=''--='8'  --@iFk_AccountIds     
)      
AS      
BEGIN TRY      
DECLARE @list varchar(max)    
  DECLARE @pos INT    
  DECLARE @len INT    
  DECLARE @value varchar(20)    
    
  SET @list = @cAccountIDs+','    
  SET @pos = 0    
  SET @len = 0    
    
  WHILE CHARINDEX(',', @list, @pos+1)>0    
  BEGIN    
   SET @len = CHARINDEX(',', @list, @pos+1) - @pos    
   SET @value = SUBSTRING(@list, @pos, @len)    
   IF(ISNULL(@value,'')<>'')    
   BEGIN    
    IF EXISTS    
    (    
     SELECT 1 FROM MAP_UserAccount(NOLOCK)    
     WHERE FK_UserId  = @iFK_UserID    
     AND FK_AccountId  = CAST(@value AS BIGINT)    
    )    
    BEGIN    
     UPDATE MAP_UserAccount           
     SET          
     FK_UserId =@iFK_UserID  ,          
     FK_AccountId =CAST(@value AS BIGINT),                 
	 FK_CategoryId=@iFK_CategoryId,  
     IsCustomerAccount=@bIsCustomerAccount,
	 IsActive=@bIsActive ,
	 UpdatedBy = @iUserId ,          
     UpdatedDateTime = GETDATE()        
     WHERE FK_UserId  = @iFK_UserID    
     AND FK_AccountId  = CAST(@value AS BIGINT)          
     END    
     ELSE    
     BEGIN       
     INSERT INTO MAP_UserAccount            
     (          
      FK_UserId        
     ,FK_AccountId
	 ,FK_CategoryId  
	 ,IsCustomerAccount        
     ,IsActive        
     
     ,CreatedBy        
     ,CreatedDateTime   
            
      )   
            
     SELECT       
      @iFK_UserID       
     ,CAST(@value AS BIGINT)
	 ,@iFK_CategoryId 
	 ,@bIsCustomerAccount           
     ,@bIsActive        
     
     ,@iUserId         
     ,GETDATE()   
      
    END         
  END    
    
   SET @pos = CHARINDEX(',', @list, @pos+@len) +1    
    
  END    

  IF(@iPK_Map_UserAccountId=0)
     BEGIN
        SELECT 1 AS Message_Id, 'User Account Mapping Added Successfully.' AS Message 
     END
  ELSE
     BEGIN
        SELECT 2 AS Message_Id, 'User Account Mapping Updated Successfully.' AS Message 
     END

END TRY          
BEGIN CATCH      
 SELECT 0 AS Message_Id, ERROR_MESSAGE() AS Message      
END CATCH      
      
      

	
    
         
        
    
    
    
    
    
    
    
    
    






