/******************************************    
CreatedBy:sandeep Kumar   
CreatedDate:11-12-2019  
purpos:Get City Details 
[dbo].[USP_GetAllCityDetails]       
EXEC [dbo].[USP_GetAllCityDetails]  2
****************************************************/    
CREATE PROCEDURE [dbo].[USP_GetAllCityDetails]  
(
@iFK_StateId NVARCHAR(100)
)        
AS
BEGIN
     SELECT	1 AS Message_Id,'Success' AS Message 
     SELECT 
	 ISNULL(ct.PK_CityId,0)PK_CityId,
	 ISNULL(cont.CountryName,'')CountryName,
     ISNULL(st.StateName,'') StateName,
	 ISNULL(ct.CityName,'')CityName
     FROM MST_City(NOLOCK) ct
     JOIN MST_State st ON ct.FK_StateId = st.PK_StateId
     JOIN MST_Country cont ON cont.PK_CountryId = st.FK_CountryId
	 WHERE st.PK_StateId=@iFK_StateId
	 AND
	 ISNULL(ct.IsDeleted,0)=0
END



