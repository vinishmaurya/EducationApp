/******************************************      
CreatedBy:Vinish
CreatedDate:2020-04-28 18:20:35.987
select * from fr_mst_role    
purpos:Get Role Details By Optional Conditions    
EXEC [dbo].[[USP_GetAllRolesByCompany]]    
****************************************************/      
CREATE PROCEDURE [dbo].[USP_GetAllRolesByCompany]    
(       
@iFK_CompanyId   BIGINT  =0    
)    
AS    
BEGIN     
     SELECT     
        ISNULL(PK_RoleId,0)PK_RoleId,    
        ISNULL(RoleName,'')RoleName   
        From MST_Role(NOLOCK)    
        Where    
     ISNULL(IsDeleted,0)=0 AND    ISNULL(IsActive,0)=1  and  
     ISNULL(FK_CompanyId,0) = CASE WHEN @iFK_CompanyId=0 THEN  ISNULL(FK_CompanyId,0) ELSE   @iFK_CompanyId END  
     
END   
 
  
    
  




