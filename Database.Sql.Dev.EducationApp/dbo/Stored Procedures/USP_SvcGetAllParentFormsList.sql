/******************************************        
CreatedBy: Vinish
CreatedDate: 2023-03-14 16:14:17.563     
purpos: GetParentId DROPDOWN    
EXEC [dbo].[USP_GetAllParentFormsList]     
****************************************************/        
CREATE PROCEDURE [dbo].[USP_SvcGetAllParentFormsList]    
AS    
BEGIN 
SELECT 1 AS Message_Id,'Success' AS Message        
 SELECT     
      ISNULL(Pk_FormId,0) FormId,
      ISNULL(FormName ,'') FormName  
      FROM MST_Form(NOLOCK)     
      WHERE IsActive = 1 AND ISNULL(FK_ParentId,0) = 0    
END    
