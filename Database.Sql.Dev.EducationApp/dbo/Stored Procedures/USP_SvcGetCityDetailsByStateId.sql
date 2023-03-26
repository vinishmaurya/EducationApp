/******************************************          
CreatedBy:Vinish     
CreatedDate:24-03-2020       
purpos:Get State Details       
[dbo].[USP_GetCityDetailsByCityId]             
EXEC [dbo].[USP_GetCityDetailsByStateId] 1       
****************************************************/          
CREATE PROCEDURE [dbo].[USP_SvcGetCityDetailsByStateId]        
(      
 @iFK_StateId BIGINT = 0      
)              
AS      
BEGIN TRY      
	SELECT 1 AS Message_Id,'Success' AS Message          
	SELECT       
	ISNULL(PK_CityId,0)  CityId,   
	ISNULL(CT.CityName,'')  CityName   
	FROM MST_City(NOLOCK) CT      
	WHERE CT.FK_StateId=@iFK_StateId      
	AND Isnull(IsDeleted,0)=0  and Isnull(IsActive,0)=1 AND Isnull(CT.IsDeleted,0)=0  and Isnull(CT.IsActive,0)=1 
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
