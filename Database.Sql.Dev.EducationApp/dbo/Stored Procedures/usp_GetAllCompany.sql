/*********************************************************************
CREATED BY:Vinish
Created Date: 2020-04-28 17:54:09.177
Purpose :To GEt All Company Details
EXEC [dbo].[usp_GetAllCompany]
**************************************************************************/
CREATE PROCEDURE [dbo].[usp_GetAllCompany]
AS
BEGIN TRY

	SELECT 1 AS Message_Id,'Success' AS Message
	SELECT 
	PK_CompanyId,
	ISNULL(CompanyName,'')AS CompanyName 
	FROM MST_Company
	WHERE ISNULL(IsActive,0)=1 AND ISNULL(IsDeleted,0) = 0

END TRY
BEGIN CATCH
	SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message
END CATCH




  
