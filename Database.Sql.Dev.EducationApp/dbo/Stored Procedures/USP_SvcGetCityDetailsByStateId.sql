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
BEGIN      
SELECT 1 AS Message_Id,'Success' AS Message          
 SELECT       
 ISNULL(PK_CityId,0)  CityId,   
 ISNULL(CT.CityName,'')  CityName   
 FROM MST_City(NOLOCK) CT      
 WHERE CT.FK_StateId=@iFK_StateId      
 AND Isnull(IsDeleted,0)=0  and Isnull(IsActive,0)=1 AND Isnull(CT.IsDeleted,0)=0  and Isnull(CT.IsActive,0)=1  
  
END  
