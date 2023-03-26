/******************************************      
CreatedBy:Vinish
CreatedDate:18-12-2019 
purpos:Save Form Account Mapping
[dbo].[USP_SaveFormAccountMapping]        
EXEC [dbo].[USP_SaveFormAccountMapping] 1,1,1,1,1,1,1,1
****************************************************/
CREATE PROCEDURE [dbo].[USP_SaveFormAccountMapping] 
    (
	 @iPK_FormAccountId       BIGINT,
	 @iFK_FormId              BIGINT,
	 @iFK_AccountId           BIGINT,
	 @iFK_CategoryId          BIGINT,
	 @bIsActive               BIT,
	 @bIsCustomerAccount      BIT,
	 @iUserId                 BIGINT,
	 @iFK_CustomerId          BIGINT=0,
     @cLoginType              VARCHAR(50)=''  
    )
AS
BEGIN
BEGIN TRY
		 BEGIN
		   IF (@iPK_FormAccountId =0)	 
			 BEGIN
			   IF NOT EXISTS(select 1 from  [dbo].[Map_FormAccount] where FK_FormId =  @iFK_FormId    AND FK_AccountId =@iFK_AccountId AND IsActive=1)	
			      BEGIN
				  INSERT INTO MAP_FormAccount
				  (   
				  FK_FormId,          
				  FK_AccountId,       
				  FK_CategoryId, 
				  IsCustomerAccount,        
				  IsActive,
				  CreatedBy,
				  CreatedDateTime
				   )
                 VALUES
				 ( 
				 @iFK_FormId,        
				 @iFK_AccountId,     
				 @iFK_CategoryId, 
				 @bIsCustomerAccount,             
				 @bIsActive,
				 @iUserId,         
				 GETDATE() 
				 ) 
				 SELECT 1 AS Message_Id,'Form Account  Mapping added successfully.' AS Message
			     END
			   ELSE
			   BEGIN
			      SELECT 0 AS Message_Id,'Form Account Mapping already Exists.' AS Message
			   END
	        END
		ELSE  
		  IF NOT EXISTS(select 1 from  [dbo].[Map_FormAccount] where FK_FormId =  @iFK_FormId AND FK_AccountId =@iFK_AccountId and PK_FormAccountId <> @iPK_FormAccountId)	
			     BEGIN
			     UPDATE Map_FormAccount SET 
			     FK_FormId         =  	  @iFK_FormId, 
			     FK_AccountId      =       @iFK_AccountId,     
			     FK_CategoryId     =       @iFK_CategoryId, 
			     IsCustomerAccount =       @bIsCustomerAccount,             
			     IsActive          =       @bIsActive,    
			     UpdatedBy         =       @iUserId,         
			     UpdatedDateTime   =        GETDATE() 
			     WHERE PK_FormAccountId =@iPK_FormAccountId 
			     SELECT 2 AS Message_Id,'Form Account Mapping updated successfully.' AS Message
			     END	
         ELSE 
		 BEGIN
		     SELECT 0 AS Message_Id,'Form Account Mapping already Exists.' AS Message
		 END
	 END
END TRY
BEGIN CATCH
	 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message
END CATCH
END;     
				
				 				 





