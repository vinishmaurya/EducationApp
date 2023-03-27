﻿/******************************************          
CreatedBy:sandeep Kumar         
CreatedDate:11-12-2019        
purpos:Get State Details       
[dbo].[USP_GetAllStateDetails]             
EXEC [dbo].[USP_GetStateDetailsByCountryId]  2      
****************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcGetStateDetailsByCountryId]        
(      
 @iFK_CountryId BIGINT = 0      
)              
AS      
BEGIN TRY    
SELECT 1 AS Message_Id,'Success' AS Message           
 SELECT       
       st.PK_StateId StateId,      
       st.StateName   ,
	   c.TimeZone
       FROM MST_State(NOLOCK) st   
	    inner join MST_Country(NOLOCK) c  on  c.PK_CountryId = st.FK_CountryId
       WHERE st.FK_CountryId=@iFK_CountryId      
       AND isnull(st.IsActive,0) = 1      AND isnull(st.IsDeleted,0) = 0    
END TRY
BEGIN CATCH                 
	INSERT INTO ErrorLog 
	(
		 [ErrorNumber]
		,[ErrorSeverity]
		,[ErrorState]
		,[ErrorProcedure]
		,[ErrorLine]
		,[ErrorMessage]
		,[ErrorDatetime]
	)
	VALUES
	(
		ERROR_NUMBER(),
		ERROR_SEVERITY(),
		ERROR_STATE(),
		ERROR_PROCEDURE(),
		ERROR_LINE(),
		ERROR_MESSAGE(),
		GETDATE()
	)
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;