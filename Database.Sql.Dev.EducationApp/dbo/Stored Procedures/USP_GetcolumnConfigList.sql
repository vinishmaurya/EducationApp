/******************************************    
CreatedBy:Vinish
CreatedDate:05-02-2020
purpos:Get Get form list
EXEC dbo.USP_GetcolumnConfigList
****************************************************/  
CREATE PROCEDURE [dbo].[USP_GetcolumnConfigList]  
 (  
  @ControllerName     nvarchar(50)  
, @ActionName         nvarchar(50)  
, @iCustomerId            bigint  
)  
AS  
BEGIN TRY  
      SELECT 1 AS Message_Id,'Success' AS Message  
      SELECT config.Column_Name ,
	  ISNULL(MST.IsActive,0) AS IsActive
      FROM Config_PageColumn(nolock) config  
      inner join MST_FormColumn(nolock) MST  
      ON MST.PK_FormColumnId=CONFIG.FK_FormColumnId  
      WHERE  config.FK_FormId=(SELECT TOP 1 PK_FormId FROM mst_form(nolock) frm WHERE ControllerName=@ControllerName and ActionName=@ActionName) 
      and config.FK_CustomerId=@iCustomerId  
      and config.IsActive=1  
      order by PK_PageColumnConfigId ASC  
END TRY                
BEGIN CATCH                 
 SELECT 0 AS Message_Id,ERROR_MESSAGE() AS Message                 
END CATCH;
