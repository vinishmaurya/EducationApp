/******************************************************************************************
CREATED BY :Vinish
CREATED DATE : 11 December 2019
Purpose: To Get Form Details

EXEC [dbo].[usp_GetAllForms]
********************************************************************************************/
CREATE PROCEDURE [dbo].[usp_GetAllForms]
AS 
BEGIN 
SELECT 
PK_FormId AS ID,
FormName AS Value
FROM [dbo].[MST_Form](NOLOCK)
WHERE --ISNULL(FK_ParentId,0)<>0 AND 
ISNULL(IsDeleted,0)=0
END






