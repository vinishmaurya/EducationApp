/*******************************************************  
CREATED BY:Vinish 
CREATED DATE : 2019-12-12 11:43:02.987
PURPOSE:  To get all Forms
EXEC [dbo].[usp_getForms]
**********************************************************/  
CREATE PROCEDURE [dbo].[usp_getForms]   
AS  
BEGIN   
SELECT FRM.PK_FormId ,FRM.FormName  
from MST_Form FRM
where IsActive = 1 and IsDeleted = 0
END   



