/******************************************  
CreatedBy:Vinish
CreatedDate:2020-05-01 15:54:20.423
purpos:Get All Category List

EXEC [dbo].[USP_GetAllCategoryList] 
****************************************************/  
CREATE PROCEDURE [dbo].[USP_SvcGetAllCategoryList]          
AS
BEGIN
	SELECT 1 AS Message_Id,'Success!' AS Message   
	SELECT
	ISNULL(PK_CategoryId,0)PK_CategoryId,
	ISNULL(CategoryName,'')CategoryName
    FROM MST_Category(NOLOCK)
	WHERE 
	ISNULL(IsDeleted,0)=0 and ISNULL(IsActive,0)=1
END
